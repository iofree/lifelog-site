import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { JSDOM } from 'jsdom'

const dist = resolve('dist')
const origin = 'https://lifelog.iofree.xyz'
const sitemap = new JSDOM(readFileSync(resolve(dist, 'sitemap.xml'), 'utf8'), { contentType: 'text/xml' }).window.document
const urls = [...sitemap.querySelectorAll('loc')].map(node => node.textContent)
const titles = new Set()
const descriptions = new Set()
const images = new Set()
const documents = new Map()
const screenshotSources = JSON.parse(readFileSync(resolve('assets/app-store/source.json'), 'utf8'))
let internalLinks = 0

function htmlPath(path) {
  return resolve(dist, '.' + path + (path.endsWith('/') ? 'index.html' : '.html'))
}

function pageDocument(path) {
  const file = htmlPath(path)
  if (!documents.has(file)) documents.set(file, new JSDOM(readFileSync(file, 'utf8')).window.document)
  return documents.get(file)
}

function asset(url, base) {
  if (!url || url.startsWith('data:')) return
  const target = new URL(url, base)
  if (target.origin !== origin) return
  const file = resolve(dist, '.' + decodeURIComponent(target.pathname))
  assert.ok(existsSync(file), 'Missing asset: ' + target.href)
  if (target.pathname.endsWith('.png')) {
    const bytes = readFileSync(file)
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG', 'Invalid PNG: ' + file)
    images.add(file)
  } else if (target.pathname.endsWith('.webp')) {
    const bytes = readFileSync(file)
    assert.equal(bytes.subarray(0, 4).toString(), 'RIFF', 'Invalid WebP: ' + file)
    assert.equal(bytes.subarray(8, 12).toString(), 'WEBP', 'Invalid WebP: ' + file)
    images.add(file)
  }
  return file
}

assert.ok(urls.length > 0, 'Sitemap is empty')
for (const url of urls) {
  const path = new URL(url).pathname
  const document = pageDocument(path)
  const one = selector => {
    const nodes = document.querySelectorAll(selector)
    assert.equal(nodes.length, 1, url + ': expected one ' + selector)
    return nodes[0]
  }

  assert.equal(one('meta[name="robots"]').getAttribute('content'), 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
  assert.equal(one('link[rel="canonical"]').getAttribute('href'), url)
  assert.equal(one('meta[property="og:url"]').getAttribute('content'), url)
  const title = one('title').textContent
  const description = one('meta[name="description"]').getAttribute('content')
  assert.ok(title && description, url + ': empty title or description')
  assert.equal(one('meta[property="og:title"]').getAttribute('content'), title)
  assert.equal(one('meta[name="twitter:title"]').getAttribute('content'), title)
  assert.equal(one('meta[property="og:description"]').getAttribute('content'), description)
  assert.equal(one('meta[name="twitter:description"]').getAttribute('content'), description)
  assert.ok(!titles.has(title), 'Duplicate page title: ' + title)
  assert.ok(!descriptions.has(description), 'Duplicate page description: ' + url)
  titles.add(title)
  descriptions.add(description)

  const english = path.startsWith('/en/')
  const shareImage = origin + '/assets/social/' + (english ? 'en-US' : 'zh-CN') + '.png'
  assert.equal(one('meta[property="og:image"]').getAttribute('content'), shareImage)
  assert.equal(one('meta[name="twitter:image"]').getAttribute('content'), shareImage)
  assert.equal(one('meta[name="twitter:card"]').getAttribute('content'), 'summary_large_image')
  const shareBytes = readFileSync(asset(shareImage, url))
  assert.equal(shareBytes.readUInt32BE(16), 1200)
  assert.equal(shareBytes.readUInt32BE(20), 630)
  assert.equal(one('meta[property="og:image:width"]').getAttribute('content'), '1200')
  assert.equal(one('meta[property="og:image:height"]').getAttribute('content'), '630')
  const chinesePath = english ? path.slice(3) : path
  assert.equal(document.documentElement.lang, english ? 'en-US' : 'zh-CN')
  for (const [language, alternate] of [['zh-CN', chinesePath], ['en-US', '/en' + chinesePath], ['x-default', chinesePath]]) {
    const href = one('link[hreflang="' + language + '"]').getAttribute('href')
    assert.equal(href, origin + alternate)
    assert.ok(urls.includes(href), 'Language link targets an absent page: ' + href)
  }

  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent))
  assert.ok(schemas.length, url + ': missing structured data')
  if (path === '/' || path === '/en/') {
    assert.deepEqual(schemas.map(schema => schema['@type']), ['WebSite', 'SoftwareApplication'])
    const expectedScreenshots = screenshotSources.locales[english ? 'en-US' : 'zh-CN'].screenshots
    const galleryImages = [...document.querySelectorAll('.screenshots-grid img')]
    assert.equal(galleryImages.length, expectedScreenshots.length)
    for (const [index, img] of galleryImages.entries()) {
      const expected = expectedScreenshots[index]
      assert.equal(img.getAttribute('alt'), expected.alt)
      assert.equal(Number(img.getAttribute('width')), expected.delivery.width)
      assert.equal(Number(img.getAttribute('height')), expected.delivery.height)
      const file = asset(img.getAttribute('src'), url)
      assert.equal(createHash('sha256').update(readFileSync(file)).digest('hex'), expected.delivery.sha256)
    }
    assert.equal(one('.hero-phone img').getAttribute('src'), galleryImages[0].getAttribute('src'))
    assert.ok([...document.querySelectorAll('.hero-actions a')].some(node => node.getAttribute('href')?.includes('apps.apple.com')))
    assert.ok(document.body.textContent.includes('日记串') || document.body.textContent.includes('Diary Threads'))
  } else {
    assert.equal(schemas[0]['@type'], 'WebPage')
    assert.equal(schemas[0].url, url)
  }

  for (const link of document.querySelectorAll('a[href]')) {
    const target = new URL(link.getAttribute('href'), url)
    if (target.origin !== origin) continue
    const targetDocument = pageDocument(target.pathname)
    if (target.hash) assert.ok(targetDocument.getElementById(decodeURIComponent(target.hash.slice(1))), url + ': missing anchor ' + target.href)
    internalLinks++
  }

  if (/\/docs\/(travel-journal|reading-journal)$/.test(path)) {
    const cta = one('[data-analytics-placement="guide_end"]')
    assert.ok(cta.querySelector('a[href*="apps.apple.com/"]'), url + ': missing App Store CTA')
    assert.ok(cta.querySelector('a[href="https://apk.iofree.xyz/lifelog.apk"]'), url + ': missing Android CTA')
  }

  for (const node of document.querySelectorAll('img[src], script[src], link[href]')) {
    if (node.matches('link[rel="canonical"], link[hreflang]')) continue
    asset(node.getAttribute('src') || node.getAttribute('href'), url)
  }
  for (const node of document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]')) {
    asset(node.getAttribute('content'), url)
  }
}

