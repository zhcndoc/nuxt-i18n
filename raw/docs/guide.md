# 路由策略

> Nuxt i18n 模块覆盖 Nuxt 默认路由，为每个 URL 添加语言前缀，并提供多种路由策略。

<callout icon="i-heroicons-light-bulb">

该功能基于 [Nuxt 的路由机制](https://nuxt.com/docs/getting-started/routing)，需要你的项目中有一个 `pages` 目录才能启用。

</callout>

## 路由

**Nuxt i18n 模块**覆盖了 Nuxt 默认的路由，为每个 URL 添加语言前缀（除了 `'no_prefix'` 策略下）。

假设你的应用支持两种语言：法语和默认语言英语，且你的项目中有以下页面：

<code-group>

```bash [目录结构]
-| pages/
---| about.vue
---| index.vue
---| posts/
-----| [id].vue
```

```js [生成的路由（简化）]
[
  {
    path: "/",
    name: "index___en",
  },
  {
    path: "/fr",
    name: "index___fr",
  },
  {
    path: "/about",
    name: "about___en",
  },
  {
    path: "/fr/about",
    name: "about___fr",
  },
  {
    path: "/posts/:id",
    name: "posts-id___en",
  },
  {
    path: "/fr/posts/:id",
    name: "posts-id___fr",
  }
]
```

</code-group>

注意，英语版本的路由没有任何前缀，因为它是默认语言，详细说明请参见路由策略部分。

## 策略

本模块支持 4 种策略，它们决定了应用路由的生成方式：

### `'no_prefix'`

使用该策略时，路由不会添加语言前缀。语言的检测和切换是在不改变 URL 的情况下进行。这意味着你需要依赖浏览器和 Cookie 检测，并通过调用 i18n API 实现语言切换。

<callout icon="i-heroicons-light-bulb">

该策略不支持[自定义路径](/docs/guide/custom-paths)和[忽略路由](/docs/guide/ignoring-localized-routes)功能，除非你也使用了[`differentDomains`](/docs/guide/different-domains)。

</callout>

### `'prefix_except_default'`

使用此策略，除默认语言外，所有路由都会添加语言前缀。

### `'prefix'`

该策略下，所有路由都会添加语言前缀。

### `'prefix_and_default'`

此策略结合了前两种策略的行为，即所有语言的 URL 都带有前缀，但默认语言的 URL 同时存在无前缀版本（不过启用 `detectBrowserLanguage` 时，前缀版本优先）。

## 配置

通过 `strategy` 选项配置路由策略。
确保定义了 `defaultLocale`，特别是当你使用 `prefix_except_default`、`prefix_and_default` 或 `no_prefix` 策略时。对于其他策略，建议也设置该选项，因为它会作为 404 页面重定向时的备用语言。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // ...

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en'
  }

  // ...
})
```
