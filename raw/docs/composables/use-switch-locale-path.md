# useSwitchLocalePath

> useSwitchLocalePath() 组合式函数返回一个允许切换语言环境的函数。

`useSwitchLocalePath()` 组合式函数返回一个允许切换语言环境的函数。

## 类型

```ts
declare function useSwitchLocalePath(options?: I18nCommonRoutingOptionsWithComposable): (locale?: Locale) => string
```

## 用法

```vue
<script setup>
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <NuxtLink :to="switchLocalePath('en')">English</NuxtLink>
  <NuxtLink :to="switchLocalePath('fr')">Français</NuxtLink>
</template>
```
