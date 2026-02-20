# SEO

> 当调用 `useLocaleHead` 时，@nuxtjs/i18n 会尝试添加一些元数据来提升页面的 SEO 优化。以下是它所做的内容。

**Nuxt i18n 模块** 提供了 `useLocaleHead()` 组合式函数。调用此组合函数将返回一个函数，该函数可用于生成 SEO 元数据，从而优化与本地化相关的应用程序方面，以便搜索引擎更好地识别。

以下是它启用的具体优化和功能：

- `<html>` 标签的 `lang` 属性
- 生成带 `hreflang` 的备用链接
- 生成 OpenGraph 语言标签
- 生成规范链接

[请阅读下面关于这些功能的详细说明](#feature-details)

## 要求

要利用 SEO 优势，必须将 `locales` 选项配置为对象数组，其中每个对象的 `language` 选项设置为本地语言标签：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US'
      },
      {
        code: 'es',
        language: 'es-ES'
      },
      {
        code: 'fr',
        language: 'fr-FR'
      }
    ]
  }
})
```

您还必须将 `baseUrl` 选项设置为您的生产域名，以使备用 URL 成为完全限定的：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    baseUrl: 'https://my-nuxt-app.com'
  }
})
```

（注意 `baseUrl` 也可以设置为函数。详情请参阅 [`baseUrl` 文档](/docs/api/options#baseurl)）

## 配置

`useLocaleHead()` 是一个组合式函数，调用该组合函数返回一个函数，该函数返回的元数据由 Nuxt 集成的[头部管理](https://nuxt.com/docs/getting-started/seo-meta)处理。此元数据可以在 Nuxt 中的多个位置 `setup` 函数中指定：

- [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app)
- [`pages`](https://nuxt.com/docs/guide/directory-structure/pages) 目录下的 Vue 组件
- [`layouts`](https://nuxt.com/docs/guide/directory-structure/layouts) 目录下的 Vue 组件

要启用 SEO 元数据，请在上面指定的某个位置声明 `setup` 函数，并使其返回 `useLocaleHead()` 函数调用的结果。

为避免代码重复，推荐在[布局组件](https://nuxt.com/docs/guide/directory-structure/layouts)中使用[元组件](https://nuxt.com/docs/getting-started/seo-meta#components)全局设置，并在必要时通过每页 Vue 组件中的 [`definePageMeta()`](https://nuxt.com/docs/guide/directory-structure/pages#page-metadata) 来覆盖某些值。

<code-group>

```vue [app.vue]
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

```vue [layouts/default.vue]
<script setup>
const route = useRoute()
const { t } = useI18n()
const head = useLocaleHead()
const title = computed(() => t(route.meta.title ?? 'TBD', t('layouts.title'))
);
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.key">
          <Link :id="link.key" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.key">
          <Meta :id="meta.key" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
      <Body>
        <slot />
      </Body>
    </Html>
  </div>
</template>
```

```vue [pages/index.vue]
<script setup>
definePageMeta({
  title: 'pages.title.top' // 设置资源键
})

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <div>
    <p>{{ t('pages.top.description') }}</p>
    <p>{{ t('pages.top.languages') }}</p>
    <nav>
      <template v-for="(locale, index) in availableLocales" :key="locale.code">
        <span v-if="index"> | </span>
        <NuxtLink :to="switchLocalePath(locale.code)">
          {{ locale.name ?? locale.code }}
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>
```

</code-group>

查看您可以传递给 `useLocaleHead()` 的选项，请参考[组合式函数文档](/docs/composables/use-locale-head#options)

就是这样！

如果您还想添加自定义元数据，则需要调用 `useHead()`。当您调用带有额外元数据的 `useHead()` 时候，它会自动与已定义的全局元数据合并。

```vue [pages/about/index.vue]
<script setup>
// 为 layouts/default.vue 定义页面元数据
definePageMeta({
  title: 'pages.title.about'
})

useHead({
  meta: [{ property: 'og:title', content: '这是关于页面的 og 标题' }]
})
</script>

<template>
  <h2>{{ $t('pages.about.description') }}</h2>
</template>
```

## 功能详情

- `<html>` 标签的 `lang` 属性<br />

设置正确的 `lang` 属性，其值等同于当前语言环境的 `language` 字段，在 `<html>` 标签中体现。
- `hreflang` 备用链接<br />

为每个配置的语言环境生成 `<link rel="alternate" hreflang="x">` 标签。语言环境中的 `language` 值用作 `hreflang` 的值。<br />

为每个语言组（例如 `en-*`）提供一个“通配”语言 hreflang 链接。默认情况下，通配语言为第一个配置的语言环境，但可通过在特定语言环境对象中设置 `isCatchallLocale` 为 `true` 来选择其他语言环境。详情见 [hreflang 说明](https://support.google.com/webmasters/answer/189077)<br />

以下是未选择“通配”语言的示例：```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US' // 默认被用作“通配”语言
      },
      {
        code: 'gb',
        language: 'en-GB'
      }
    ]
  }
})
```

<br />

下面展示如何使用 `isCatchallLocale` 来指定其他语言环境：```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US'
      },
      {
        code: 'gb',
        language: 'en-GB',
        isCatchallLocale: true // 该语言环境将作为通配语言
      }
    ]
  }
})
```

<br />

如果您已经设置了 `en` 语言环境，默认会用作通配语言，无需其他操作：```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    locales: [
      {
        code: 'gb',
        language: 'en-GB'
      },
      {
        code: 'en',
        language: 'en' // 将用作“通配”语言
      }
    ]
  }
})
```
- OpenGraph 语言标签生成<br />

生成符合 [Open Graph 协议](http://ogp.me/#optional) 的 `og:locale` 和 `og:locale:alternate` 元标签。
- 规范链接<br />

在所有页面生成带有 `rel="canonical"` 的链接，用来指定搜索引擎应索引的标签页“主版本”。该功能在以下几种情况下特别有用：
  - 使用 `prefix_and_default` 策略时，默认语言实际上会生成两组页面——一组带前缀，一组无前缀。规范链接将指向无前缀的页面，从而避免重复索引。
  - 当页面带有查询参数时，默认情况下规范链接**不包含**查询参数。这是合理的，因为各种追踪参数不应成为规范链接的一部分。您可以通过 `canonicalQueries` 选项来覆盖该行为。例如：```vue
  <script setup>
  const i18nHead = useLocaleHead({ seo: { canonicalQueries: ['foo'] } })
  useHead(() => ({
    htmlAttrs: {
      lang: i18nHead.value.htmlAttrs.lang
    },
    link: [...(i18nHead.value.link || [])],
    meta: [...(i18nHead.value.meta || [])]
  }))
  </script>
  ```<br />

[更多关于规范链接的信息](https://support.google.com/webmasters/answer/182192#dup-content)
