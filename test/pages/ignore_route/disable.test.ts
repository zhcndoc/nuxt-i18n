import fs from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { vi, describe, test, expect } from 'vitest'
import { localizeRoutes } from '../../../src/routing'
import { getRouteOptionsResolver, analyzeNuxtPages, NuxtPageAnalyzeContext } from '../../../src/pages'
import { getNuxtOptions, stripFilePropertyFromPages } from '../utils'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

describe.each([
  {
    case: 'simple',
    options: getNuxtOptions({ about: false }),
    pages: [
      {
        path: '/about',
        file: '/path/to/nuxt-app/pages/about.vue',
        children: [
          {
            name: 'about',
            path: '',
            file: '/path/to/nuxt-app/pages/about/index.vue',
            children: []
          }
        ]
      },
      {
        name: 'index',
        path: '/',
        file: '/path/to/nuxt-app/pages/index.vue',
        children: []
      }
    ]
  },
  {
    case: 'nested static route',
    options: getNuxtOptions({
      'nested/route/index': false
    }),
    pages: [
      {
        name: 'nested-route',
        path: '/nested/route',
        file: '/path/to/nuxt-app/pages/nested/route/index.vue',
        children: []
      }
    ]
  },
  {
    case: 'nested dynamic route',
    options: getNuxtOptions({
      '[nested]/[route]/index': false
    }),
    pages: [
      {
        name: 'nested-route',
        path: '/:nested/:route',
        file: '/path/to/nuxt-app/pages/[nested]/[route]/index.vue',
        children: []
      }
    ]
  },
  {
    case: 'nested complex route',
    options: getNuxtOptions({
      about: false,
      'services/index': false,
      'services/development/index': false,
      'services/development/app': false,
      'services/development/website': false,
      'services/coaching': false
    }),
    pages: [
      {
        path: '/about',
        file: '/path/to/nuxt-app/pages/about.vue',
        children: []
      },
      {
        name: 'services-coaching',
        path: '/services/coaching',
        file: '/path/to/nuxt-app/pages/services/coaching.vue',
        children: []
      },
      {
        name: 'services-development-app',
        path: '/services/development/app',
        file: '/path/to/nuxt-app/pages/services/development/app.vue',
        children: []
      },
      {
        name: 'services-development',
        path: '/services/development',
        file: '/path/to/nuxt-app/pages/services/development/index.vue',
        children: []
      },
      {
        name: 'services-development-website',
        path: '/services/development/website',
        file: '/path/to/nuxt-app/pages/services/development/website.vue',
        children: []
      },
      {
        name: 'services',
        path: '/services',
        file: '/path/to/nuxt-app/pages/services/index.vue',
        children: []
      }
    ]
  }
])('Module configuration', ({ case: _case, options, pages }) => {
  test(_case, () => {
    vi.spyOn(fs, 'readFileSync').mockReturnValue('')

    const ctx = new NuxtPageAnalyzeContext(options.pages)
    analyzeNuxtPages(ctx, 'pages', pages)
    const localizedPages = localizeRoutes(pages, {
      ...options,
      includeUnprefixedFallback: false,
      optionsResolver: getRouteOptionsResolver(ctx, options.defaultLocale!, options.customRoutes!)
    } as Parameters<typeof localizeRoutes>[1])
    expect(localizedPages).toMatchSnapshot()
  })
})

describe.each([
  {
    case: 'basic',
    options: getNuxtOptions({}, 'page'),
    pages: [
      {
        path: '/about',
        file: resolve(__dirname, '../../fixtures/ignore_route/disable/pages/about.vue'),
        children: []
      }
    ]
  }
])('Page components', ({ case: _case, options, pages }) => {
  test(_case, () => {
    const ctx = new NuxtPageAnalyzeContext(options.pages)
    analyzeNuxtPages(ctx, 'pages', pages)
    const localizedPages = localizeRoutes(pages, {
      ...options,
      includeUnprefixedFallback: false,
      optionsResolver: getRouteOptionsResolver(ctx, options.defaultLocale!, options.customRoutes!)
    } as Parameters<typeof localizeRoutes>[1])
    expect(stripFilePropertyFromPages(localizedPages)).toMatchSnapshot()
  })
})
