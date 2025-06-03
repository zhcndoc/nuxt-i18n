import { mapContentNavigation } from '@nuxt/ui-pro/runtime/utils/content.js'
import type { ContentNavigationItem } from '@nuxt/content'

export default defineNuxtPlugin(async () => {
<<<<<<< HEAD
  const router = useRouter()

  if (import.meta.server) {
    const req = useRequestURL()
    if (req.hostname.startsWith('v8') && req.pathname === '/') {
      navigateTo('/docs/v8/getting-started')
    }

    if (req.hostname.startsWith('v7') && req.pathname === '/') {
      navigateTo('/docs/v7/setup')
    }
  }

=======
>>>>>>> origin/upstream
  const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
  const nav = computed<ContentNavigationItem[]>(
    () => mapContentNavigation(navigation.value).at(0).children as ContentNavigationItem[]
  )

  const currentDocsVersionNavigation = computed(() => {
    return nav.value
  })

  return {
    provide: {
      currentDocsVersionNavigation
    }
  }
})
