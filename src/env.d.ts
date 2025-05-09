declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
  }
}

declare let __DEBUG__: boolean
declare let __TEST__: boolean
declare let __NUXT_I18N_VERSION__: string
