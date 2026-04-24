---
title: 'Nuxt 应用的 I18n'
description: '由 Vue I18n 提供支持的 Nuxt 项目国际化模块。'
navigation: false
---

::u-page-hero
---
orientation: horizontal
links:
  - label: 开始使用
    trailingIcon: i-heroicons-arrow-right-20-solid
    to: /docs/getting-started
    size: lg
  - label: GitHub 星标
    icon: i-simple-icons-github
    size: lg
    variant: ghost
    color: neutral
    to: https://github.com/nuxt-modules/i18n
    target: _blank
ui:
  container: 'relative overflow-hidden py-10 flex flex-col md:flex-row items-center gap-4'
  description: 'dark:text-gray-400 text-xl max-w-2xl leading-normal mb-10'
---

#top
:::div{class="absolute z-[-1] rounded-full bg-(--ui-primary) blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80"}
:::
:::div{class="absolute -z-10 inset-0 h-full w-full bg-[radial-gradient(circle,var(--ui-color-primary-900)_1px,transparent_1px)] bg-[size:20px_20px]"}
:::

#title
[I18n]{class="lg:hidden! inline"}[Internationalization]{class="hidden lg:inline!"} 用于 [Nuxt 应用]{.text-primary}

#description
适用于你的 Nuxt 项目的 I18n（国际化）模块，由 Vue I18n 提供支持。

```bash [Terminal]
npx nuxi@latest module add i18n
```
::

::u-page-section
---
title: 在几秒钟内构建支持 i18n 的应用！
---

  ::u-page-grid
    ::u-page-card
    ---
    icon: i-simple-icons-i18next
    to: /docs/getting-started
    ---
    #title
    Vue I18n 集成

    #description
    由 Nuxt 3 提供支持，具备最佳性能和 SEO。
    ::

    ::u-page-card
    ---
    icon: i-heroicons-sparkles-20-solid
    to: /docs/guide
    ---
    #title
    自动生成路由

    #description
    自动覆盖 Nuxt 默认路由，为每个 URL 添加你的语言前缀。
    ::

    ::u-page-card
    ---
    icon: i-heroicons-presentation-chart-line
    to: /docs/guide/seo
    ---
    #title
    搜索引擎优化

    #description
    用于根据当前语言环境添加 SEO 元数据的组合式函数。
    ::

    ::u-page-card
    ---
    icon: i-heroicons-rocket-launch
    to: /docs/guide/lazy-load-translations
    ---
    #title
    消息按需加载

    #description
    只按需加载用户选择的语言，而不是将所有消息打包进去。
    ::

    ::u-page-card
    ---
    icon: i-heroicons-arrows-right-left
    to: /docs/components/nuxt-link-locale
    ---
    #title
    语言环境感知重定向

    #description
    可直接使用的组合式函数，用于根据当前语言环境进行重定向。
    ::

    ::u-page-card
    ---
    icon: i-heroicons-globe-alt
    to: /docs/guide/different-domains
    ---
    #title
    语言环境专属域名

    #description
    为你的应用支持的每个语言环境设置不同的域名。
    ::
  ::
::

::u-page-section
---
title: 赞助商
style: "max-width: 1000px; margin-left: auto; margin-right: auto;"
---



![赞助商](https://raw.githubusercontent.com/bobbiegoede/static/main/sponsors.svg)
::

