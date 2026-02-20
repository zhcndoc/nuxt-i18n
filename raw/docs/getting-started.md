# 安装

> 开始使用 Nuxt i18n 模块。

<callout icon="i-heroicons-light-bulb">

Nuxt i18n 模块为您的项目配置 **Vue I18n v11**，有关其功能的深入指南，请参阅 [Vue i18n 文档](https://vue-i18n.intlify.dev/)。

</callout>

## 快速开始

1. 将 `@nuxtjs/i18n` 作为开发依赖安装到您的项目中：

```bash
npx nuxi@latest module add @nuxtjs/i18n
```

1. 在 `nuxt.config` 的 modules 中添加 `@nuxtjs/i18n`：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n']
})
```

## 配置

您可以通过在 `nuxt.config` 根目录中使用 `i18n` 属性来设置模块选项。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    // 模块选项
  }
})
```

## Edge 版本渠道

### 选择加入

您可以选择加入 `main` 分支上的最新提交，以免等待下一个版本的发布，并通过测试新变更帮助模块。

更新您 `package.json` 中的 `@nuxtjs/i18n` 依赖：

```diff [package.json]
{
  "devDependencies": {
-   "@nuxtjs/i18n": "^9.0.0"
+   "@nuxtjs/i18n": "npm:@nuxtjs/i18n-edge"
  }
}
```

删除锁文件（`package-lock.json`、`yarn.lock` 或 `pnpm-lock.yaml`）并重新安装依赖。

### 选择退出

更新您 `package.json` 中的 `@nuxtjs/i18n` 依赖：

```diff [package.json]
{
  "devDependencies": {
-   "@nuxtjs/i18n": "npm:@nuxtjs/i18n-edge"
+   "@nuxtjs/i18n": "^9.0.0"
  }
}
```

删除锁文件（`package-lock.json`、`yarn.lock` 或 `pnpm-lock.yaml`）并重新安装依赖。
