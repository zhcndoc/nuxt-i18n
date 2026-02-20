# 本地化回退

> 当翻译缺失时，如何选择回退语言。

**Nuxt i18n 模块** 利用 **Vue I18n** 处理本地化回退的能力。可以定义单一的回退语言，一个语言数组，或者更具体需求的决策映射。

```js [i18n/i18n.config.ts]
export default {
  fallbackLocale: 'en',
  // 或者
  fallbackLocale: ['en', 'fr'],
  // 或者
  fallbackLocale: {
    'de-CH': ['fr', 'it'],
    'zh-Hant': ['zh-Hans'],
    'es-CL': ['es-AR'],
    es: ['en-GB'],
    pt: ['es-AR'],
    default: ['en', 'da']
  }
  // ...
}
```

更多信息请参阅 [Vue I18n 文档](https://vue-i18n.intlify.dev/guide/essentials/fallback.html)
