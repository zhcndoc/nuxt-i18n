# useBrowserLocale

> useBrowserLocale() 组合式函数返回浏览器的语言环境。

`useBrowserLocale()` 组合式函数返回浏览器的语言环境。

如果该组合式函数在客户端调用，它会从 `navigator.languages` 的值中检测语言环境。

否则在服务器端，则从 `accept-language` 头的值中检测语言环境。

## 类型

```ts
declare function useBrowserLocale(): string | null
```
