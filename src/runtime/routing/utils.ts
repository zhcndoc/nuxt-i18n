import { isFunction } from '@intlify/shared'
import { localeCodes } from '#build/i18n.options.mjs'
import { useRuntimeConfig } from '#app'

import type { LocaleObject, BaseUrlResolveHandler, I18nPublicRuntimeConfig } from '#internal-i18n-types'
import type { Locale } from 'vue-i18n'
import type { CompatRoute } from '../types'

export function getNormalizedLocales(locales: Locale[] | LocaleObject[]): LocaleObject[] {
  return locales.map(x => (typeof x === 'string' ? { code: x } : x))
}

export function getRouteName(routeName?: string | symbol | number | null) {
  if (typeof routeName === 'string') return routeName
  if (routeName != null) return routeName.toString()
  return '(null)'
}

export function getLocaleRouteName(
  routeName: symbol | string | null | undefined,
  locale: Locale,
  {
    defaultLocale,
    strategy,
    routesNameSeparator,
    defaultLocaleRouteNameSuffix,
    differentDomains
  }: I18nPublicRuntimeConfig
) {
  const localizedRoutes = strategy !== 'no_prefix' || differentDomains
  let name = getRouteName(routeName) + (localizedRoutes ? routesNameSeparator + locale : '')
  if (locale === defaultLocale && strategy === 'prefix_and_default') {
    name += routesNameSeparator + defaultLocaleRouteNameSuffix
  }
  return name
}

/**
 * Resolve base url
 *
 * @param baseUrl - A base url to resolve on SEO and domain. if you want to resolve with dynamically, you can spacify {@link BaseUrlResolveHandler}
 * @param context - A context to resolve base url, if you want to resolve base url with {@link BaseUrlResolveHandler}
 *
 * @returns A resolved base url
 */
export function resolveBaseUrl<Context = unknown>(baseUrl: string | BaseUrlResolveHandler<Context>, context: Context) {
  if (isFunction(baseUrl)) {
    return baseUrl(context)
  }

  return baseUrl
}

/**
 * The browser locale info
 *
 * @remarks
 * This type is used by {@link FindBrowserLocaleOptions#sorter | sorter} in {@link findBrowserLocale} function
 */
interface BrowserLocale {
  /**
   * The locale code, such as BCP 47 (e.g `en-US`), or `ja`
   */
  code: string
  /**
   * The score number
   *
   * @remarks
   * The score number that is used by `sorter` of {@link FindBrowserLocaleOptions}
   */
  score: number
}

/**
 * The target locale info
 *
 * @remarks
 * This type is used by {@link BrowserLocaleMatcher} first argument
 */
type TargetLocale = { code: string; language: string }

/**
 * The browser locale matcher
 *
 * @remarks
 * This matcher is used by {@link findBrowserLocale} function
 *
 * @param locales - The target {@link LocaleObject | locale} list
 * @param browserLocales - The locale code list that is used in browser
 *
 * @returns The matched {@link BrowserLocale | locale info}
 */
type BrowserLocaleMatcher = (locales: TargetLocale[], browserLocales: string[]) => BrowserLocale[]
type LocaleComparer = (a: BrowserLocale, b: BrowserLocale) => number

function matchBrowserLocale(locales: TargetLocale[], browserLocales: string[]): BrowserLocale[] {
  const matchedLocales = [] as BrowserLocale[]

  // first pass: match exact locale.
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find(l => l.language.toLowerCase() === browserCode.toLowerCase())
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length })
      break
    }
  }

  // second pass: match only locale code part of the browser locale (not including country).
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split('-')[0].toLowerCase()
    const matchedLocale = locales.find(l => l.language.split('-')[0].toLowerCase() === languageCode)
    if (matchedLocale) {
      // deduct a thousandth for being non-exact match.
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length })
      break
    }
  }

  return matchedLocales
}

function compareBrowserLocale(a: BrowserLocale, b: BrowserLocale): number {
  if (a.score === b.score) {
    // if scores are equal then pick more specific (longer) code.
    return b.code.length - a.code.length
  }
  return b.score - a.score
}

/**
 * Find the browser locale
 *
 * @param locales - The target {@link LocaleObject} list
 * @param browserLocales - The locale code list that is used in browser
 * @param options - The options for {@link findBrowserLocale} function
 *
 * @returns The matched the locale code
 */
export function findBrowserLocale(
  locales: LocaleObject[],
  browserLocales: string[],
  {
    matcher = matchBrowserLocale,
    comparer = compareBrowserLocale
  }: { matcher?: BrowserLocaleMatcher; comparer?: LocaleComparer } = {}
): string {
  const normalizedLocales = []
  for (const l of locales) {
    const { code } = l
    const language = l.language || code
    normalizedLocales.push({ code, language })
  }

  // finding!
  const matchedLocales = matcher(normalizedLocales, browserLocales)

  if (matchedLocales.length === 0) {
    return ''
  }

  if (matchedLocales.length > 1) {
    // sort!
    matchedLocales.sort(comparer)
  }

  return matchedLocales[0].code
}

export function getLocalesRegex(localeCodes: string[]) {
  return new RegExp(`^/(${localeCodes.join('|')})(?:/|$)`, 'i')
}

const localesPattern = `(${localeCodes.join('|')})`
const regexpPath = getLocalesRegex(localeCodes)

export function createLocaleFromRouteGetter() {
  const { routesNameSeparator, defaultLocaleRouteNameSuffix } = useRuntimeConfig().public.i18n
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, 'i')

  /**
   * extract locale code from route name or path
   */
  const getLocaleFromRoute = (route: string | CompatRoute) => {
    let matches: RegExpMatchArray | null = null

    if (typeof route === 'string') {
      matches = route.match(regexpPath)
      return matches?.[1] ?? ''
    }

    if (route.name) {
      // extract from route name
      matches = getRouteName(route.name).match(regexpName)
    } else if (route.path) {
      // extract from path
      matches = route.path.match(regexpPath)
    }

    return matches?.[1] ?? ''
  }

  return getLocaleFromRoute
}
