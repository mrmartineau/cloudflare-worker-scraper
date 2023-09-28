import { decode } from 'html-entities'
import { ScrapeResponse } from './worker'

const cleanText = (string: string) => decode(string.trim(), { level: 'html5' })

type GetValueOption = { selector: string; attribute?: string }
type GetMetadataOptions = {
  name: string
  selectors: GetValueOption[]
  multiple: boolean
}

class Scraper {
  rewriter: HTMLRewriter
  url: string
  response: Response
  metadata: ScrapeResponse

  constructor() {
    this.rewriter = new HTMLRewriter()
    return this
  }

  async fetch(url: string) {
    this.url = url
    this.response = await fetch(url)

    const server = this.response.headers.get('server')

    const isThisWorkerErrorNotErrorWithinScrapedSite =
      [530, 503, 502, 403, 400].includes(this.response.status) &&
      (server === 'cloudflare' || !server) /* Workers preview editor */

    if (isThisWorkerErrorNotErrorWithinScrapedSite) {
      throw new Error(`Status ${this.response.status} requesting ${url}`)
    }

    return this
  }

  async getMetadata(
    options: GetMetadataOptions[]
  ): Promise<Record<string, string | string[]>> {
    const matches: Record<string, string | string[]> = {}

    for (let index = 0; index < options.length; index++) {
      const name = options[index].name
      const isMultiple = options[index].multiple
      if (isMultiple) {
        matches[name] = []
      } else {
        matches[name] = ''
      }
      options[index].selectors.forEach((item: GetValueOption) => {
        const selector = item.selector
        let nextText = ''

        if (item.attribute) {
          // Get attribute value
          this.rewriter.on(selector, {
            element(element) {
              if (item.attribute) {
                const attrText = element.getAttribute(item.attribute)
                if (attrText) {
                  nextText = attrText

                  // If multiple, push to array, otherwise set as string
                  if (isMultiple) {
                    matches[name].push(cleanText(nextText))
                  } else {
                    if (matches[name] === '') {
                      matches[name] = cleanText(nextText)
                    }
                  }
                }
              }
            },
          })
        } else {
          // Get text content value
          this.rewriter.on(selector, {
            element() {
              nextText = ''
            },
            text(text) {
              nextText += text.text

              if (text.lastInTextNode) {
                // If multiple, push to array, otherwise set as string
                if (isMultiple) {
                  Array.isArray(matches[name]) &&
                    matches[name].push(cleanText(nextText))
                } else {
                  if (matches[name] === '') {
                    matches[name] = cleanText(nextText)
                  }
                }
                nextText = ''
              }
            },
          })
        }
      })
    }
    const transformed = this.rewriter.transform(this.response)
    await transformed.arrayBuffer()

    return matches
  }
}

export default Scraper
