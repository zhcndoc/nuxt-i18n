# useLocaleHead

> useLocaleHead() 组合式函数返回与本地化相关的头部属性。

`useLocaleHead()` 组合式函数返回与本地化相关的头部属性。

## 类型

```ts
declare function useLocaleHead(options: I18nHeadOptions): Ref<I18nHeadMetaInfo>
```

## 参数

### `options`

一个对象，接受以下可选字段：

- `dir`
  - 类型: `boolean`
  - 默认值: `true`
  - 向 HTML 元素添加 `dir` 属性。
- `lang`
  - 类型: `boolean`
  - 默认值: `true`
  - 向 HTML 元素添加 `lang` 属性。
- `seo`
  - 类型: `boolean | SeoAttributesOptions`
  - 添加各种 SEO 属性。

## 用法

```vue
<script setup>
const i18nHead = useLocaleHead({
  seo: {
    canonicalQueries: ['foo']
  }
})
useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
}))
</script>
```
