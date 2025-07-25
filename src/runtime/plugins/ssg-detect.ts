import { defineNuxtPlugin, useNuxtApp } from '#imports'
import { useNuxtI18nContext } from '../context'
import { detectLocale } from '../utils'

export default defineNuxtPlugin({
  name: 'i18n:plugin:ssg-detect',
  dependsOn: !__I18N_PRELOAD__
    ? ['i18n:plugin', 'i18n:plugin:route-locale-detect']
    : ['i18n:plugin', 'i18n:plugin:route-locale-detect', 'i18n:plugin:preload'],
  enforce: 'post',
  setup(_nuxt) {
    if (!__IS_SSG__ || !__I18N_ROUTING__) return

    // @ts-expect-error untyped internal id parameter
    const nuxt = useNuxtApp(_nuxt._id)
    const ctx = useNuxtI18nContext(nuxt)
    // NOTE: avoid hydration mismatch for SSG mode
    nuxt.hook('app:mounted', async () => {
      const detected = detectLocale(nuxt, nuxt.$router.currentRoute.value)
      await nuxt.runWithContext(() => nuxt.$i18n.setLocale(detected))
      ctx.initial = false
    })
  }
})
