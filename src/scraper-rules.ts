import { GetMetadataOptions } from './scraper'

/**
 * Scraper rules
 * For each rule, the first selector that matches will be used
 */
export const scraperRules: GetMetadataOptions[] = [
  {
    name: 'title',
    multiple: false,
    selectors: [
      { selector: 'meta[name="og:title"]', attribute: 'content' },
      { selector: 'meta[property="og:title"]', attribute: 'content' },
      { selector: 'meta[name=title]', attribute: 'content' },
      { selector: 'meta[name="twitter:title"]', attribute: 'content' },
      { selector: 'meta[property="twitter:title"]', attribute: 'content' },
      { selector: 'title' },
      { selector: 'h1[slot="title"]' },
      { selector: '.post-title' },
      { selector: '.entry-title' },
      { selector: 'h1[class*="title" i] a' },
      { selector: 'h1[class*="title" i]' },
    ],
  },
  {
    name: 'description',
    multiple: false,
    selectors: [
      { selector: 'status-body' },
      { selector: 'meta[name="og:description"]', attribute: 'content' },
      { selector: 'meta[property="og:description"]', attribute: 'content' },
      {
        selector: 'meta[name="twitter:description"]',
        attribute: 'content',
      },
      {
        selector: 'meta[property="twitter:description"]',
        attribute: 'content',
      },
      { selector: 'meta[itemprop="description"]', attribute: 'content' },
      { selector: 'meta[name="description"]', attribute: 'content' },
    ],
  },
  {
    name: 'author',
    multiple: false,
    selectors: [
      { selector: 'link[rel=author]', attribute: 'href' },
      { selector: 'meta[name="author"]', attribute: 'content' },
      { selector: 'meta[name="article:author"]', attribute: 'content' },
      { selector: 'meta[property="article:author"]', attribute: 'content' },
      { selector: '[itemprop*="author" i] [itemprop="name"]' },
    ],
  },
  {
    name: 'image',
    multiple: false,
    selectors: [
      {
        selector: 'link[rel="image_src"]',
        attribute: 'href',
      },
      { selector: 'meta[name="og:image"]', attribute: 'content' },
      { selector: 'meta[property="og:image"]', attribute: 'content' },
      { selector: 'meta[name="og:image:url"]', attribute: 'content' },
      { selector: 'meta[property="og:image:url"]', attribute: 'content' },
      {
        selector: 'meta[name="og:image:secure_url"]',
        attribute: 'content',
      },
      {
        selector: 'meta[property="og:image:secure_url"]',
        attribute: 'content',
      },
      { selector: 'meta[name="twitter:image:src"]', attribute: 'content' },
      {
        selector: 'meta[property="twitter:image:src"]',
        attribute: 'content',
      },
      { selector: 'meta[name="twitter:image"]', attribute: 'content' },
      { selector: 'meta[property="twitter:image"]', attribute: 'content' },
      { selector: 'meta[itemprop="image"]', attribute: 'content' },
    ],
  },
  {
    name: 'feeds',
    multiple: true,
    selectors: [
      {
        selector: 'link[type="application/rss+xml"]',
        attribute: 'href',
      },
      { selector: 'link[type="application/feed+json"]', attribute: 'href' },
      { selector: 'link[type="application/atom+xml"]', attribute: 'href' },
    ],
  },
  {
    name: 'date',
    multiple: false,
    selectors: [
      { selector: 'meta[name="date" i]', attribute: 'content' },
      { selector: '[itemprop*="date" i]', attribute: 'content' },
      { selector: 'time[itemprop*="date" i]', attribute: 'datetime' },
      { selector: 'time[datetime]', attribute: 'datetime' },
      { selector: 'time' },
    ],
  },
  {
    name: 'lang',
    multiple: false,
    selectors: [
      { selector: 'meta[name="og:locale"]', attribute: 'content' },
      { selector: 'meta[property="og:locale"]', attribute: 'content' },
      { selector: 'meta[itemprop="inLanguage"]', attribute: 'content' },
      { selector: 'html', attribute: 'lang' },
    ],
  },
  {
    name: 'logo',
    multiple: false,
    selectors: [
      { selector: 'meta[name="og:logo"]', attribute: 'content' },
      { selector: 'meta[property="og:logo"]', attribute: 'content' },
      { selector: 'meta[itemprop="logo"]', attribute: 'content' },
      { selector: 'img[itemprop="logo"]', attribute: 'src' },
      {
        selector: 'link[rel="apple-touch-icon-precomposed"]',
        attribute: 'href',
      },
    ],
  },
  {
    name: 'video',
    multiple: false,
    selectors: [
      {
        selector: 'meta[name="og:video:secure_url"]',
        attribute: 'content',
      },
      {
        selector: 'meta[property="og:video:secure_url"]',
        attribute: 'content',
      },
      { selector: 'meta[name="og:video:url"]', attribute: 'content' },
      { selector: 'meta[property="og:video:url"]', attribute: 'content' },
      { selector: 'meta[name="og:video"]', attribute: 'content' },
      { selector: 'meta[property="og:video"]', attribute: 'content' },
    ],
  },
  {
    name: 'keywords',
    multiple: false,
    selectors: [
      {
        selector: 'meta[name="keywords"]',
        attribute: 'content',
      },
    ],
  },
  {
    name: 'jsonld',
    multiple: false,
    selectors: [
      {
        selector: '#content #microformat script[type="application/ld+json"]',
      },
      {
        selector:
          'ytd-player-microformat-renderer script[type="application/ld+json"]',
      },
      {
        selector: 'script[type="application/ld+json"]',
      },
    ],
  },
]
