# defineI18nLocaleDetector

> defineI18nLocaleDetector() 是一个组合函数，用于定义一个在服务器端检测语言环境的函数，该函数会在服务器端对每个请求调用。

`defineI18nLocaleDetector()` 是一个组合函数，用于定义一个在服务器端检测语言环境的函数，该函数会在服务器端对每个请求调用。

该函数需要返回一个语言环境字符串。

你可以在语言环境检测函数中使用[`@intlify/h3` 工具](https://github.com/intlify/h3#%EF%B8%8F-utilites--helpers)，这些工具会自动导入。

<callout color="warning" icon="i-heroicons-exclamation-triangle">

**此组合函数为实验性功能。** 你需要在 [`experimental.localeDetector` 选项](/docs/api/options#experimental) 中配置文件路径。

</callout>

## 类型

```ts
type LocaleConfig = {
  defaultLocale: Locale
  fallbackLocale: FallbackLocale
}
declare function defineI18nLocaleDetector(
  detector: (event: H3Event, config: LocaleConfig) => string
): (event: H3Event, config: LocaleConfig) => string
```

## 参数

### `detector`

一个作为语言环境检测器的函数，具有以下参数：

- `event`
  - 类型：`H3Event`
  - 一个 H3 事件。详情见 [H3 API 文档](https://www.jsdocs.io/package/h3#H3Event)
- `config`
  - 类型：`object`
  - 从 Nitro 传入的语言环境配置。
  - 属性：
    - `defaultLocale`
      - 类型：`Locale`
      - 该值设置为 Nuxt i18n 的 `defaultLocale` 选项。如果未设置，则取自 Vue I18n 配置中的 `locale` 选项（即在 `vueI18n` 选项中设置的 `i18n.config` 文件）。如果两者均未设置，则默认值为 `'en-US'`。
    - `fallbackLocale`
      - 类型：`FallbackLocale`
      - 该值设置为从 Vue I18n 配置（`vueI18n` 选项中设置的 `i18n.config` 文件）加载的 `fallbackLocale` 选项。如果未配置回退语言环境，则默认值为 `false`。

## 用法

下面是一个语言环境检测器的示例：

```ts
// 根据查询参数、cookie、请求头检测语言环境
export default defineI18nLocaleDetector((event, config) => {
  const query = tryQueryLocale(event, { lang: '' })
  if (query) {
    return query.toString()
  }

  const cookie = tryCookieLocale(event, { lang: '', name: 'i18n_locale' })
  if (cookie) {
    return cookie.toString()
  }

  const header = tryHeaderLocale(event, { lang: '' })
  if (header) {
    return header.toString()
  }

  return config.defaultLocale
})
```
