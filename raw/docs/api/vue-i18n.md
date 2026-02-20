# Vue I18n

> Vue I18n 的扩展

<callout icon="i-heroicons-light-bulb">

[Composer（用于组合式 API）](https://vue-i18n.intlify.dev/api/composition.html#composer) 或 [VueI18n（用于传统 API）](https://vue-i18n.intlify.dev/api/legacy.html#vuei18n) 的实例作为 `$i18n` 暴露在 Vue 实例上。

</callout>

### `getLocaleCookie()`

- **参数**：

  - 无参数
- **返回**：`string | undefined`

从存储的 locale cookie 中返回区域代码。

### `setLocaleCookie()`

- **参数**：

  - locale（类型：`string`）
- **返回**：`undefined`

使用指定的区域代码更新存储的 locale cookie。如果要切换区域，建议使用 `setLocale`。

### `setLocale()`

- **参数**：

  - locale（类型：`string`）
- **返回**：`Promise<void>`

将应用的区域切换为指定的区域代码。如果启用了 `useCookie` 选项，locale cookie 将更新为新值。如果启用了前缀（策略不为 `no_prefix`），将导航至新区域的路由。

### `loadLocaleMessages()`

- **参数**：

  - locale（类型：`string`）
- **返回**：`Promise<void>`

加载指定区域代码的翻译消息，适用于使用尚未加载的区域翻译时。

### `getBrowserLocale()`

- **参数**：

  - 无参数
- **返回**：`string | undefined`

返回经过选项中定义的区域过滤的浏览器区域代码。

### `finalizePendingLocaleChange()`

- **参数**：

  - 无参数
- **返回**：`Promise<void>`

切换至待定区域，用于当导航区域切换被 [`skipSettingLocaleOnNavigate`](/docs/api/options#skipsettinglocaleonnavigate) 选项阻止时。详情见 [等待页面过渡](/docs/guide/lang-switcher#wait-for-page-transition)。

### `waitForPendingLocaleChange()`

- **参数**：

  - 无参数
- **返回**：`Promise<void>`

返回一个 Promise，当待定区域设置完成后该 Promise 被解析。

### strategy

- 类型：`Strategies`

选项中指定的路由策略。

### defaultDirection

- **类型**：`Directions`

选项中指定的默认方向。

### defaultLocale

- **类型**：`string`

选项中指定的默认区域。

### localeCodes

- **类型**：`Array<string>`

已注册区域的区域代码列表。

### locales

- **类型**：`Array<string | LocaleObject>`

选项中定义的区域列表。

### localeProperties

- **类型**：`LocaleObject`

当前区域属性的对象。

### differentDomains

- **类型**：`boolean`

是否启用了 `differentDomains` 选项。
