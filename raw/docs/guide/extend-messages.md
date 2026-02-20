# 扩展消息钩子

> 在项目中使用 Nuxt 钩子来扩展 i18n 消息。

如果你是一个**模块作者**，希望该模块为你的项目提供额外的消息内容，可以通过使用 `'i18n:registerModule'` 钩子将其合并到正常加载的消息中。

这在你的模块使用了翻译内容并且想要提供良好的默认翻译时尤其有用。

在你的模块设置文件中监听 Nuxt 的 `'i18n:registerModule'` 钩子并注册你的 i18n 配置，这类似于[懒加载翻译](/docs/guide/lazy-load-translations)的配置方式。

通过这种方式添加的翻译将会在项目中添加的翻译之后加载，并且在扩展层之前加载。

示例：

<code-group>

```ts [my-module-example/module.ts]
import { createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.hook('i18n:registerModule', register => {
      register({
        // 需要解析 langDir 路径
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

```json [en.json]
{
  "my-module-example": {
    "hello": "来自外部模块的问候"
  }
}
```

```json [fr.json]
{
  "my-module-example": {
    "hello": "来自外部模块的问候"
  }
}
```

</code-group>

现在，项目可以访问新的消息，并通过 `$t('my-module-example.hello')` 使用它们。

<callout icon="i-heroicons-light-bulb">

由于模块的消息会与项目的消息合并，最好为其添加前缀。主项目的消息**始终会覆盖**模块提供的消息。

</callout>
