<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, useLocalePath } from '#i18n'

const { localeProperties } = useI18n()
const localePath = useLocalePath()
const code = computed(() => {
  return localeProperties.value.code
})
</script>

<template>
  <div>
    <h1 id="about-header">{{ $t('about') }}</h1>
    <LangSwitcher />
    <!-- div id="store-path-fr">{{ $store.state.routePathFr }}</div -->
    <section>
      <strong
        >code: <code id="locale-properties-code">{{ code }}</code></strong
      >
    </section>
    <NuxtLink id="link-home" exact :to="localePath('index')">{{ $t('home') }}</NuxtLink>
  </div>
</template>
