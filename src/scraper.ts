import { decode } from 'html-entities'
import { ScrapeResponse } from './worker'
import { randomUserAgent } from './randomUserAgent'
import { FollowShortUrlResponse, followShortUrl } from './follow-short-url'
import { generateErrorJSONResponse } from './json-response'

const cleanText = (string: string) => decode(string.trim(), { level: 'html5' })

type GetValueOption = { selector: string; attribute?: string }
export type GetMetadataOptions = {
  name: string
  selectors: GetValueOption[]
  multiple: boolean
}

class Scraper {
  rewriter: HTMLRewriter
  url: string
  response: Response
  metadata: ScrapeResponse
  unshortenedInfo: FollowShortUrlResponse

  constructor() {
    this.rewriter = new HTMLRewriter()
    return this
  }

  async fetch(url: string): Promise<Response> {
    this.url = url
    this.unshortenedInfo
    try {
      this.unshortenedInfo = await followShortUrl([url])
    } catch (error) {
      return generateErrorJSONResponse(error, url)
    }
    this.response = await fetch(this.unshortenedInfo.unshortened_url || url, {
      headers: {
        referrer: 'http://www.google.com/',
        'User-Agent': randomUserAgent(),
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    })

    const server = this.response.headers.get('server')

    const isThisWorkerErrorNotErrorWithinScrapedSite =
      [530, 503, 502, 403, 400].includes(this.response.status) &&
      (server === 'cloudflare' || !server) /* Workers preview editor */

    if (isThisWorkerErrorNotErrorWithinScrapedSite) {
      throw new Error(`Status ${this.response.status} requesting ${url}`)
    }

    return this.response
  }

  async getMetadata(
    options: GetMetadataOptions[]
  ): Promise<Record<string, string | string[]>> {
    let matches: Record<string, string | string[]> = {}
    let selectedSelectors: Record<string, boolean> = {}

    for (const optionsItem of options) {
      const name = optionsItem.name
      const isMultiple = optionsItem.multiple

      if (!matches[name]) {
        if (isMultiple) {
          matches[name] = []
        } else {
          matches[name] = ''
        }
      }

      selectorLoop: for await (const item of optionsItem.selectors) {
        const selector = item.selector
        let nextText = ''

        if (selectedSelectors[name]) {
          break selectorLoop
        }

        this.rewriter.on(selector, {
          element(element: Element) {
            if (item.attribute) {
              // Get attribute content value

              const attrText = element.getAttribute(item.attribute)
              if (attrText) {
                nextText = attrText

                // If multiple, push to array, otherwise set as string
                if (isMultiple) {
                  Array.isArray(matches[name]) &&
                    (matches[name] as string[]).push(cleanText(nextText))
                } else {
                  if (matches[name] === '') {
                    matches[name] = cleanText(nextText)
                    selectedSelectors[name] = true
                  }
                }
              }
            } else {
              nextText = ''
            }
          },
          text(text) {
            // Get text content value
            if (!item.attribute) {
              nextText += text.text

              if (text.lastInTextNode) {
                // If multiple, push to array, otherwise set as string
                if (isMultiple) {
                  Array.isArray(matches[name]) &&
                    (matches[name] as string[]).push(cleanText(nextText))
                } else {
                  if (matches[name] === '') {
                    matches[name] = cleanText(nextText)
                    selectedSelectors[name] = true
                  }
                }
                nextText = ''
              }
            }
          },
        })
      }
    }
    const transformed = this.rewriter.transform(this.response)
    await transformed.arrayBuffer()

    return matches
  }
}

export default Scraper
