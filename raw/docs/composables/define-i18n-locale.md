# defineI18nLocale

> defineI18nLocale() 组合式函数用于定义一个函数，以动态加载用于懒加载翻译的本地化消息。

`defineI18nLocale()` 组合式函数用于定义一个函数，以动态加载用于[懒加载翻译](/docs/guide/lazy-load-translations)的本地化消息。

加载器函数需要返回一个解析为消息对象的 `Promise`。

## 类型

```ts
declare function defineI18nLocale<Messages = LocaleMessages<DefineLocaleMessage>, Locales = Locale>(
  loader: (locale: Locales) => Messages | Promise<Messages>
): (locale: Locales) => Messages | Promise<Messages>
```

## 参数

### `loader`

一个动态加载本地化消息的函数，具有以下参数：

- `locale`<br />

**类型**: `Locale`<br />

目标 locale，由 nuxt i18n 模块传入。当 locale 在以下情况切换时传入：
  - 当你使用 `setLocale()` 切换 locale 时。
  - 当通过 `<NuxtLink>` 切换 locale 时。例如，通过 `useSwitchLocalePath()` 或 `$switchLocalePath()` 解析的路由路径。

## 使用

使用 fetch 请求加载本地化消息的加载器函数示例：

```ts
export default defineI18nLocale(locale => {
  return $fetch(`https://your-company-product/api/${locale}`)
})
```
