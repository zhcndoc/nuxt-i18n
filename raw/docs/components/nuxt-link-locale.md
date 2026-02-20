# <NuxtLinkLocale>

> 用于结合 <NuxtLink> 使用 localePath 的简写组件

此组件基于 [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link#nuxtlink) 构建，但通过内部使用 [`localePath()`](/docs/api/vue#localepath) 改变了默认行为，使链接到本地化路由更加方便。

### Props

此组件支持所有[ `<NuxtLink>` 文档中描述的 props](https://nuxt.com/docs/api/components/nuxt-link#props)，并额外支持下面描述的 props。

<table>
<thead>
  <tr>
    <th>
      属性
    </th>
    
    <th>
      说明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        locale
      </code>
    </td>
    
    <td>
      可选属性，用于强制使用传入的 Locale 进行本地化，默认为当前语言环境。与 <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
        <span class="s2Zo4">
          localePath
        </span>
        
        <span class="sTEyZ">
          ()
        </span>
      </code>
      
       的 <code>
        locale
      </code>
      
       参数相同。
    </td>
  </tr>
</tbody>
</table>

### 示例

#### 基本用法

```vue
<template>
  <NuxtLinkLocale to="/">{{ $t('home') }}</NuxtLinkLocale>
</template>

<!-- 等同于 -->

<script setup>
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath('/')">{{ $t('home') }}</NuxtLink>
</template>
```

#### 强制指定语言环境

```vue
<template>
  <NuxtLinkLocale to="/" locale="nl">{{ $t('home') }}</NuxtLinkLocale>
</template>

<!-- 等同于 -->

<script setup>
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath('/', 'nl')">{{ $t('home') }}</NuxtLink>
</template>
```
