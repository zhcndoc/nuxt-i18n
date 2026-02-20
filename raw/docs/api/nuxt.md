# Nuxt

> 与 Nuxt 相关的 I18n 其他 API。

## Nuxt 运行时应用上下文的扩展

以下 API 同时暴露在 `NuxtApp` 上。

### `$i18n`

- **类型**: <span>

`VueI18n | Composer`

</span>

另见 [NuxtApp](https://nuxt.com/docs/guide/going-further/nuxt-app#accessing-nuxtapp)

`$i18n` 是 Vue I18n 的全局 `Composer` 或全局 `VueI18n` 实例。详情请参阅 [这里](https://vue-i18n.intlify.dev/api/general.html#i18n)

如果你在 `@nuxtjs/i18n` 配置中将 `i18n.vueI18n.legacy` 选项设置为 `false`，则 `$i18n` 是一个全局 `Composer` 实例。否则，它是一个全局的 `VueI18n` 实例。

使用示例：

```ts
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.$i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, nuxtApp) => {
    console.log('onBeforeLanguageSwitch', oldLocale, newLocale, isInitialSetup)
  }
})
```

### `$routeBaseName()`

### `$switchLocalePath()`

### `$localePath()`

### `$localeRoute()`

### `$localeHead()`

关于这些 API 的更多信息请参阅 [Vue 扩展](/docs/api/vue) 部分。

## Nuxt 钩子的扩展

### `'i18n:registerModule'` 钩子

- **参数**:

  - registerModule (类型: `({ langDir: string, locales: LocaleObject[] }) => void`)

```ts [my-module-example/module.ts]
import { createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    nuxt.hook('i18n:registerModule', register => {
      register({
        // langDir 路径需要被解析
        langDir: resolve('./lang'),
        locales: [
          {
            code: 'en',
            file: 'en.json',
          },
          {
            code: 'fr',
            file: 'fr.json',
          },
        ]
      })
    })
  }
})
```

另见 [扩展消息钩子](/docs/guide/extend-messages)
