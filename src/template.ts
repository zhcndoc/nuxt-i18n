import { generateLoaderOptions } from './gen'
import {
  DEFAULT_DYNAMIC_PARAMS_KEY,
  DEFAULT_COOKIE_KEY,
  NUXT_I18N_MODULE_ID,
  SWITCH_LOCALE_PATH_LINK_IDENTIFIER
} from './constants'
import type { LocaleObject } from './types'

export type TemplateNuxtI18nOptions = {
  localeCodes: string[]
  normalizedLocales: LocaleObject[]
  dev: boolean
  isSSG: boolean
  hasPages: boolean
  parallelPlugin: boolean
} & ReturnType<typeof generateLoaderOptions>

// used to compare vue-i18n config replacement
const deepEqualFn = `function deepEqual(a, b, ignoreKeys = []) {
  // Same reference?
  if (a === b) return true

  // Check if either is null or not an object
  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // Get top-level keys, excluding ignoreKeys
  const keysA = Object.keys(a).filter(k => !ignoreKeys.includes(k))
  const keysB = Object.keys(b).filter(k => !ignoreKeys.includes(k))

  // Must have the same number of keys (after ignoring)
  if (keysA.length !== keysB.length) {
    return false
  }

  // Check each property
  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false
    }

    const valA = a[key]
    const valB = b[key]

    // Compare functions stringified
    if (typeof valA === 'function' && typeof valB === 'function') {
      if (valA.toString() !== valB.toString()) {
        return false
      }
    }
    // If nested, do a normal recursive check (no ignoring at deeper levels)
    else if (typeof valA === 'object' && typeof valB === 'object') {
      if (!deepEqual(valA, valB)) {
        return false
      }
    }
    // Compare primitive values
    else if (valA !== valB) {
      return false
    }
  }

  return true
}
`

const loadConfigsFn = `
async function loadCfg(config) {
  const nuxt = useNuxtApp()
  const { default: resolver } = await config()
  return typeof resolver === 'function' ? await nuxt.runWithContext(() => resolver()) : resolver
}\n`
function genLocaleLoaderHMR(localeLoaders: TemplateNuxtI18nOptions['localeLoaders']) {
  const statements: string[] = []

  for (const [locale, loaders] of localeLoaders) {
    for (let i = 0; i < loaders.length; i++) {
      const loader = loaders[i]
      statements.push(
        [
          `  import.meta.hot.accept("${loader.specifier}", async mod => {`,
          //   replace locale loader
          `    localeLoaders["${locale}"][${i}].load = () => Promise.resolve(mod.default)`,
          //   trigger locale messages reload for locale
          `    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("${locale}")`,
          `  })`
        ].join('\n')
      )
    }
  }

  return statements.join('\n\n')
}

function genVueI18nConfigHMR(configs: TemplateNuxtI18nOptions['vueI18nConfigSpecifiers']) {
  const statements: string[] = []

  for (let i = 0; i < configs.length; i++) {
    statements.push(
      [
        `  import.meta.hot.accept("${configs[i]}", async mod => {`,
        //   load configs before replacing loader
        `    const [oldData, newData] = await Promise.all([loadCfg(vueI18nConfigs[${i}]), loadCfg(() => Promise.resolve(mod))]);`,
        //   replace config loader
        `    vueI18nConfigs[${i}] = () => Promise.resolve(mod)`,
        //   compare data - reload configs if _only_ replaceable properties have changed
        `    if(deepEqual(oldData, newData, ['messages', 'numberFormats', 'datetimeFormats'])) {`,
        `      return await useNuxtApp()._nuxtI18nDev.resetI18nProperties()`,
        `    }`,
        //   communicate to vite plugin to trigger a page load
        `    import.meta.hot.send('i18n:options-complex-invalidation', {})`,
        `  })`
      ].join('\n')
    )
  }

  return statements.join('\n\n')
}

export function generateTemplateNuxtI18nOptions(options: TemplateNuxtI18nOptions): string {
  const codeHMR = [
    `if(import.meta.hot) {`,
    deepEqualFn,
    loadConfigsFn,
    genLocaleLoaderHMR(options.localeLoaders),
    genVueI18nConfigHMR(options.vueI18nConfigSpecifiers),
    '}'
  ].join('\n\n')

  return `
// @ts-nocheck
${options.importStrings.length > 0 ? options.importStrings.join('\n') + '\n' : ''}

export const localeCodes =  ${JSON.stringify(options.localeCodes, null, 2)}

export const localeLoaders = {
${options.localeLoaders
  .map(([key, val]) => {
    return `  "${key}": [${val
      .map(entry => `{ key: ${entry.key}, load: ${entry.load}, cache: ${entry.cache} }`)
      .join(',\n')}]`
  })
  .join(',\n')}
}

export const vueI18nConfigs = [
  ${options.vueI18nConfigs.length > 0 ? options.vueI18nConfigs.join(',\n  ') : ''}
]

export const nuxtI18nOptions = ${JSON.stringify(options.nuxtI18nOptions, null, 2)}

export const normalizedLocales = ${JSON.stringify(options.normalizedLocales, null, 2)}

export const NUXT_I18N_MODULE_ID = "${NUXT_I18N_MODULE_ID}"
export const parallelPlugin = ${options.parallelPlugin}
export const isSSG = ${options.isSSG}
export const hasPages = ${options.hasPages}

export const DEFAULT_DYNAMIC_PARAMS_KEY = ${JSON.stringify(DEFAULT_DYNAMIC_PARAMS_KEY)}
export const DEFAULT_COOKIE_KEY = ${JSON.stringify(DEFAULT_COOKIE_KEY)}
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = ${JSON.stringify(SWITCH_LOCALE_PATH_LINK_IDENTIFIER)}

${(options.dev && options.hmr && !options.isServer && codeHMR) || ''}`
}
