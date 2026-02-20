# useCookieLocale

> useCookieLocale() 组合式函数返回 cookie 语言环境。

`useCookieLocale()` 组合式函数返回 cookie 语言环境。

如果此组合式函数在客户端调用，它会通过 `useCookie()` 从 `document.cookie` 的值中检测语言环境；如果在服务器端调用，则从 `cookie` 头的值中检测语言环境。

请注意，如果 `detectBrowserLanguage.useCookie` 的值为 `false`，则总是返回 **空字符串**。

## 类型

```ts
declare function useCookieLocale(): Ref<string>
```
