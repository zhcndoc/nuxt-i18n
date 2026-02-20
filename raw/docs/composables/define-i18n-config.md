# defineI18nConfig

> defineI18nConfig() 组合函数用于定义一个函数，该函数返回传递给 Nuxt I18n 模块中 createI18n() 选项的 vue-i18n 配置。

`defineI18nConfig()` 组合函数用于定义一个函数，该函数返回传递给 Nuxt I18n 模块中 `createI18n()` 选项的 vue-i18n 配置。

加载器函数需要返回一个函数或 Promise，该函数或 Promise 解析为 vue-i18n 配置对象。

有关 vue-i18n 配置的更多详细信息，请参阅 [Vue I18n 文档](https://vue-i18n.intlify.dev/api/general.html#createi18n)。

## 类型

```ts
export function defineI18nConfig<Config extends I18nOptions>(
  loader: () => Config | Promise<Config>
): () => Config | Promise<Config>
```

## 参数

### `loader`

一个函数，用于加载 vue-i18n 配置选项。

## 用法

定义一个简单的 vue-i18n 配置对象的示例：

```ts
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome'
    },
    fr: {
      welcome: 'Bienvenue'
    }
  }
}))
```