const notFound = new JSDOM(readFileSync(resolve(dist, '404.html'), 'utf8')).window.document
// Global head is stripped from client site data; locale defaults must manage 404 robots on SPA navigation.
const clientDataMatch = [...notFound.scripts].map(script => script.textContent).join('\n').match(/window\.__VP_SITE_DATA__=JSON\.parse\(("(?:[^"\\]|\\.)*")\)/)
assert.ok(clientDataMatch, 'Missing client site data')
const clientSite = JSON.parse(JSON.parse(clientDataMatch[1]))
for (const locale of ['root', 'en']) {
  const robots = clientSite.locales[locale].head.filter(([tag, attrs]) => tag === 'meta' && attrs.name === 'robots')
  assert.equal(robots.length, 1, locale + ': 404 robots must be present in client locale head')
  assert.equal(robots[0][1].content, 'noindex,follow')
}
assert.equal(notFound.querySelectorAll('meta[name="robots"]').length, 1)
assert.equal(notFound.querySelector('meta[name="robots"]').getAttribute('content'), 'noindex,follow')
assert.equal(notFound.querySelector('link[rel="canonical"]'), null)
assert.ok(!urls.some(url => url.includes('/404')), '404 page is in sitemap')
assert.equal(sitemap.querySelectorAll('lastmod').length, 0, 'Do not publish synthetic build timestamps')

const manifest = JSON.parse(readFileSync(resolve(dist, 'manifest.json'), 'utf8'))
for (const icon of manifest.icons) {
  asset(icon.src, origin)
  const bytes = readFileSync(resolve(dist, '.' + icon.src))
  assert.equal(icon.sizes, bytes.readUInt32BE(16) + 'x' + bytes.readUInt32BE(20))
}

console.log('SEO build checks passed: ' + urls.length + ' pages, ' + images.size + ' image assets, ' + internalLinks + ' internal links, App Store screenshots, canonical/hreflang, metadata, JSON-LD, 404 and manifest.')
