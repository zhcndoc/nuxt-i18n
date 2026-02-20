# 使用方法

> 使用 Nuxt i18n 模块的基础入门

## 基本设置

让我们从在 nuxt 配置中设置项目的 `locales` 和 `defaultLocale` 开始。

对于本项目，我们为 locales 配置以下属性：

- `code`：必需属性，locale 代码在 Nuxt I18n 中通用，作为该 locale 的标识符。
- `name`：locale 的名称，是一种用户友好的 locale 标识方式。
- `file`：提供翻译信息的文件，内容为一个对象。

`defaultLocale` 应设置为配置的某个 locales 的 `code`，设置此项为可选但推荐，因为它会在访问不存在的路由时被用作回退。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'nl', name: 'Nederlands', file: 'nl.json' }
    ]
  }
})
```

一个典型的项目对每个配置的 locale 至少有一个对应的 `file` 文件，该文件以对象形式提供翻译内容。

Nuxt I18n 默认从一个（可配置的）目录结构中加载 locale 文件，默认应在 `<rootDir>/i18n/locales` 下创建这些 locale 文件。

<code-group>

```json [i18n/locales/en.json]
{
  "welcome": "Welcome"
}
```

```json [i18n/locales/nl.json]
{
  "welcome": "Welkom"
}
```

</code-group>

通过以上配置，我们可以添加一个基础语言切换器并翻译我们的第一条消息：

```vue [pages/index.vue]
<script setup>
const { locales, setLocale } = useI18n()
</script>

<template>
  <div>
    <button v-for="locale in locales" @click="setLocale(locale.code)">
      {{ locale.name }}
    </button>
    <h1>{{ $t('welcome') }}</h1>
  </div>
</template>
```

利用配置的 locales，我们创建了一个简单的语言切换器，点击 `<button>` 元素即可在英语和荷兰语之间切换，并看到“welcome”消息和页面 URL 相应变化。

至此，你已经拥有了基本的设置，可以开始全面本地化你的 Nuxt 应用！

## 自动导入

部分组合式函数，如 `useI18n` 是由 Nuxt [自动导入](https://nuxt.com/docs/guide/concepts/auto-imports#auto-imports) 的。
如果你禁用了 `autoImports`，则需显式从 `#imports` 导入它们，如下所示：

```vue
<script setup>
import { useI18n, useLocalePath } from '#imports'
// ...
</script>
```

## 路由本地化

Nuxt I18n 为每个 locale 生成本地化路由，在最基础的设置下，表现为每个路由的带 locale 代码前缀的变体。

在应用中链接路由时，需要获取当前 locale 对应的本地化路由。这可借助 Nuxt I18n 提供的实用函数完成。

### 使用 `$localePath` 解析本地化路由

`$localePath` 函数用于获取给定路由的本地化路径，该函数由 `useLocalePath` 返回，用于 `<template>` 之外的用法。

该函数接受两个参数：

- `route`：路由名称或带有 name 属性的路由对象
- `locale`：希望路由本地化成的 locale 代码，默认是当前 locale

<code-group>

```vue [page.vue (全局函数)]
<template>
  <NuxtLink :to="$localePath('index')">{{ $t('home') }}</NuxtLink>
  <NuxtLink :to="$localePath('index', 'en')">英文主页</NuxtLink>
  <NuxtLink :to="$localePath('user-profile')">跳转至 {{ $t('profile') }}</NuxtLink>
  <NuxtLink :to="$localePath({ name: 'category-slug', params: { slug: category.slug } })">
    {{ category.title }}
  </NuxtLink>
</template>
```

```vue [page.vue (组合式)]
<script setup>
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath('index')">{{ $t('home') }}</NuxtLink>
  <NuxtLink :to="localePath('index', 'en')">英文主页</NuxtLink>
  <NuxtLink :to="localePath('user-profile')">跳转至 {{ $t('profile') }}</NuxtLink>
  <NuxtLink :to="localePath({ name: 'category-slug', params: { slug: category.slug } })">
    {{ category.title }}
  </NuxtLink>
</template>
```

</code-group>

因为本地化路由可能因配置不同而变化，使用路由名确保解析准确。Nuxt I18n 会生成类型支持，提升类型安全和开发体验。要使用此类型支持，请在 Nuxt 配置中启用 `typedPages`。

路由名称对应 Nuxt 在解析 `pages` 目录时生成的名称，详情见 [Nuxt 文档](https://nuxt.com/docs/guide/directory-structure/pages)。

### 语言切换

`$switchLocalePath` 函数返回当前页面路由的指定 locale 本地化版本，参数是目标 locale 代码。

<code-group>

```vue [page.vue (全局函数)]
<template>
  <NuxtLink :to="$switchLocalePath('en')">English</NuxtLink>
  <NuxtLink :to="$switchLocalePath('nl')">Nederlands</NuxtLink>
</template>
```

```vue [page.vue (组合式)]
<script setup>
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <NuxtLink :to="switchLocalePath('en')">English</NuxtLink>
  <NuxtLink :to="switchLocalePath('nl')">Nederlands</NuxtLink>
</template>
```

</code-group>

### 使用 Route 对象进行 URL 路径本地化

你可以使用 `useLocaleRoute` 来本地化更复杂的 URL 路径。当你需要以编程方式控制内部链接时，这很有用。

`useLocaleRoute` 是一个组合式函数，它返回指定页面的 `Route` 对象。

它的用法类似 `useLocalePath`，但返回的是 Vue Router 解析后的路由对象，而非完整路由路径。这在某些情况下更有用，因为从 `useLocalePath` 获取的路径可能不包含全部输入信息（例如，页面未指定的路由参数）。

```vue
<script setup>
const localeRoute = useLocaleRoute()
function onClick() {
  const route = localeRoute({ name: 'user-profile', query: { foo: '1' } })
  if (route) {
    return navigateTo(route.fullPath)
  }
}
</script>

<template>
  <button @click="onClick">显示资料</button>
</template>
```
