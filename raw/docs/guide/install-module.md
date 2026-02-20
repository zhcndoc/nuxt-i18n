# 模块集成

> 如何在模块内部集成 Nuxt i18n。

如果你的模块依赖于 Nuxt i18n，可以使用 `moduleDependencies` 来声明依赖关系，并定义默认或覆盖选项。更多信息请参见 Nuxt 的[模块作者指南](https://nuxt.com/docs/4.x/guide/modules/recipes-basics#use-other-modules)。

你需要将 `vueI18n`、`langDir` 以及 `locales` 中配置的路径解析为绝对路径：

```ts
import { createResolver, defineNuxtModule } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

export default defineNuxtModule({
  moduleDependencies: {
    '@nuxtjs/i18n': {
      defaults: {
        vueI18n: resolver.resolve('./i18n.config.ts'),
        langDir: resolver.resolve('./lang'),
        locales: [
          { code: 'en', file: resolver.resolve('./lang/en.json') },
          { code: 'fr', file: resolver.resolve('./lang/fr.json') },
        ]
      }
    }
  },
  // ...
})
```
