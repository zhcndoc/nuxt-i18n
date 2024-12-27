<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter>
    <template #left>
      <!-- {{ footer.credits }} -->
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        <a target="_blank" href="https://www.zhcndoc.com"> 简中文档 </a>
        -
        <a rel="nofollow" target="_blank" href="https://beian.miit.gov.cn"> 沪ICP备2024070610号-3 </a>
      </p>
    </template>

    <template #right>
      <UColorModeButton v-if="footer?.colorMode" />

      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
