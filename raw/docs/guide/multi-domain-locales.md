# 多域名多语言区域设置

> 为多语言区域设置配置多个域名。为应用支持的每种语言使用不同的域名。

如何设置多域名多语言区域：

- 将 `multiDomainLocales` 选项设置为 `true`
- 将 `locales` 选项配置为对象数组：

  - 每个对象具有一个 `domains` 键，其值是该语言区域想要使用的域名数组。可选包含端口号（如果非标准端口）和/或协议。如果未提供协议，则会尝试自动检测，但在页面静态生成等某些情况下可能无法正确工作。
  - 可选地为每个对象设置 `defaultForDomains` 键，其值是希望作为该语言区域默认域名的数组。可选包含端口号（如果非标准端口）和/或协议。如果未提供协议，则会尝试自动检测，但在页面静态生成等某些情况下可能无法正确工作。
- 可选将 `detectBrowserLanguage` 设置为 `false`。默认启用时，用户首次访问时可能会被重定向到不同的域。设置为 `false` 可确保访问给定域时始终显示对应语言区域的页面。

```ts [nuxt.config.ts]
const i18nDomains = ['mydomain.com', 'es.mydomain.com', 'fr.mydomain.com', 'http://pl.mydomain.com', 'https://ua.mydomain.com']

export default defineNuxtConfig({
  i18n: {
    locales: [
      {
        code: 'en',
        domains: i18nDomains,
        defaultForDomains: ['mydomain.com']
      },
      {
        code: 'es',
        domains: i18nDomains,
        defaultForDomains: ['es.mydomain.com']
      },
      {
        code: 'fr',
        domains: i18nDomains,
        defaultForDomains: ['fr.mydomain.com']
      },
      {
        code: 'pl',
        domains: i18nDomains,
        defaultForDomains: ['http://pl.mydomain.com']
      },
      {
        code: 'ua',
        domains: i18nDomains,
        defaultForDomains: ['https://ua.mydomain.com']
      },
      {
        code: 'nl',
        domains: i18nDomains
      },
      {
        code: 'de',
        domains: i18nDomains
      },
    ],
    multiDomainLocales: true
  }
})
```

## 运行时环境变量

有时需要在不同环境中更改域名，例如预发布和生产环境。
由于 `nuxt.config.ts` 在构建时使用，因此需要为不同环境创建不同的构建。

```ts [locale-domains.config.ts]
export const localeDomains = {
  uk: process.env.DOMAIN_UK,
  fr: process.env.DOMAIN_FR
}
```

```ts [nuxt.config.ts]
import { localeDomains } from './locale-domains.config'

const i18nDomains = [localeDomains.uk, localeDomains.fr]

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],

  i18n: {
    multiDomainLocales: true,
    locales: [
      {
        code: 'uk',
        domains: i18nDomains,
        defaultForDomains: [localeDomains.uk]
      },
      {
        code: 'fr',
        domains: i18nDomains,
        defaultForDomains: [localeDomains.fr]
      }
    ]
  }
})
```

借助上述配置，预发布和生产环境需要分别用不同的 `.env` 文件运行构建，这些文件指定了 `DOMAIN_UK` 和 `DOMAIN_FR`。

## 仅为部分语言使用不同域名

如果多个域共享相同的默认语言，可以使用支持多个域名的 `defaultForDomains` 来全部指定它们。

```js [nuxt.config.js]
const i18nDomains = ['mydomain.com', 'en.mydomain.com', 'es.mydomain.com', 'fr.mydomain.com', 'http://pl.mydomain.com', 'https://ua.mydomain.com']

export default defineNuxtConfig({
  // ...
  i18n: {
    locales: [
      {
        code: 'en',
        domains: i18nDomains,
        defaultForDomains: ['mydomain.com', 'en.mydomain.com']
      },
      {
        code: 'es',
        domains: i18nDomains,
        defaultForDomains: ['es.mydomain.com']
      },
      {
        code: 'fr',
        domains: i18nDomains,
        defaultForDomains: ['fr.mydomain.com']
      },
      {
        code: 'pl',
        domains: i18nDomains,
        defaultForDomains: ['http://pl.mydomain.com']
      },
      {
        code: 'ua',
        domains: i18nDomains,
        defaultForDomains: ['https://ua.mydomain.com']
      },
      {
        code: 'nl',
        domains: i18nDomains
      },
      {
        code: 'de',
        domains: i18nDomains
      },
    ],
    strategy: 'prefix',
    multiDomainLocales: true
  },
  // ...
})
```

上述配置配合 `'prefix'` 策略，请求如下：

- [https://mydomain.com](https://mydomain.com) -> [https://mydomain.com/en](https://mydomain.com/en) （英文）
- [https://mydomain.com/pl](https://mydomain.com/pl) -> [https://mydomain.com/pl](https://mydomain.com/pl) （波兰语）
- [https://mydomain.com/ua](https://mydomain.com/ua) -> [https://mydomain.com/ua](https://mydomain.com/ua) （乌克兰语）
- [https://mydomain.com/nl](https://mydomain.com/nl) -> [https://mydomain.com/nl](https://mydomain.com/nl) （荷兰语）
- [https://en.mydomain.com](https://en.mydomain.com) -> [https://en.mydomain.com/en](https://en.mydomain.com/en) （英文）
- [https://es.mydomain.com](https://es.mydomain.com) -> [https://es.mydomain.com/es](https://es.mydomain.com/es) （西班牙语）
- [https://fr.mydomain.com](https://fr.mydomain.com) -> [https://fr.mydomain.com/fr](https://fr.mydomain.com/fr) （法语）
- [https://fr.mydomain.com/de](https://fr.mydomain.com/de) -> [https://fr.mydomain.com/de](https://fr.mydomain.com/de) （德语）

使用 `'prefix_except_default'` 策略时，相同请求为：

- [https://mydomain.com](https://mydomain.com) -> [https://mydomain.com](https://mydomain.com) （英文）
- [https://mydomain.com/pl](https://mydomain.com/pl) -> [https://mydomain.com/pl](https://mydomain.com/pl) （波兰语）
- [https://mydomain.com/ua](https://mydomain.com/ua) -> [https://mydomain.com/ua](https://mydomain.com/ua) （乌克兰语）
- [https://mydomain.com/nl](https://mydomain.com/nl) -> [https://mydomain.com/nl](https://mydomain.com/nl) （荷兰语）
- [https://en.mydomain.com](https://en.mydomain.com) -> [https://en.mydomain.com](https://en.mydomain.com) （英文）
- [https://es.mydomain.com](https://es.mydomain.com) -> [https://es.mydomain.com](https://es.mydomain.com) （西班牙语）
- [https://fr.mydomain.com](https://fr.mydomain.com) -> [https://fr.mydomain.com](https://fr.mydomain.com) （法语）
- [https://fr.mydomain.com/de](https://fr.mydomain.com/de) -> [https://fr.mydomain.com/de](https://fr.mydomain.com/de) （德语）
