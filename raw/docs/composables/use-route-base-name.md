# useRouteBaseName

> useRouteBaseName() 组合式函数返回一个函数，该函数用于获取路由的基本名称。

`useRouteBaseName()` 组合式函数返回一个函数，该函数用于获取路由的基本名称。

## 类型

```ts
declare function useRouteBaseName(
  options?: I18nCommonRoutingOptionsWithComposable
): (givenRoute: string | Route | RouteLocationNormalizedLoaded) => string | undefined
```

## 用法

```vue
<script setup>
const route = useRoute()
const routeBaseName = useRouteBaseName()
const baseRouteName = computed(() => routeBaseName(route))
// 或者
const baseRouteNameString = computed(() => routeBaseName(route.name))
</script>

<template>
  <p>路由基本名称: {{ baseRouteName }}</p>
</template>
```
