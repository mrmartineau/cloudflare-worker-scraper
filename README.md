# Page Metadata Scraper with Cloudflare workers

It uses a Cloudflare's `HTMLRewriter` to scrape the page for metadata and returns it as JSON.

It also uses a simplified version of [Metascraper's rules](https://metascraper.js.org/#/?id=how-it-works) to pick out the metadata for a given property.

Once deployed to Cloudflare, add a `url` query param for the URL you want to scrape, e.g.

```
https://worker.cloudflare.com/?url=https://zander.wtf
```

Response:

From my website:

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
  "url": "https://zander.wtf",
  "urlType": "link"
}
```

From A YouTube video:

```json
{
  "title": "World's Best FPV Drone Shot? (extreme mountain biking) - YouTube",
  "description": "Dive into the hardest mountain bike race through the eyes of an intense FPV drone shot. The @dutchdronegods followed Kade Edwards down the Red Bull Hardline ...",
  "author": "",
  "image": "https://i.ytimg.com/vi/ctEksNz7tqg/maxresdefault.jpg",
  "feeds": [],
  "date": "2023-09-19",
  "lang": "en-GB",
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

---

## License

[MIT](https://choosealicense.com/licenses/mit/) © [Zander Martineau](https://zander.wtf)

> Made by Zander • [zander.wtf](https://zander.wtf) • [GitHub](https://github.com/mrmartineau/) • [Mastodon](https://main.elk.zone/toot.cafe/@zander)
