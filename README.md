# Page Metadata Scraper with Cloudflare workers

It uses a Cloudflare's `HTMLRewriter` to scrape the page for metadata and returns it as JSON.

### Features

- super fast metadata scraping using rules based on [Metascraper's rules](https://metascraper.js.org/#/?id=how-it-works) to pick out the metadata for a given property. These rules can easily be modified to suit your needs, they are defined in [`src/scraper-rules.ts`](https://github.com/mrmartineau/cloudflare-worker-scraper/blob/main/src/scraper-rules.ts)
- resolves short urls (e.g. https://t.co/wy9S5P0Cd2) and unshortens them
- option to clean url tracking params (e.g. `utm_*` and `fbclid` using the `cleanUrl` query param, see below)
- tries to infer the link type and returns that in the `urlType` property, will be one of: `'link' | 'video' | 'audio' | 'recipe' | 'image' | 'document' | 'article' | 'game' | 'book' | 'event' | 'product' | 'note' | 'file'`
- the worker randomises user-agent strings to avoid being blocked

### URL parameters:

- `url` - the URL to scrape
- `cleanUrl` - if `true`, the URL will be cleaned up to remove any tracking params

Once deployed to **Cloudflare**, add a `url` query param for the URL you want to scrape, e.g.

```sh
# Basic example
https://your-worker-name.cloudflare.com/?url=https://zander.wtf

# Example with `cleanUrl=true`
https://your-worker-name.cloudflare.com/?cleanUrl=true&url=https://poetsroad.bandcamp.com/?from=search&search_item_id=1141951669&search_item_type=b&search_match_part=%3F&search_page_id=1748155363&search_page_no=1&search_rank=1&search_sig=a9a9cbdfc454df7c2999f097dc8a216b
```

Response:

From [my website](https://zander.wtf) (https://zander.wtf):

```json
{
  "title": "Hi! I'm Zander, I make websites",
  "description": "Zander Martineau's personal site. I'm a contractor with 15+ years of experience helping companies get products to market, rewriting apps, creating POCs and more. I specialize in front-end but also work full-stack.",
  "author": "Zander Martineau",
  "image": "https://zander.wtf/opengraph.jpg",
  "feeds": [
    "https://zander.wtf/blog.rss.xml",
    "https://zander.wtf/links.rss.xml"
  ],
  "date": "2023-09-07T00:00:00.000Z",
  "lang": "en",
  "logo": "",
  "video": "",
  "keywords": "",
  "jsonld": "",
  "cleaned_url": "https://zander.wtf",
  "url": "https://zander.wtf",
  "urlType": "link"
}
```

From [a YouTube video](https://www.youtube.com/watch?v=ctEksNz7tqg):

```json
{
  "title": "World's Best FPV Drone Shot? (extreme mountain biking) - YouTube",
  "description": "Dive into the hardest mountain bike race through the eyes of an intense FPV drone shot. The @dutchdronegods followed Kade Edwards down the Red Bull Hardline ...",
  "author": "",
  "image": "https://i.ytimg.com/vi/ctEksNz7tqg/maxresdefault.jpg",
  "feeds": [],
  "date": "2023-09-19T07:00:07-07:00",
  "lang": "en",
  "logo": "",
  "video": "https://www.youtube.com/embed/ctEksNz7tqg",
  "keywords": "red bull, redbull, action sports, extreme sports, sport videos, action, sport, red bull bike, bike, downhill, pov, mtb, pov mtb, urban downhill, urban, downhill mtb, urban downhill racing, racing, DRONE, drone, fpv drone, dutch drone gods, drone shot, hardline, red bull hardline, hardest mountain bike race, hardest race, hard line, hardest drone shot, downhill mountain bike, downhill race, hardest mountain bike, hardest mtb, kade edwards, kade, edwards, wales, welsh, one shot",
  "jsonld": {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@id": "http://www.youtube.com/@redbull",
          "name": "Red Bull"
        }
      }
    ]
  },
  "url": "https://www.youtube.com/watch?v=ctEksNz7tqg",
  "urlType": "video"
}
```

## Testing

1. Run `npm start`
2. The test file in `src/test/index.html` can be used to test the worker locally. Run `npm run serve:test` to start a local server and then run a GET request against `http://127.0.0.1:8787/?url=http://localhost:1234` to view the output.

### Unit tests

Run `npm run test` to run the small suite of unit tests.

## Improvements and suggestions

Scraping metadata from a page is a tricky business, so if you have any suggestions or improvements, please [open an issue](https://github.com/mrmartineau/cloudflare-worker-scraper/issues/new) or [submit a PR](https://github.com/mrmartineau/cloudflare-worker-scraper/pulls?q=is:pr+is:open+sort:updated-desc), they are always welcome!

---

## License

[MIT](https://choosealicense.com/licenses/mit/) © [Zander Martineau](https://zander.wtf)

> Made by Zander • [zander.wtf](https://zander.wtf) • [GitHub](https://github.com/mrmartineau/) • [Mastodon](https://main.elk.zone/toot.cafe/@zander)
