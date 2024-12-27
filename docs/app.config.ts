export default defineAppConfig({
  legacy: {
    ui: {
      primary: 'green',
      gray: 'slate'
    }
  },
  default: {
    ui: {
      primary: 'green',
      gray: 'zinc'
    }
  },
  ui: {
    primary: 'green',
    gray: 'zinc',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    },
    content: {
      prose: {
        code: {
          icon: {
            env: 'vscode-icons:file-type-dotenv'
          }
        }
      }
    }
  },
  seo: { siteName: 'Nuxt I18n 中文文档' },
  header: {
    search: true,
    colorMode: true,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/nuxt-modules/i18n',
        target: '_blank',
        'aria-label': 'Nuxt I18n 模块'
      }
    ]
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: 'i-simple-icons-nuxtdotjs',
        to: 'https://nuxt.zhcndoc.com',
        target: '_blank',
        'aria-label': 'Nuxt 中文文档'
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/nuxt-modules/i18n',
        target: '_blank',
        'aria-label': 'Nuxt i18n module'
      }
    ]
  },
  toc: {
    title: '目录',
    bottom: {
      edit: 'https://github.com/zhcndoc/nuxt-i18n/edit/main/docs/content'
    }
  }
})
