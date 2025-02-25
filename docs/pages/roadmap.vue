<script setup>
// Page Metadata (SEO & OG)
const { setPageMeta } = usePageMeta()
setPageMeta({ title: '路线图', description: '发现我们的 Volta 板以获取 @nuxt/i18n 开发状态。' })

// Volta board
const VOLTA_TOKEN =
  'eyJzdGF0dXNlcyI6WyJ0cmlhZ2UiLCJiYWNrbG9nIiwidG9kbyIsImluX3Byb2dyZXNzIiwiaW5fcmV2aWV3IiwiZG9uZSIsInJlbGVhc2VkIiwiY2FuY2VsbGVkIl0sImZpbHRlcnMiOnt9LCJvd25lciI6Im51eHQtbW9kdWxlcyIsIm5hbWUiOiJpMThuIn0='
const colorMode = useColorMode()
const appConfig = useAppConfig()

const voltaBoardSrc = computed(() => {
  const voltaBaseUrl = `https://volta.net/embed/${VOLTA_TOKEN}`
  return `${voltaBaseUrl}?theme=${colorMode.value}&primary=${appConfig.ui.colors.primary}&gray=${appConfig.ui.colors.neutral}`
})
</script>

<template>
  <div class="h-[calc(100vh-var(--ui-header-height))]">
    <ClientOnly>
      <iframe :src="voltaBoardSrc" width="100%" height="100%" />
    </ClientOnly>
  </div>
</template>
