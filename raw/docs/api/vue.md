# Vue

> Vue 的扩展。

## Vue 的扩展

<callout color="warning" icon="i-heroicons-exclamation-triangle">

列出的 API 可用于 Options API。它们为 Nuxt2 中从 `@nuxtjs/i18n` 迁移而保留。未来将被弃用。

</callout>

### `routeBaseName()`

- **参数**：

  - route（类型：`string | Route`，默认值：当前路由）
- **返回值**：`string`

返回传入路由的基础名称（默认为当前路由）。路由的基础名称是不带有 `@nuxtjs/i18n` 添加的本地化后缀或其他元数据的名称。

### `switchLocalePath()`

- **参数**：

  - locale：（类型：`Locale`）
- **返回值**：`string`

返回当前路由在指定 `locale` 下的路径。

另请参阅 [链接本地化](/docs/getting-started/usage)

### `localePath()`

- **参数**：

  - route（类型：`string | Location`）
  - locale（类型：`Locale`，默认值：当前语言环境）
- **返回值**：`string`

返回传入 `route` 的本地化路径。默认使用当前 `locale`。

另请参阅 [链接本地化](/docs/getting-started/usage)

### `localeRoute()`

- **参数**：

  - route（类型：`string | Location`）
  - locale（类型：`Locale`，默认值：当前语言环境）
- **返回值**：`Route | undefined`

返回传入 `route` 的本地化路由。默认使用当前 `locale`。

另请参阅 [链接本地化](/docs/getting-started/usage)

### `localeHead()`

- **参数**：

  - options：（类型：`I18nHeadOptions`）
- **返回值**：`I18nHeadMetaInfo`

`options` 对象接受以下可选属性：

- `dir`（类型：`boolean`） - 向 HTML 元素添加 `dir` 属性。默认值：`false`
- `seo`（类型：`boolean | SeoAttributesOptions`） - 添加各种 SEO 属性。默认值：`false`

另请参阅 [SEO](/docs/guide/seo)
