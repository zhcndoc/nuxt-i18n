import type { I18nNuxtContext } from '../context'
import type { Nuxt } from '@nuxt/schema'

export function prepareStrategy({ options, localeCodes }: I18nNuxtContext, nuxt: Nuxt) {
  if (options.strategy === 'prefix' && (nuxt.options.nitro.static || (nuxt.options as any)._generate /* TODO: remove in future */)) {
    const localizedEntryPages = localeCodes.map(x => '/' + x)
    nuxt.hook('nitro:config', config => {
      config.prerender ??= {}

      // ignore `/` which is added by nitro by default
      config.prerender.ignore ??= []
      config.prerender.ignore.push(/^\/$/)

      // add localized routes as entry pages for prerendering
      config.prerender.routes ??= []
      config.prerender.routes.push(...localizedEntryPages)
    })
  }
}
