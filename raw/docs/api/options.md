# 选项

> 配置 Nuxt I18n 时可用的所有选项。

## vueI18n

- 类型: `string`
- 默认值: `''`

用于构建时配置 Vue I18n 的选项，该选项在本模块内部使用。完整文档见 [这里](https://vue-i18n.intlify.dev/api/general.html#createi18n)

可通过配置文件传递 `createI18n()` 的配置。默认情况下，如果未指定任何内容，模块会扫描 `i18n.config{.js,.mjs,.ts}` 文件。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    vueI18n: './nuxt-i18n.js' // 自定义路径示例
  }
})
```

需要使用 **普通对象** 或 **函数** 使用 `export default` 导出。

导出普通对象示例：

```ts
export default {
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
}
```

导出函数示例：

```ts
import en from '../locales/en.json'
import fr from '../locales/fr.yaml'

// 你可以使用 `defineI18nConfig` 来获取传递给 vue-i18n 的选项的类型推断。
export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'en',
    messages: {
      en,
      fr
    }
  }
})
```

<callout icon="i-heroicons-exclamation-triangle" color="warning">

Vue I18n 的 `messages` 选项应由 **普通对象** 返回。

这将在 nuxt i18n 模块中通过 vue-i18n 的消息编译器预编译为可在 vue-i18n 运行时执行的消息。

</callout>

## baseUrl

- 类型: `string | Function`
- 默认值: `''`

用于 `hreflang` 标签中备用 URL 的基础 URL 前缀。默认使用 VueRouter 的基础 URL，仅当其不可用时才使用备用 URL。

也可以是一个函数（会传入 Nuxt 上下文作为参数），返回字符串。适用于基于请求头动态生成基础 URL。

该属性也可通过 [`runtimeConfig`](/docs/api/runtime-config) 设置。

<callout icon="i-heroicons-light-bulb">

使用 SEO 特性时设置此选项尤为重要，因为生成的 SEO 标签需要使用完全限定的 URL。

</callout>

## locales

- 类型: `string[] | LocaleObject[]`
- 默认值: `[]`

应用支持的语言列表。可以是语言代码数组（如 `['en', 'fr', 'es']`），也可以是更复杂的本地化对象数组：

```json
[
  { "code": "en", "language": "en-US", "file": "en.js", "dir": "ltr" },
  { "code": "ar", "language": "ar-EG", "file": "ar.js", "dir": "rtl" },
  { "code": "fr", "language": "fr-FR", "file": "fr.js" }
]
```

对象形式的属性说明如下：

### `code`

- 类型: `string`
- 本地化唯一标识符

### `language`

- 类型: `undefined | string`
- **使用 SEO 功能时必填**
- 用于 SEO 和[`detectBrowserLanguage`](/docs/api/options#detectbrowserlanguage) 匹配浏览器语言的语言范围。应使用 IETF 的 [BCP47](https://www.rfc-editor.org/info/bcp47)定义的[语言标签语法](https://www.w3.org/International/articles/language-tags/)，例如：

  - `'en'`（仅语言子标签，英语）
  - `'fr-CA'`（语言+地区，法语加拿大用法）
  - `'zh-Hans'`（语言+书写脚本，简体中文）

### `file`

- 类型: `null | string | { path: string; cache: string; }`
- 文件名。相对于 `langDir` 路径解析，用于加载本地化消息。

### `files`

- 类型: `null | string[] | { path: string; cache: string; }[]`
- 定义多个本地化消息的文件名数组。相对于 `langDir` 路径解析。

See also [Multiple files lazy loading](/docs/guide/lazy-load-translations#multiple-files-lazy-loading) to learn more.

### `dir`

- 类型: `null | 'rtl' | 'ltr' | 'auto'`
- 指定元素及内容的方向，可为 `'rtl'`（右到左），`'ltr'`（左到右），或 `'auto'`。

### `domain`

- 类型: `null | string`
- 该本地化使用的域名（包括端口号）。该属性也可通过 [`runtimeConfig`](/docs/api/runtime-config) 设置。使用 [`differentDomains`](/docs/api/options#differentdomains) 时必填。

### `domains`

- 类型: `null | string[]`
- `domain`的数组。使用 [`multiDomainLocales`](/docs/api/options#multiDomainLocales) 并且多个域名包含同一语言时必填。

### `defaultForDomains`

- 类型: `null | string[]`
- （使用 [`multiDomainLocales`](/docs/api/options#multiDomainLocales) 时可选）
- 指定当使用多个 `domains` 时哪个域名数组对应的语言应为默认语言。

### `domainDefault`

- 类型: `null | boolean`
- 设置为 `true` 表示该语言为特定域的默认语言。使用 [`differentDomains`](/docs/api/options#differentdomains) 并且一个或多个域名有多个语言时必填。

### `...`

- 自定义的任意属性会在运行时暴露。可用于例如定义语言名称供页面上的语言选择器使用。

可通过 `localeProperties` 属性访问当前语言的所有属性。若为语言代码数组，仅包含 `code` 属性。

## defaultDirection

- 类型: `string`
- 默认值: `ltr`

应用默认文本方向，仅在 `dir` 未指定时生效。

## defaultLocale

- 类型: `string | null`
- 默认值: `null`

应用默认语言，应匹配定义的 `locales` 中的语言代码。

使用 `prefix_except_default` 策略时，此处指定的语言的 URL 不带前缀。**建议无论使用何种策略都设置此项**，它作为访问不存在路由时的回退语言。

## strategy

- 类型: `'no_prefix' | 'prefix_except_default' | 'prefix' | 'prefix_and_default'`
- 默认值: `'prefix_except_default'`

路由生成策略，可选：

- `'no_prefix'`：路由不带语言前缀
- `'prefix_except_default'`：除默认语言外均添加语言前缀
- `'prefix'`：所有语言都添加语言前缀
- `'prefix_and_default'`：所有语言包括默认语言均添加前缀

## customRoutes

- 类型: `'meta' | 'page' | 'config'`
- 默认值: `'page'`

自定义路径的来源：

- `'meta'`：从页面组件中 `definePageMeta()` 函数提取
- `'page'`：从页面组件中 `defineI18nRoute()` 宏提取
- `'config'`：在模块配置的 `pages` 选项中配置

## pages

- 类型: `object`
- 默认值: `{}`

当 `customRoutes` 设置为 `config` 时，模块将在此查找自定义路由。使用方式见[路由](/docs/guide)。

## skipSettingLocaleOnNavigate

- 类型: `boolean`
- 默认值: `false`

若为 `true`，切换语言时不自动设置本地化。适合在页面切换结束后自行调用 [`finalizePendingLocaleChange`](/docs/api/vue-i18n#finalizependinglocalechange) 设置语言。详见[等待页面过渡](/docs/guide/lang-switcher#wait-for-page-transition)。

## defaultLocaleRouteNameSuffix

- 类型: `string`
- 默认值: `'default'`

默认语言路由名称的内部后缀，仅在策略为 `prefix_and_default` 时使用，通常不需要更改。

## routesNameSeparator

- 类型: `string`
- 默认值: `'___'`

生成的每个语言路由名称间的内部分隔符，通常不需更改。

## rootRedirect

- 类型: `string | { statusCode: number; path: string; } | null`
- 默认值: `null`

指定访问根路径 (`'/'`) 时的重定向路径。可为字符串或含有 `statusCode` 和 `path` 的对象，例如：

```json
{
  "statusCode": 301,
  "path": "about-us"
}
```

## redirectStatusCode

- 类型: `number`
- 默认值: `302`

指定在从任何 URL（除了根 URL '/'）重定向到本地化路由时使用的 HTTP 状态代码。

## langDir

- 类型: `string`
- 默认值: `locales`

翻译文件目录的相对路径。

路径相对于项目根目录的 `restructureDir` 解析（默认是 `'i18n'`）。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

绝对路径在生产环境会失败（例如 `'/locales'` 应改为 `'locales'` 或 `'./locales'`）

</callout>

## detectBrowserLanguage

- 类型: `object | boolean`

启用浏览器语言检测，首次访问自动重定向到首选语言。

详见[浏览器语言检测](/docs/guide/browser-language-detection)。

<callout icon="i-heroicons-light-bulb">

为更好 SEO，推荐将 `redirectOn` 设置为 `'root'`。

</callout>

设置为 `false` 禁用。

支持的属性：

### `alwaysRedirect`

- 类型: `boolean`
- 默认值: `false`

是否总是重定向到 cookie 中保存的语言，而非仅首次访问时。

### `fallbackLocale`

- 类型: `string | null`

浏览器语言不匹配任何可用语言时使用的回退语言。

### `redirectOn`

- 类型: `string`
- 默认值: `'root'`

支持的选项：

- `'all'`：所有路径都检测浏览器语言。
- `'root'`（推荐以提升 SEO）：仅在根路径 (`'/'`) 检测。仅在使用非 `'no_prefix'` 策略时生效。
- `'no prefix'`：相较 `'root'` 更宽松，检测根路径及无语言前缀的路径（如 `'/foo'`）。仅在使用非 `'no_prefix'` 策略时生效。

### `useCookie`

- 类型: `boolean`
- 默认值: `true`

是否使用 cookie 记录用户重定向状态，防止重复重定向。设为 `false` 则每次访问都会重定向。

### `cookieKey`

- 类型: `string`
- 默认值: `'i18n_redirected'`

cookie 名称。

### `cookieDomain`

- 类型: `string | null`
- 默认值: `null`

覆盖 cookie 的默认域，默认为站点的 **host**。

### `cookieCrossOrigin`

- 类型: `boolean`
- 默认值: `false`

为 `true` 时，在 cookie 上设置 `SameSite=None; Secure`，允许跨域使用（如嵌入 iframe 的情况）。

### `cookieSecure`

- 类型: `boolean`
- 默认值: `false`

设置 cookie 的 `Secure` 标志。

## differentDomains

- 类型: `boolean`
- 默认值: `false`

当每种语言使用不同域名时设置为 `true`。启用时必须将 `locales` 配置为含有 `domain` 键的对象数组。详见[不同域名](/docs/guide/different-domains)。

## multiDomainLocales

- 类型: `boolean`
- 默认值: `false`

使用多域名和多语言时设置为 `true`。启用时必须将 `locales` 配置为含有 `domains` 和 `defaultForDomains` 键的对象数组。详见[多域名语言](/docs/guide/multi-domain-locales)。

## compilation

- 类型: `object`
- 默认值: `{ strictMessage: true, escapeHtml: false }`

编译本地化消息时的行为配置。

支持属性：

### `strictMessage`

- 类型: `boolean`
- 默认值: `true`

严格检查本地化消息是否包含 HTML 标签。若包含，抛出错误。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

如不想抛错，可设置为 `false`，但 **可能导致 XSS 安全风险**，此时建议开启 `escapeHtml` 选项。

</callout>

### `escapeHtml`

- 类型: `boolean`
- 默认值: `false`

是否对消息中的 HTML 标签进行转义。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

若禁用 `strictMessage`，建议启用此选项。

</callout>

## bundle

- 类型: `object`
- 默认值: `{ compositionOnly: true, runtimeOnly: false, fullInstall: true, dropMessageCompiler: false }`

配置 nuxt i18n 模块的打包优化。

支持属性：

### `compositionOnly`

- 类型: `boolean`
- 默认值: `true`

是否仅使用 vue-i18n 的 Composition API。默认会进行遗留 API 的 tree-shaking。详情见 [此处](https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags)

<callout icon="i-heroicons-exclamation-triangle" color="warning">

若要使用 Vue I18n 的遗留 API，必须将 `compositionOnly: false`。**此时 Vue I18n 的 Composition API 将被禁用。**

遗留 API 还可通过在 i18n.config 中设置 `allowComposition: true` 混合使用，但有限制。详情见 [这里](https://vue-i18n.intlify.dev/guide/migration/vue3.html)。

</callout>

### `runtimeOnly`

- 类型: `boolean`
- 默认值: `false`

是否在构建时自动使用 Vue I18n 的 runtime-only 版本。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

启用此选项时，vue-i18n 消息编译器不会被打包。这意味着无法动态获取后端 API 提供的本地化消息，也无法程序化合成本地化消息。即，**必须在构建时完全解析本地化消息。**

</callout>

### `fullInstall`

- 类型: `boolean`
- 默认值: `true`

是否安装完整 API、组件等。若设为 `false`，则内建组件(`<i18n-t>`, `<i18n-d>`, `<i18n-n>`)和指令(`v-t`)不会被安装到 Vue 中，会被 tree-shake。详情见 [此处](https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags)

### `dropMessageCompiler`

- 类型: `boolean`
- 默认值: `false`

是否在打包时将消息编译器 tree-shake。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

开启此项时，**须确保应用中的资源已由 nuxt i18n 模块预编译**。若资源通过后端 API 动态加载，启用此项将导致消息编译失败。

</callout>

### `onlyLocales`

- 类型: `string | string[]`
- 默认值: `undefined`

指定要包含的语言代码，未包含的将被剔除。

适用于一个代码库（如 [Nuxt Layers](https://nuxt.com/docs/getting-started/layers)）支持多个语言不同项目的情况。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

该 **选项不会与其他 Nuxt Layers 合并**。应只在最终项目配置中指定。

</callout>

## experimental

实验性配置对象，包含以下属性：

### `localeDetector`

- 类型: `string`
- 默认值: `''`
- 指定服务器端每次请求调用的语言检测器脚本路径。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

关于如何定义语言检测器，详见 [`defineI18nLocaleDetector()` API](/docs/composables/define-i18n-locale-detector)

</callout>

### `strictSeo`

- 类型: `boolean | SeoAttributesOptions`
- 默认值: `false`
- 启用严格的 SEO 模式。

### `typedPages`

- 类型: `boolean`
- 默认值: `true`
- 生成用于组合式 API 和配置的路由类型。当 Nuxt 的 `experimental.typedRoutes` 启用时默认开启。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

此功能依赖于 [Nuxt 的 `experimental.typedRoutes`](https://nuxt.com/docs/guide/going-further/experimental-features#typedpages)，未启用则不可用。

</callout>

### `typedOptionsAndMessages`

- 类型: `false | 'default' | 'all'`
  - `false`：禁用类型生成
  - `'default'`：基于配置的 `defaultLocale` 生成类型（性能更优）
  - `'all'`：基于全部配置语言生成类型
- 默认值: `false`
- 生成 `vue-i18n` 和消息函数中的类型定义。

### `alternateLinkCanonicalQueries`

- 类型: `boolean`
- 默认值: `true`
- 移除备用链接 meta 标签中的非规范查询参数。

### `httpCacheDuration`

- 类型: `number`
- 默认值: `10`
- HTTP 缓存持续时间（秒），用于消息 API 端点。控制浏览器缓存翻译数据的时长。可设置更高值（例如 `86400`，即 24 小时）以减少对未变更翻译的冗余网络请求。

## `hmr`

- 类型: `boolean`
- 默认值: `true`
- 开发模式下热模块替换支持语言文件和 vue-i18n 配置。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

该功能仅支持使用 vite 的项目。

</callout>

## customBlocks

配置 SFC 的 `i18n` 自定义块。

支持属性：

### `defaultSFCLang`

- 类型: `'json' | 'json5' | 'yaml' | 'yml'`
- 默认值: `'json'`
- 指定内联 `i18n` 自定义块的内容格式。详见 [unplugin-vue-i18n 文档](https://github.com/intlify/bundle-tools/blob/main/packages/unplugin-vue-i18n/README.md#defaultsfclang)

内联 `i18n` 自定义块指定了 `lang` 属性时，不适用此默认值。

例如，设置 `defaultSFCLang: "yaml"` 或 `defaultSFCLang: "yml"`，如下自定义块：

```vue
<i18n lang="yaml">
en:
  hello: Hello
