const MAX_REDIRECTS = 5

export interface FollowShortUrlResponse {
  urls: string[]
  unshortened_url: string
}
// This function follows a short URL and returns the final URL, use https://t.co/wy9S5P0Cd2 as an example.
export const followShortUrl = async (
  urls: string[],
  redirectCount = 0
): Promise<FollowShortUrlResponse> => {
  const fetchResponse = await fetch(urls[urls.length - 1], {
    headers: {
      referrer: 'http://www.google.com/',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
    method: 'HEAD',
    redirect: 'manual',
  })

  if (redirectCount >= MAX_REDIRECTS) {
    throw new Error(`Maximum redirects exceeded.`)
  }
  if (fetchResponse.headers.get('location')) {
    urls.push(fetchResponse.headers.get('location') as string)
    await followShortUrl(urls, redirectCount + 1)
  }

  return {
    urls,
    unshortened_url: urls[urls.length - 1],
  }
}
