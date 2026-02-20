# 迁移指南

> 按照本指南从 v9.x 升级到 v10.x

## 升级到 Vue I18n v11

我们已将 Vue I18n 从 v10 升级到 v11，此主要版本更新已弃用 Legacy API 模式和自定义的 `v-t` 指令，并且从 Legacy API 模式中移除了 `tc()` 和 `$tc()`。

请查看关于破坏性变更的详细文档 [这里](https://vue-i18n.intlify.dev/guide/migration/breaking11.html)。

## 配置选项

以下 [配置选项](/docs/api/options) 已被更改、弃用或移除。

<table>
<thead>
  <tr>
    <th>
      状态
    </th>
    
    <th>
      选项
    </th>
    
    <th>
      说明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <badge color="success" label="promoted">
        
      </badge>
    </td>
    
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          experimental.hmr
        </span>
      </code>
    </td>
    
    <td>
      默认启用，并更名为 <a href="/docs/api/options#hmr">
        <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
          <span class="sfazB">
            hmr
          </span>
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="success" label="promoted">
        
      </badge>
    </td>
    
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          experimental.switchLocalePathLinkSSR
        </span>
      </code>
    </td>
    
    <td>
      默认启用，且不再提供禁用此功能的选项。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="success" label="promoted">
        
      </badge>
    </td>
    
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          experimental.autoImportTranslationFunctions
        </span>
      </code>
    </td>
    
    <td>
      默认启用，并更名为 <a href="/docs/api/options#autodeclare">
        <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
          <span class="sfazB">
            autoDeclare
          </span>
        </code>
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="info" label="changed">
        
      </badge>
    </td>
    
    <td>
      <a href="/docs/api/options#restructuredir">
        <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
          <span class="sfazB">
            restructureDir
          </span>
        </code>
      </a>
    </td>
    
    <td>
      该选项不能再被禁用。<br />
      
      <br />
      
      建议保持未设置状态以使用默认值 <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
        <span class="sMK4o">
          '
        </span>
        
        <span class="sfazB">
          i18n
        </span>
        
        <span class="sMK4o">
          '
        </span>
      </code>
      
      。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="warning" label="deprecated">
        
      </badge>
    </td>
    
    <td>
      <a href="/docs/api/options#types">
        <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
          <span class="sfazB">
            types
          </span>
        </code>
      </a>
    </td>
    
    <td>
      v11 只支持 <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sMK4o">
          '
        </span>
        
        <span class="sfazB">
          composition
        </span>
        
        <span class="sMK4o">
          '
        </span>
      </code>
      
       类型，与 Vue I18n v12 保持一致。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="warning" label="deprecated">
        
      </badge>
    </td>
    
    <td>
      <a href="/docs/api/options#baseurl">
        <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
          <span class="sfazB">
            baseUrl
          </span>
        </code>
      </a>
    </td>
    
    <td>
      v11 仅允许字符串值，不再支持函数配置。<br />
      
      <br />
      
      复杂场景请使用运行时配置或依赖多域名本地化设置基地址。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="warning" label="deprecated">
        
      </badge>
    </td>
    
    <td>
      <a href="/docs/api/options#routesnameseparator">
        <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
          <span class="sfazB">
            routesNameSeparator
          </span>
        </code>
      </a>
    </td>
    
    <td>
      文档中标记为内部使用，终端用户的使用场景不明确。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="warning" label="deprecated">
        
      </badge>
    </td>
    
    <td>
      <a href="/docs/api/options#defaultlocaleroutenamesuffix">
        <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
          <span class="sfazB">
            defaultLocaleRouteNameSuffix
          </span>
        </code>
      </a>
    </td>
    
    <td>
      文档中标记为内部使用，终端用户的使用场景不明确。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="error" label="removed">
        
      </badge>
    </td>
    
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          lazy
        </span>
      </code>
    </td>
    
    <td>
      现在所有的语言包文件均启用懒加载。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="error" label="removed">
        
      </badge>
    </td>
    
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          bundle.optimizeTranslationDirective
        </span>
      </code>
    </td>
    
    <td>
      该功能已被禁用并彻底移除，详细上下文见 <a href="https://github.com/nuxt-modules/i18n/issues/3238#issuecomment-2672492536" rel="nofollow">
        此议题讨论
      </a>
      
      。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="error" label="removed">
        
      </badge>
    </td>
    
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          experimental.generatedLocaleFilePathFormat
        </span>
      </code>
    </td>
    
    <td>
      本模块对文件路径（例如语言包文件、vue-i18n 配置）相关配置已完全移除，使此选项过时。
    </td>
  </tr>
</tbody>
</table>

## 行为变化

### 浏览器语言检测

语言检测和重定向的改进遵循了文档中严格的行为。在 v9 中，某些 `strategy` 和 `redirectOn` 选项的组合表现出意外的行为，这在 v10 中已得到修正。

**关键变化**：当使用 `strategy: 'prefix'` 和 `redirectOn: 'root'` 时，非根路径（例如 `'/search'`）将不再自动重定向到其本地化版本（例如 `'/zh/search'`）。

**迁移**：如果您需要对所有路径使用前缀策略进行重定向，请更新您的配置：

```diff
export default defineNuxtConfig({
  i18n: {
    strategy: 'prefix',
    detectBrowserLanguage: {
-      // redirectOn: 'root', // ⚠️ In v10 this will only redirect the root path
+      redirectOn: 'all',  // Redirects all paths as documented
    }
  }
})
```

**影响**：这影响了使用 `strategy: 'prefix'` 的项目，这些项目依赖于之前意外的行为，即 `redirectOn: 'root'` 也处理非根路径。

有关可用选项的更多详细信息，请参见 [`redirectOn` 文档](/docs/api/options#redirecton)。

## I18n 函数

以下组合式函数和 [I18n 函数](/docs/api/vue-i18n) 已被更改、弃用或移除。

<table>
<thead>
  <tr>
    <th>
      状态
    </th>
    
    <th>
      函数
    </th>
    
    <th>
      说明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <badge color="info" label="changed">
        
      </badge>
    </td>
    
    <td>
      <a href="/docs/composables/use-locale-head">
        <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
          <span class="s2Zo4">
            useLocaleHead
          </span>
          
          <span class="sTEyZ">
            ()
          </span>
        </code>
      </a>
    </td>
    
    <td>
      options 参数中的 <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          key
        </span>
      </code>
      
       属性已被移除，无法再配置，这是为了实现可预测且一致的本地化头部标签管理。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="error" label="removed">
        
      </badge>
    </td>
    
    <td>
      <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
        <span class="s2Zo4">
          onLanguageSwitched
        </span>
        
        <span class="sTEyZ">
          ()
        </span>
      </code>
    </td>
    
    <td>
      请使用 <a href="/docs/guide/runtime-hooks">
        <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
          <span class="sMK4o">
            '
          </span>
          
          <span class="sfazB">
            i18n:localeSwitched
          </span>
          
          <span class="sMK4o">
            '
          </span>
        </code>
      </a>
      
       钩子替代。<br />
      
      <br />
      
      该函数实际上是触发钩子而非订阅，导致行为不可预测。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="error" label="removed">
        
      </badge>
    </td>
    
    <td>
      <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
        <span class="s2Zo4">
          onBeforeLanguageSwitch
        </span>
        
        <span class="sTEyZ">
          ()
        </span>
      </code>
    </td>
    
    <td>
      请使用 <a href="/docs/guide/runtime-hooks">
        <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
          <span class="sMK4o">
            '
          </span>
          
          <span class="sfazB">
            i18n:beforeLocaleSwitch
          </span>
          
          <span class="sMK4o">
            '
          </span>
        </code>
      </a>
      
       钩子替代。<br />
      
      <br />
      
      该函数实际上是触发钩子而非订阅，导致行为不可预测。
    </td>
  </tr>
</tbody>
</table>

## 上下文函数

以下 [上下文函数](/docs/api/nuxt) 已被更改、弃用或移除。

<table>
<thead>
  <tr>
    <th>
      状态
    </th>
    
    <th>
      函数
    </th>
    
    <th>
      说明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <badge color="info" label="changed">
        
      </badge>
    </td>
    
    <td>
      <a href="/docs/api/nuxt#localehead">
        <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
          <span class="s2Zo4">
            $localeHead
          </span>
          
          <span class="sTEyZ">
            ()
          </span>
        </code>
      </a>
    </td>
    
    <td>
      options 参数中的 <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          key
        </span>
      </code>
      
       属性已被移除，无法再配置，这是为了实现可预测且一致的本地化头部标签管理。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="warning" label="deprecated">
        
      </badge>
    </td>
    
    <td>
      <a href="/docs/api/nuxt#localehead">
        <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
          <span class="s2Zo4">
            $localeHead
          </span>
          
          <span class="sTEyZ">
            ()
          </span>
        </code>
      </a>
    </td>
    
    <td>
      请改用 <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
        <span class="s2Zo4">
          useLocaleHead
        </span>
        
        <span class="sTEyZ">
          ()
        </span>
      </code>
      
       组合式函数。<br />
      
      <br />
      
      因使用场景有限已被弃用，且 <a href="/docs/composables/use-locale-head">
        <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
          <span class="s2Zo4">
            useLocaleHead
          </span>
          
          <span class="sTEyZ">
            ()
          </span>
        </code>
      </a>
      
       提供相同功能，且与 <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
        <span class="s2Zo4">
          useHead
        </span>
        
        <span class="sTEyZ">
          ()
        </span>
      </code>
      
       配合更易使用。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="warning" label="deprecated">
        
      </badge>
    </td>
    
    <td>
      <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
        <span class="s2Zo4">
          $getRouteBaseName
        </span>
        
        <span class="sTEyZ">
          ()
        </span>
      </code>
    </td>
    
    <td>
      请使用 <a href="/docs/api/nuxt#routebasename">
        <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
          <span class="s2Zo4">
            $routeBaseName
          </span>
          
          <span class="sTEyZ">
            ()
          </span>
        </code>
      </a>
      
       替代。<br />
      
      <br />
      
      这是为了与其他上下文函数及其组合式函数名保持一致。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="error" label="removed">
        
      </badge>
    </td>
    
    <td>
      <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
        <span class="s2Zo4">
          $resolveRoute
        </span>
        
        <span class="sTEyZ">
          ()
        </span>
      </code>
    </td>
    
    <td>
      请使用 <a href="/docs/api/nuxt#localeroute">
        <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
          <span class="s2Zo4">
            $localeRoute
          </span>
          
          <span class="sTEyZ">
            ()
          </span>
        </code>
      </a>
      
       替代。
    </td>
  </tr>
  
  <tr>
    <td>
      <badge color="error" label="removed">
        
      </badge>
    </td>
    
    <td>
      <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
        <span class="s2Zo4">
          $localeLocation
        </span>
        
        <span class="sTEyZ">
          ()
        </span>
      </code>
    </td>
    
    <td>
      请使用 <a href="/docs/api/nuxt#localeroute">
        <code className="language-ts shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="ts" style="">
          <span class="s2Zo4">
            $localeRoute
          </span>
          
          <span class="sTEyZ">
            ()
          </span>
        </code>
      </a>
      
       替代。
    </td>
  </tr>
</tbody>
</table>

## 运行时配置

部分设置在运行时配置中的选项仅用于将构建时配置传递到运行时，且运行时更改这些选项可能导致问题。

我们现将其视为编译器常量，而非运行时配置，这样可以对未使用的逻辑进行树摇，减少项目体积。

以下选项已从运行时配置中移除：

<table>
<thead>
  <tr>
    <th>
      已移除的运行时配置选项
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          lazy
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          strategy
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          trailingSlash
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          differentDomains
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          defaultDirection
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          multiDomainLocales
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          routeNameSeparator
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          defaultLocaleRouteNameSuffix
        </span>
      </code>
    </td>
  </tr>
</tbody>
</table>

## 生成的选项

项目中生成的选项文件是本模块在运行时内部使用的，不应被使用，未来可能会移除更多属性。

未来对这些内部选项的更改将不会在迁移指南中记录。如果您有这些选项的使用案例，请提交一个问题，描述您的使用案例，以便我们评估是否可以以不同的方式支持它。

生成的选项文件已重命名：

<table>
<thead>
  <tr>
    <th>
      旧名称
    </th>
    
    <th>
      新名称
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sHwdD">
          #build/i18n-options.mjs
        </span>
      </code>
    </td>
    
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sHwdD">
          #build/i18n-options.mjs
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sHwdD">
          #internal/i18n/options.mjs
        </span>
      </code>
    </td>
    
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sHwdD">
          #internal/i18n-options.mjs
        </span>
      </code>
    </td>
  </tr>
</tbody>
</table>

以下导出已从生成的选项中移除：

<table>
<thead>
  <tr>
    <th>
      已移除的导出
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          isSSG
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          hasPages
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          parallelPlugin
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          nuxtI18nOptions
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          DEFAULT_COOKIE_KEY
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          DYNAMIC_PARAMS_KEY
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          NUXT_I18N_MODULE_ID
        </span>
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code className="language-yml shiki shiki-themes material-theme-lighter material-theme material-theme-palenight" language="yml" style="">
        <span class="sfazB">
          SWITCH_LOCALE_PATH_LINK_IDENTIFIER
        </span>
      </code>
    </td>
  </tr>
</tbody>
</table>

移除理由：

- 这些导出不再被模块使用，且可能在最终构建中暴露敏感信息
- 部分选项现作为静态值使用，以实现更好的树摇效果，减小项目体积。

## 传统迁移

v7 和 v8 的迁移指南可在[旧版文档](https://v9.i18n.nuxtjs.org/docs/guide/migrating)中找到。