es:
  hello: Hola
</i18n>
```

等同于：

```vue
<i18n>
en:
  hello: Hello
es:
  hello: Hola
</i18n>
```

### `globalSFCScope`

- 类型: `boolean`
- 默认值: `false`
- 是否将所有 SFC 上的 `i18n` 自定义块放在全局作用域。详见 [unplugin-vue-i18n 文档](https://github.com/intlify/bundle-tools/blob/main/packages/unplugin-vue-i18n/README.md#globalsfcscope)

<callout icon="i-heroicons-exclamation-triangle" color="warning">

开启 `globalSFCScope: true`，所有 SFC 的 `i18n` 自定义块均为全局作用域，请谨慎使用。

</callout>

例如，设置 `globalSFCScope: true`，如下自定义块：

```vue
<i18n lang="yaml" global>
en:
  hello: Hello
es:
  hello: Hola
</i18n>
```

等同于：

```vue
<i18n lang="yaml">
en:
  hello: Hello
es:
  hello: Hola
</i18n>
```

该功能与 `defaultSFCLang` 配合使用，例如 `defaultSFCLang: "yaml"`：

```vue
<i18n>
en:
  hello: Hello
es:
  hello: Hola
</i18n>
```

## types

- 类型: `'composition' | 'legacy'`
- 默认值: `'composition'`

强制使用的 API 类型定义风格。

- 设为 `'composition'`，支持 Vue I18n 和 `@nuxtjs/i18n` 的 Composition API 类型。
- 设为 `'legacy'`，支持 Options API 类型。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

可能需要运行 `nuxi prepare` 以更新生成的类型。

</callout>

## debug

- 类型: `boolean | 'verbose'`
- 默认值: `false`

是否开启 `@nuxtjs/i18n` 的调试模式。设为 `true` 或 `'verbose'` 会输出日志，后者还会输出加载的消息对象。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

此选项用于帮助排查问题。

不建议在生产环境开启，会影响性能。

</callout>

## parallelPlugin

- 类型: `boolean`
- 默认值: `false`

设置插件为 `parallel` 类型。详见 [nuxt 插件加载策略](https://nuxt.com/docs/guide/directory-structure/plugins#loading-strategy)。

## restructureDir

- 类型: `string`
- 默认值: `'i18n'`

用于解析 i18n 文件的目录配置。

## autoDeclare

- 类型: `boolean`
- 默认值: `true`
- 在 `<script setup>` 使用时，自动导入/初始化 `$t()`, `$rt()`, `$d()`, `$n()`, `$tm()` 和 `$te()` 函数。

<callout icon="i-heroicons-exclamation-triangle" color="warning">

该功能依赖于 [Nuxt 的自动导入](https://nuxt.com/docs/guide/concepts/auto-imports)，若禁用则不生效。

</callout>

## serverRoutePrefix

- 类型: `string`
- 默认值: `'/_i18n'`

设置用于加载语言消息的服务器路由前缀。
