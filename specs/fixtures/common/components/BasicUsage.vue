<script setup lang="ts">
import { computed, navigateTo } from '#imports'
import { useLocalePath, useSwitchLocalePath, useLocaleRoute, useI18n } from '#i18n'

const { locale, locales } = useI18n()
const normalizedLocales = computed(() =>
  locales.value.map(x => (typeof x === 'string' ? { code: x, name: x } : { code: x.code, name: x.name ?? x.code }))
)
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const localeRoute = useLocaleRoute()

const category = ref({
  title: 'Kirby',
  slug: 'nintendo'
})

function onClick() {
  const route = localeRoute({ name: 'user-profile', query: { foo: '1' } })
  if (route) {
    return navigateTo(route.fullPath)
  }
}
</script>

<template>
  <div id="basic-usage-section">
    <h2>Docs Basic usages</h2>
    <section id="vue-i18n-usage">
      <h3>vue-i18n</h3>
      <div class="vue-i18n">
        <form>
          <select v-model="locale">
            <option value="en">en</option>
            <option value="fr">fr</option>
          </select>
          <p>{{ $t('welcome') }}</p>
        </form>
      </div>
    </section>
    <section id="locale-path-usages">
      <h3>localePath</h3>
      <ul>
        <li class="name">
          <NuxtLink :to="localePath('index')">{{ $t('home') }}</NuxtLink>
        </li>
        <li class="path">
          <NuxtLink :to="localePath('/')">{{ $t('home') }}</NuxtLink>
        </li>
        <li class="named-with-locale">
          <NuxtLink :to="localePath('index', 'en')">Homepage in English</NuxtLink>
        </li>
        <li class="nest-path">
          <NuxtLink :to="localePath('/user/profile')">Route by path to: {{ $t('profile') }}</NuxtLink>
        </li>
        <li class="nest-named">
          <NuxtLink :to="localePath('user-profile')">Route by name to: {{ $t('profile') }}</NuxtLink>
        </li>
        <li class="object-with-named">
          <NuxtLink :to="localePath({ name: 'category-slug', params: { slug: category.slug } })">
            {{ category.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>
    <section id="switch-locale-path-usages">
      <h3>switchLocalePath</h3>
      <ul>
        <li v-for="l of normalizedLocales" :key="l.code" :class="`switch-to-${l.code}`">
          <NuxtLink :to="switchLocalePath(l.code)">{{ l.name }}</NuxtLink>
        </li>
      </ul>
    </section>
    <section id="locale-route-usages">
      <h3>localeRoute</h3>
      <button @click="onClick">Show profile</button>
    </section>
    <section id="configured-locales-list">
      <ul>
        <li v-for="locale in locales" :key="locale.code">
          {{ locale.code }}
        </li>
      </ul>
    </section>
  </div>
</template>
