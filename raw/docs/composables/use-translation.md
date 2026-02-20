# useTranslation

> useTranslation() 组合函数返回翻译函数。

`useTranslation()` 组合函数返回翻译函数。

翻译函数使用的语言环境是由 [`experimental.localeDetector` 选项](/docs/api/options#experimental) 中定义的函数检测到的语言环境。

<callout color="warning" icon="i-heroicons-exclamation-triangle">

**此组合函数为实验性功能，仅适用于服务器端。**

</callout>

## 类型

```ts
declare function useTranslation<Schema extends Record<string, any> = {}, Event extends H3Event = H3Event>(
  event: Event
): Promise<TranslationFunction<Schema, DefineLocaleMessage>>
```

## 用法

```ts
export default defineEventHandler(async event => {
  const t = await useTranslation(event)
  return {
    hello: t('hello')
  }
})
```
