# 懒加载翻译

> 如何懒加载翻译内容。

对于包含大量翻译内容的应用，最好不要将所有消息都打包进主包，而是只懒加载用户选择的语言。
这可以通过 **Nuxt i18n 模块** 实现，让模块知道你的翻译文件位置，从而在应用加载或用户切换语言时动态导入它们。
要启用翻译的懒加载，请在配置 **Nuxt i18n 模块** 时按以下步骤操作：

- 将 `locales` 选项配置为对象数组，每个对象包含 `file` 或 `files` 键，其值为对应语言的翻译文件。
- 可选地，移除你可能通过 `vueI18n` 选项传递给 Vue I18n 的所有消息。
- 每个 `file` 或 `files` 可以返回一个 `Object`，或返回一个 `Promise` 的函数，该 `Promise` 必须返回一个 `Object`。

## 基本用法

示例文件结构：

```bash
-| nuxt-project/
---| i18n/
-----| locales/
-------| en-US.json
-------| es-ES.js
-------| fr-FR.ts
---| nuxt.config.ts
```

配置示例：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json'
      },
      {
        code: 'es',
        file: 'es-ES.js'
      },
      {
        code: 'fr',
        file: 'fr-FR.ts'
      }
    ],
    defaultLocale: 'en'
  }
})
```

```ts [i18n/locales/fr-FR.ts]
export default defineI18nLocale(async locale => {
  return {
    welcome: 'Bienvenue'
  }
})

// 或者

export default {
  welcome: 'Bienvenue'
}
```

<callout icon="i-heroicons-light-bulb">

如果你的函数返回的是一个 locale 消息对象，**必须在 defineI18nLocale() 组合函数中定义它**。

关于 `defineI18nLocale()` 的详细信息，请参阅 [这里](/docs/composables/define-i18n-locale)。

</callout>

如果函数返回的是 Nuxt i18n 模块可识别的对象，你可以通过 fetch 配置动态的语言环境消息，比如调用 API（包括外部 API）或后端：

```ts
export default defineI18nLocale(locale => {
  // 例如，从 nuxt 服务器获取语言环境消息
  return $fetch(`/api/${locale}`)
})
```

## 多文件懒加载

`files` 属性可以用来懒加载多个文件。

这非常有用，因为管理多个仅定义差异的文件，而不重复语言环境消息，是非常高效的。

例如，支持西班牙语的情况。根据 [维基百科](https://en.wikipedia.org/wiki/Spanish_language#Geographical_distribution)，西班牙语是 **20 个国家** 的官方语言！

如果这些国家都用 `file` 单独配置，则由于各国语言消息重复，会难以维护。

在这种情况下，把目标语言所有共享（通用）的语言环境消息放在一个单独的文件中，分别为每个国家定义方言变体以防止重复，更易于维护。

下面是一个包含西班牙语语言环境文件的 lang 目录示例：

```bash
-| nuxt-project/
---| i18n/
-----| locales/
-------| es.json    # 西班牙语通用语言环境消息
-------| es-AR.json # 阿根廷语言环境消息
-------| es-UY.json # 乌拉圭语言环境消息
-------| es-US.json # 美国语言环境消息
-------| ...        # 其他国家
---| nuxt.config.ts
```

下面是 `nuxt.config.ts` 中的示例配置：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    locales: [
      /**
       * 西班牙语国家的 `files` 示例定义
       */
      {
        code: 'es-AR',
        name: 'Español (Argentina)',
        // 懒加载顺序: `es.json` -> `es-AR.json`，然后 'es-AR.json' 会覆盖 'es.json'
        files: ['es.json', 'es-AR.json']
      },
      {
        code: 'es-UY',
        name: 'Español (Uruguay)',
        // 懒加载顺序: `es.json` -> `es-UY.json`，然后 'es-UY.json' 会覆盖 'es.json'
        files: ['es.json', 'es-UY.json']
      },
      {
        code: 'es-US',
        name: 'Español (Estados Unidos)',
        // 懒加载顺序: `es.json` -> `es-US.json`，然后 'es-US.json' 会覆盖 'es.json'
        files: ['es.json', 'es-US.json']
      }
    ],
    defaultLocale: 'en'
  }
})
```

请注意 `files` 属性的用法，上述配置中指定了一个包含多个文件名的数组。

@nuxtjs/i18n 会按照 `files` 中数组指定的顺序懒加载语言消息，再按加载顺序覆盖语言消息。

以上 `es-AR` 示例中，`files` 定义了 `es.json` 和 `es-AR.json`，@nuxtjs/i18n 会先懒加载 `es.json`，再懒加载 `es-AR.json` 并覆盖掉 `es.json` 的对应消息。

示例中只定义了两个文件，但你完全可以指定超过 2 个文件，它们也会按数组顺序加载并覆盖。

利用这种依次覆盖语言消息的特性，可以基于差异化定义管理语言环境消息。通过将共享（通用）语言消息作为 `files` 的第一个条目，再跟上区域/方言语言消息文件条目，即可避免语言环境消息的重复并高效管理资源。

## 缓存

懒加载的语言环境消息会基于文件名缓存，在多个语言间共享的 `file` 和 `files` 一旦加载过就会从缓存中读取。默认情况下，静态文件启用缓存，而由函数返回消息的文件禁用缓存。

缓存可以通过将 `file` 或 `files` 中的条目设置为 `{ path: string, cache?: boolean}` 类型的对象逐个配置。下面示例展示了几种有效的文件配置方式。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    locales: [
      /**
       * 西班牙语国家的 `files` 示例定义
       */
      {
        code: 'es-ES',
        name: 'Español (Spain)',
        // 禁用缓存的文件
        file: { path: 'es.js', cache: false }
      },
      {
        code: 'es-AR',
        name: 'Español (Argentina)',
        // 禁用缓存的多个文件
        files: [
          { path: 'es.js', cache: false },
          { path: 'es-AR.js', cache: false }
        ]
      },
      {
        code: 'es-UY',
        name: 'Español (Uruguay)',
        // 字符串和对象配置的混合使用
        files: [{ path: 'es.js', cache: false }, 'es-UY.json']
      }
    ],
    defaultLocale: 'en'
  }
})
```

## 使用未加载语言环境的翻译

由于只加载当前语言环境的翻译，若要使用其他语言的翻译，必须手动加载对应的语言环境。

Nuxt i18n 扩展了 Vue i18n，提供了 `loadLocaleMessages` 函数来手动加载语言环境消息，以下示例演示了用法。

```ts
const { loadLocaleMessages, t } = useI18n()

await loadLocaleMessages('nl')

const welcome = computed(() => t('welcome')) // Welcome!
const welcomeDutch = computed(() => t('welcome', 1, { locale: 'nl' })) // Welkom!
```

<callout icon="i-heroicons-light-bulb">

由于消息可能从远程 API 加载，调用 `loadLocaleMessages` 函数会始终加载消息，不必要的加载会影响性能。

</callout>
