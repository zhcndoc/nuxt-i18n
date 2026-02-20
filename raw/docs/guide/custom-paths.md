# 自定义路由路径

> 为特定语言环境自定义路径名称。

在某些情况下，您可能希望除了添加语言代码作为前缀之外，还能翻译 URL。有两种配置自定义路径的方法，一种是通过[模块配置](#module-configuration)，另一种是通过每个[页面组件](#definepagemeta)中进行配置。

使用哪种方法取决于 [`customRoutes` 选项](/docs/api/options#customroutes) 的设置，默认值为 `'page'`。无法同时使用两种方法。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

当使用 `'no_prefix'` [策略](/docs/guide) 时，除非结合使用 [`differentDomains`](/docs/guide/different-domains)，否则不支持自定义路径。

</callout>

## 模块配置

确保将 `customRoutes` 选项设置为 `'config'`，并在 `pages` 选项中添加您的自定义路径：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    customRoutes: 'config', // 禁用通过页面组件自定义路由
    pages: {
      about: {
        en: '/about-us', // -> 在 /about-us 可访问（默认语言无前缀）
        fr: '/a-propos', // -> 在 /fr/a-propos 可访问
        es: '/sobre'     // -> 在 /es/sobre 可访问
      }
    }
  }
})
```

注意，`pages` 对象中的每个键应**对应要本地化的路由名称**。

自定义的路由路径**必须以 / 开头**，且**不能包含语言前缀**。

您现在可以使用 `localePath()` 函数或 `<NuxtLinkLocale>` 组件，但请确保使用命名路由。例如，路由 `'/services/advanced'` 应该写为 `'services-advanced'`：

```vue
<script setup>
const { t } = useI18n()
</script>

<template>
  <NuxtLinkLocale to="about"> {{ t('about') }} </NuxtLinkLocale>
  <NuxtLinkLocale to="services-advanced"> {{ t('advanced') }} </NuxtLinkLocale>
</template>
```

或者：

```vue
<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath('about')"> {{ t('about') }} </NuxtLink>
  <NuxtLink :to="localePath('services-advanced')"> {{ t('advanced') }} </NuxtLink>
</template>
```

<callout icon="i-heroicons-exclamation-triangle" color="warning">

目前不支持传递路径给 `localePath()`。

</callout>

### 示例 1：基本的 URL 本地化

假设您的 `pages` 目录结构如下：

```bash [Directory structure]
-| pages/
---| parent/
-----| child.vue
---| parent.vue
```

<callout icon="i-heroicons-light-bulb">

嵌套路由中的子路由依赖于存在同名文件夹的页面组件来渲染子路由。<br />


详情请见 [嵌套路由](https://nuxt.com/docs/guide/directory-structure/pages#nested-routes)。

</callout>

您需要这样设置 `pages` 属性：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    customRoutes: 'config',
    pages: {
      parent: {
        en: '/parent',
        ca: '/pare'
      },
      'parent-child': {
        en: '/parent/child',
        ca: '/pare/fill'
      }
    }
  }
})
```

<callout icon="i-heroicons-exclamation-triangle" color="warning">

所有 URL 必须以 `/` 开头。

</callout>

### 示例 2：本地化 URL 的部分路径

假设您的 `pages` 目录结构如下：

```bash [Directory structure]
-| pages/
---| about.vue
---| services/
-----| index.vue
-----| coaching.vue
-----| development/
-------| app.vue
-------| website.vue
-----| development.vue
---| services.vue
```

您需要这样设置 `pages` 属性：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    customRoutes: 'config',
    pages: {
      about: {
        fr: '/a-propos'
      },
      services: {
        fr: '/offres'
      },
      'services-development': {
        fr: '/offres/developement'
      },
      'services-development-app': {
        fr: '/offres/developement/app'
      },
      'services-development-website': {
        fr: '/offres/developement/site-web'
      },
      'services-coaching': {
        fr: '/offres/formation'
      }
    }
  }
})
```

如果某个语言环境缺少自定义路径，则使用设置的 `defaultLocale` 自定义路径（如果有设置）。

### 示例 3：动态路由

假设您有如下动态路由：

```bash [Directory structure]
-| pages/
---| blog/
-----| [date]/
-------| [slug].vue
```

您应在配置中这样配置这些页面：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    customRoutes: 'config',
    pages: {
      'blog-date-slug': {
        // 参数需要像 Nuxt 动态路由一样写回这里
        // https://nuxt.com/docs/guide/directory-structure/pages#dynamic-routes
        ja: '/blog/tech/[date]/[slug]'
        // ...
      }
    }
  }
})
```

## `definePageMeta`

您可以在 `definePageMeta()` 中使用 `i18n` 属性为每个页面组件设置自定义路径。

