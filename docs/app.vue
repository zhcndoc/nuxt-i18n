<script setup lang="ts">
import { mapContentNavigation } from '@nuxt/ui-pro/runtime/utils/content.js'
import type { ContentNavigationItem } from '@nuxt/content'

const appConfig = useAppConfig()
const radius = computed(() => `:root { --ui-radius: ${appConfig.theme.radius}rem; }`)

useHead({
  htmlAttrs: { lang: 'zh-CN' },
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  style: [{ innerHTML: radius, id: 'nuxt-ui-radius', tagPriority: -2 }]
})

useSeoMeta({
  titleTemplate: `%s - ${appConfig.seo.siteName}`,
  ogSiteName: appConfig.seo.siteName,
  twitterCard: 'summary_large_image'
})

useHead({ script: [{ async: '', src: 'https://www.zhcndoc.com/js/common.js' }] })

// Navigation Data
const { data: navigation } = await useAsyncData('docs_navigation', () => queryCollectionNavigation('docs'))
const nav = computed<ContentNavigationItem[]>(
  () => mapContentNavigation(navigation.value).at(0).children as ContentNavigationItem[]
)
provide('navigation', nav)

// Search
const { data: files } = useAsyncData('/api/search.json', () => queryCollectionSearchSections('docs'), { server: false })

const currentVersionNavigation = useNuxtApp().$currentDocsVersionNavigation

// // Header
const route = useRoute()
const links = computed<unknown[]>(() => [
  {
    label: '文档',
    to: `/docs/getting-started`,
    icon: 'i-heroicons-book-open',
    active: route.path.startsWith('/docs')
  },
  {
    label: '路线图',
    to: '/roadmap',
    icon: 'i-heroicons-map'
  }
])
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <Header :links="links" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Footer />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="currentVersionNavigation"
        :multiple="true"
        :kbds="['meta', 'K']"
      />
    </ClientOnly>
  </UApp>
</template>

<style></style>
