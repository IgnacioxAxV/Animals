const PEXELS_API_URL = 'https://api.pexels.com/v1/search'
export const FALLBACK_IMAGE_URL = 'https://via.placeholder.com/400x300'

const animalImageCache = new Map<string, string>()

/**
 * Normalizes an animal name:
 * - lowercase
 * - remove accents
 * - trim spaces
 */
export function normalizeAnimalName(animalName: string): string {
  return animalName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function getPexelsApiKey(): string {
  if (typeof process !== 'undefined') {
    if (process.env?.PEXELS_API_KEY) return process.env.PEXELS_API_KEY
    if (process.env?.EXPO_PUBLIC_PEXELS_API_KEY) return process.env.EXPO_PUBLIC_PEXELS_API_KEY
  }

  if (typeof import.meta !== 'undefined') {
    if (import.meta.env?.VITE_PEXELS_API_KEY) return import.meta.env.VITE_PEXELS_API_KEY
    if (import.meta.env?.PEXELS_API_KEY) return import.meta.env.PEXELS_API_KEY
    if (import.meta.env?.EXPO_PUBLIC_PEXELS_API_KEY) return import.meta.env.EXPO_PUBLIC_PEXELS_API_KEY
  }

  return ''
}

/**
 * Fetches one image URL for an animal name using Pexels API.
 * Uses in-memory cache to avoid repeated requests.
 */
export async function getAnimalImage(animalName: string): Promise<string> {
  const normalizedName = normalizeAnimalName(animalName)
  const searchQuery = normalizedName

  if (!searchQuery) {
    return FALLBACK_IMAGE_URL
  }

  const cached = animalImageCache.get(searchQuery)
  if (cached) {
    return cached
  }

  const apiKey = getPexelsApiKey()
  if (!apiKey) {
    animalImageCache.set(searchQuery, FALLBACK_IMAGE_URL)
    return FALLBACK_IMAGE_URL
  }

  try {
    const params = new URLSearchParams({ query: searchQuery, per_page: '1' })
    const response = await fetch(`${PEXELS_API_URL}?${params.toString()}`, {
      headers: {
        Authorization: apiKey,
      },
    })

    if (!response.ok) {
      throw new Error(`Pexels API request failed with status ${response.status}`)
    }

    const data = (await response.json()) as {
      photos?: Array<{
        src?: {
          medium?: string
          large?: string
          original?: string
        }
      }>
    }

    const imageUrl =
      data.photos?.[0]?.src?.medium ??
      data.photos?.[0]?.src?.large ??
      data.photos?.[0]?.src?.original ??
      FALLBACK_IMAGE_URL

    animalImageCache.set(searchQuery, imageUrl)
    return imageUrl
  } catch (error) {
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
      console.error('Failed to fetch animal image from Pexels:', error)
    }
    animalImageCache.set(searchQuery, FALLBACK_IMAGE_URL)
    return FALLBACK_IMAGE_URL
  }
}
