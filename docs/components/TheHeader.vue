<script setup lang="ts">
// @ts-expect-error This is because we're using Nuxt Content v2.8.2 instead of the new version which includes these types. We're using the old version because the latest has issues with highlighting
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import type { HeaderLink } from '#ui-pro/types'

defineProps<{ links?: HeaderLink[] }>()

const { header } = useAppConfig()
const { metaSymbol } = useShortcuts()
const navigation = inject<NavItem[]>('navigation', [])
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <TheLogo class="w-auto h-8" />
    </template>

    <template #right>
      <UTooltip text="搜索" :shortcuts="[metaSymbol, 'K']">
        <UContentSearchButton :label="null" />
      </UTooltip>

      <UTooltip text="切换主题">
        <UColorModeButton v-if="header?.colorMode" />
      </UTooltip>

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
</template>
