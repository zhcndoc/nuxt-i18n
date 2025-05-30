<script setup lang="ts">
import type { ContentNavigationItem, DocsCollectionItem } from '@nuxt/content'

definePageMeta({ layout: 'docs' })
const route = useRoute()
const { $currentDocsVersionNavigation } = useNuxtApp()

const routePath = computed(() => route.path.replace(/\/$/, '')) // Remove trailing slash
// Main page data
const { data } = await useAsyncData(
  routePath,
  () =>
    Promise.all([
      queryCollection('docs').path(routePath.value).first(),
      queryCollectionItemSurroundings('docs', routePath.value, { fields: ['title', 'description'] })
    ]),
  { transform: ([page, surround]) => ({ page, surround }) }
)

// from https://github.com/nuxt/ui-pro/blob/07b9768fedf0a728c1235473873d3cfeed1160b2/src/runtime/utils/content.ts#L36
// adapted to ensure navigation title for index pages
function findPageHeadline(navigation?: ContentNavigationItem[], page?: DocsCollectionItem | null): string | undefined {
  if (!navigation?.length || !page) {
    return
  }

  for (const link of navigation) {
    if (link.children) {
      for (const childLink of link.children) {
        if (childLink.path === page.path) {
          return childLink.children ? childLink.title : link.title
        }
      }
      const headline = findPageHeadline(link.children, page)
      if (headline) {
        return headline
      }
    }
  }
}

if (!data.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const page = computed(() => data.value?.page)
const surround = computed(() => data.value?.surround)
const headline = computed(() => findPageHeadline($currentDocsVersionNavigation.value, page.value))

// Page Metadata (SEO & OG)
const { setPageMeta } = usePageMeta()
setPageMeta({
  title: page.value.title,
  description: page.value.description,
  headline: headline.value
})
// const breadcrumb = computed(() =>
//   mapContentNavigation(findPageBreadcrumb($currentDocsVersionNavigation?.value, page.value)).map(
//     ({ icon, ...link }) => link
//   )
// )

// Right Side Links
const { toc } = useAppConfig()
const links = computed(() =>
  [
    toc?.bottom?.edit && {
      icon: 'i-heroicons-pencil-square',
      label: '编辑此页面',
      to: `${toc.bottom.edit}/${page?.value?.stem}.${page.value.extension}`,
      target: '_blank'
    },
    {
      icon: 'i-lucide-star',
      label: 'GitHub 星标',
      to: `https://github.com/nuxt-modules/i18n`,
      target: '_blank'
    }
    // TODO:
    // {
    //   icon: 'i-lucide-life-buoy',
    //   label: 'Contribution',
    //   to: '/getting-started/contribution'
    // }
  ].filter(Boolean)
)
</script>

<template>
  <UPage v-if="page">
    <UPageHeader :title="page.title" :description="page.description" :headline="headline">
      <!-- <template #headline>
        <UBreadcrumb :items="breadcrumb" />
      </template> -->
    </UPageHeader>

    <UPageBody>
      <ContentRenderer v-if="page" :value="page" />

      <USeparator v-if="surround.filter(Boolean)?.length" />

      <UContentSurround v-if="surround.filter(Boolean)?.length" :surround="surround" />
    </UPageBody>

    <template v-if="page.body.toc.links.length" #right>
      <UContentToc :title="toc?.title" :links="page.body?.toc?.links">
        <template v-if="toc?.bottom" #bottom>
          <Ads />
          <USeparator v-if="page.body?.toc?.links?.length" type="dashed" />
          <UPageLinks title="社区" :links="links" />
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