要使用此功能，您需要在 `nuxt.config.ts` 中将 `customRoutes` 设置为 `'meta'`：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    customRoutes: 'meta'
  }
})
```

然后每个页面可以这样定义自己的本地化路径：

```vue [pages/about.vue]
<script setup>
definePageMeta({
  i18n: {
    paths: {
      en: '/about-us', // -> 在 /about-us 可访问（默认语言无前缀）
      fr: '/a-propos', // -> 在 /fr/a-propos 可访问
      es: '/sobre'     // -> 在 /es/sobre 可访问
    }
  }
})
</script>
```

要配置动态路由的自定义路径，您需要在路径中使用双中括号，类似于 [Nuxt 动态路由](https://nuxt.com/docs/guide/directory-structure/pages#dynamic-routes) 的用法：

```vue [pages/articles/[name].vue]
<script setup>
definePageMeta({
  i18n: {
    paths: {
      en: '/articles/[name]',
      es: '/artículo/[name]'
    }
  }
})
</script>
```

## `defineI18nRoute`

<callout icon="i-heroicons-exclamation-triangle" color="warning" title="注意">

该方法已废弃，推荐使用 `definePageMeta()`，将在 v11 版本中移除。

</callout>

您可以使用 `defineI18nRoute()` 编译宏为每个页面组件设置自定义路径。

```vue [pages/about.vue]
<script setup>
defineI18nRoute({
  paths: {
    en: '/about-us', // -> 在 /about-us 可访问（默认语言无前缀）
    fr: '/a-propos', // -> 在 /fr/a-propos 可访问
    es: '/sobre'     // -> 在 /es/sobre 可访问
  }
})
</script>
```

要为动态路由配置自定义路径，也需在路径中使用双中括号，类似于 [Nuxt 动态路由](https://nuxt.com/docs/guide/directory-structure/pages#dynamic-routes) 的写法：

```vue [pages/articles/[name].vue]
<script setup>
defineI18nRoute({
  paths: {
    en: '/articles/[name]',
    es: '/artículo/[name]'
  }
})
</script>
```

<callout icon="i-heroicons-light-bulb">

`defineI18nRoute()` 编译宏会在构建时被进行 tree-shaking 优化，不会包含在分发文件中。

</callout>

## 动态路由参数

处理动态路由参数需要更多工作，因为您需要向 **Nuxt i18n 模块** 提供参数翻译。可使用组合式函数 `useSetI18nParams` 来设置路由参数的翻译，这既用于设置 SEO 标签，也用于更改 `<SwitchLocalePathLink>` 渲染的路由。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

`switchLocalePath` 会返回使用 `setI18nParams` 翻译参数的本地化路由，这可能导致之前使用 `switchLocalePath` 渲染的链接出现 hydration 问题。<br />


请改用 `<SwitchLocalePathLink>` 组件，该组件会在发送渲染响应之前更新路由。

</callout>

示例（将 `slug` 替换为对应路由参数）：

```vue
<script setup>
// 从 API 拉取产品数据...（红色杯子）

const setI18nParams = useSetI18nParams()
setI18nParams({
  en: { slug: data.slugs.en }, // slug: 'red-mug'
  nl: { slug: data.slugs.nl }  // slug: 'rode-mok'
})

const switchLocalePath = useSwitchLocalePath()
switchLocalePath('en') // /products/red-mug
switchLocalePath('nl') // /nl/products/rode-mok
</script>

<template>
  <!-- pages/products/[slug].vue -->
</template>
```

对于名为 `[...pathMatch].vue` 的特殊捕获所有路由，对象的键名需使用 `pathMatch`。例如：

```vue
<script>
const setI18nParams = useSetI18nParams()
setI18nParams({
  en: { pathMatch: ['not-found-my-post'] },
  fr: { pathMatch: ['not-found-mon-article'] }
})
</script>

<template>
  <!-- pages/[...pathMatch].vue -->
</template>
```

请注意，捕获所有路由定义为**数组**。此处仅包含一个元素，但如果您想使用子路径，比如 `'/not-found/post'`，应定义多个元素，如 `['not-found', 'post']`。

<callout icon="i-heroicons-light-bulb">

**Nuxt i18n 模块** 不会帮您重置参数翻译，这意味着如果不同路由使用相同参数，在路由切换时可能出现参数冲突。请确保在此类情况下始终设置参数翻译。

</callout>

## `definePageMeta({ name: '...' })` 注意事项

默认情况下，Nuxt 会在构建时覆盖生成的路由值，这会导致自定义命名路由（通过 `definePageMeta()` 设置 `name`）在解析本地化路径时失效。

Nuxt v3.10 引入了实验性功能 [`scanPageMeta`](https://nuxt.com/docs/guide/going-further/experimental-features#scanpagemeta)，需要启用此功能才能使 Nuxt I18n 的自定义命名路由正常工作。

您可以按如下方式启用此实验功能：

```typescript [nuxt.config.ts]
export default defineNuxtConfig({
  experimental: {
    scanPageMeta: true
  }
})
```
