# 忽略本地化路由

> 为每个页面组件自定义本地化路由排除配置。

<callout color="warning" icon="i-heroicons-exclamation-triangle">

当使用 `'no_prefix'` [策略](/docs/guide) 时不支持此功能，除非你同时使用了 [`differentDomains`](/docs/guide/different-domains)。

</callout>

如果你希望某些页面只在部分语言中可用，可以配置支持语言列表来覆盖全局设置。选项可以在页面组件内或模块配置中全局指定。

### 选择本地化路由

<code-group>

```vue [about-meta.vue]
// pages/about.vue
<script setup>
definePageMeta({
  i18n: { locales: ['fr', 'es'] }
})
</script>
```

```vue [about-macro.vue]
// pages/about.vue
<script setup>
defineI18nRoute({
  locales: ['fr', 'es']
})
</script>
```

```ts [nuxt.config.ts]
i18n: {
  pages: {
    about: {
      en: false,
    }
  }
}
```

</code-group>

### 禁用本地化路由

<code-group>

```vue [about-meta.vue]
// pages/about.vue
<script setup>
definePageMeta({ i18n: false })
</script>
```

```vue [about-macro.vue]
// pages/about.vue
<script setup>
defineI18nRoute(false)
</script>
```

```ts [nuxt.config.ts]
i18n: {
  customRoutes: 'config',
  pages: {
    about: false
  }
}
```

</code-group>
