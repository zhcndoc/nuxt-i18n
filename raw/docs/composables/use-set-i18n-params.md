# useSetI18nParams

> useSetI18nParams() 返回一个用于设置当前路由翻译参数的函数。
> 关于其用法的更多细节，请参阅语言切换指南。

`useSetI18nParams()` 返回一个用于设置当前路由翻译参数的函数。<br />


关于其用法的更多细节，请参阅[语言切换指南](/docs/guide/lang-switcher#dynamic-route-parameters)。

## 类型

```ts
declare function useSetI18nParams(options?: SeoAttributesOptions): (locale: Record<Locale, unknown>) => void
```

## 参数

### `options`

**类型**: `SeoAttributesOptions | undefined`

一个 `SeoAttributesOptions` 对象，默认值为 `undefined`。更多详情请参阅[SEO 指南](/docs/guide/seo#feature-details)。

## 用法

```vue
<script setup>
// 从 API 获取产品数据…（红色马克杯）

const setI18nParams = useSetI18nParams({
  canonicalQueries: ['foo']
})
setI18nParams({
  en: { slug: data.slugs.en }, // slug: 'red-mug'
  nl: { slug: data.slugs.nl }  // slug: 'rode-mok'
})

const switchLocalePath = useSwitchLocalePath()
switchLocalePath('en') // /products/red-mug
switchLocalePath('nl') // /nl/products/rode-mok
</script>

<template>
  <!-- pages/products/[slug].vue -->
</template>
```
