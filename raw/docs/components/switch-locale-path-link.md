# <SwitchLocalePathLink>

> 一个增强型的受限 <NuxtLink> 组件，用于渲染由 switchLocalePath 解析的路径

该组件作为一个受限的 [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link#nuxtlink)，内部使用 `switchLocalePath()` 来链接到指定语言版本的同一页面。

我们特别推荐将此组件用于语言切换器，因为它能够在服务端渲染期间正确更新包含动态路由参数的路径。

### Props

该组件支持大部分但不是全部 [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link#props) 中记录的 props（不支持 `to` 或 `href`），另外还支持下述 props。

<table>
<thead>
  <tr>
    <th>
      Prop
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
      可选属性，强制使用传入的 Locale 进行本地化，默认为当前 locale。与 <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
        <span class="s2Zo4">
          switchLocalePath
        </span>
        
        <span class="sTEyZ">
          ()
        </span>
      </code>
      
       的 <code>
        locale
      </code>
      
       参数功能相同。
    </td>
  </tr>
</tbody>
</table>

### 示例

#### 基础用法

```vue
<template>
  <SwitchLocalePathLink locale="nl">荷兰语</SwitchLocalePathLink>
  <SwitchLocalePathLink locale="en">英语</SwitchLocalePathLink>
</template>

<!-- 等同于 -->

<script setup>
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <NuxtLink :to="switchLocalePath('nl')">荷兰语</NuxtLink>
  <NuxtLink :to="switchLocalePath('en')">英语</NuxtLink>
</template>
```
