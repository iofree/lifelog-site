import { readFile, readdir, realpath, stat } from 'node:fs/promises'
import { relative, resolve, sep } from 'node:path'
import { brotliCompressSync, constants, gzipSync } from 'node:zlib'
import { JSDOM } from 'jsdom'

const directories = process.argv.slice(2)
if (directories.includes('--help') || directories.includes('-h')) {
  console.log('Usage: node scripts/measure-assets.mjs [dist-directory ...]\nReads build files and prints a static asset estimate as JSON. No network requests or file changes.')
  process.exit(0)
}

const fontPattern = /\.(woff2?|ttf|otf|eot)$/i
const dimensions = ['rawBytes', 'gzipBytes', 'brotliBytes']
const emptyTotals = () => ({ count: 0, rawBytes: 0, gzipBytes: 0, brotliBytes: 0 })
const sum = entries => entries.reduce((total, entry) => {
  total.count++
  for (const key of dimensions) total[key] += entry[key]
  return total
}, emptyTotals())

function sizes(bytes) {
  return {
    rawBytes: bytes.length,
    gzipBytes: gzipSync(bytes, { level: 9 }).length,
    brotliBytes: brotliCompressSync(bytes, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 11 }
    }).length
  }
}

function resourceType(path) {
  if (/\.(m?js|cjs)$/i.test(path)) return 'javascript'
  if (/\.css$/i.test(path)) return 'css'
  if (fontPattern.test(path)) return 'font'
  if (/\.(png|jpe?g|gif|webp|avif|svg|ico)$/i.test(path)) return 'image'
  return 'other'
}

function inside(root, file) {
  const path = relative(root, file)
  return path !== '..' && !path.startsWith(`..${sep}`) && !path.startsWith(sep)
}

async function walk(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(file))
    else if (entry.isFile()) files.push(file)
  }
  return files.sort()
}

async function measure(input) {
  const dist = await realpath(resolve(input))
  if (!(await stat(dist)).isDirectory()) throw new Error(`Not a directory: ${dist}`)
  const cache = new Map()
  const measureFile = async file => {
    if (!cache.has(file)) cache.set(file, sizes(await readFile(file)))
    return cache.get(file)
  }
  const fontFiles = (await walk(dist)).filter(file => fontPattern.test(file))
  const fonts = await Promise.all(fontFiles.map(async file => ({
    file: relative(dist, file), ...await measureFile(file)
  })))

  const pages = []
  for (const [locale, path, htmlFile] of [['zh', '/', 'index.html'], ['en', '/en/', 'en/index.html']]) {
    const file = resolve(dist, htmlFile)
    let html
    try {
      html = await readFile(file)
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      pages.push({ locale, path, htmlFile, status: 'missing' })
      continue
    }
    const dom = new JSDOM(html.toString(), { url: `https://static.invalid${path}` })
    const document = dom.window.document
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href')
    let origin = 'https://static.invalid'
    try {
      if (canonical) origin = new URL(canonical).origin
    } catch {}
    const pageUrl = new URL(path, origin)
    const base = new URL(document.querySelector('base[href]')?.getAttribute('href') || pageUrl.href, pageUrl)
    const resources = new Map()
    const ignored = { lazyImages: 0, inlineResourceUrls: 0, unsupportedUrls: 0 }
    const responsiveImages = []

    const add = (node, attribute, roles) => {
      const value = node.getAttribute(attribute)
      if (!value) return
      if (value.startsWith('data:')) {
        ignored.inlineResourceUrls++
        return
      }
      let url
      try {
        url = new URL(value, base)
      } catch {
        ignored.unsupportedUrls++
        return
      }
      if (!/^https?:$/.test(url.protocol)) {
        ignored.unsupportedUrls++
        return
      }
      url.hash = ''
      if (!resources.has(url.href)) resources.set(url.href, {
        url: url.href, type: resourceType(url.pathname), references: []
      })
      resources.get(url.href).references.push({
        tag: node.tagName.toLowerCase(), attribute, roles,
        ...(node.getAttribute('as') ? { as: node.getAttribute('as') } : {}),
        ...(node.getAttribute('media') ? { media: node.getAttribute('media') } : {}),
        ...(node.getAttribute('type') ? { declaredType: node.getAttribute('type') } : {}),
        ...(node.hasAttribute('nomodule') ? { nomodule: true } : {})
      })
    }

    for (const node of document.querySelectorAll('script[src]')) {
      const type = (node.getAttribute('type') || '').toLowerCase()
      if (!type || type === 'module' || /^(?:text|application)\/(?:java|ecma)script$/.test(type)) add(node, 'src', ['script'])
    }
    for (const node of document.querySelectorAll('link[href]')) {
      const roles = [...node.relList].map(rel => rel.toLowerCase()).filter(rel => ['stylesheet', 'preload', 'modulepreload'].includes(rel))
      if (roles.length) add(node, 'href', roles)
    }
    for (const node of document.querySelectorAll('img')) {
      if (node.getAttribute('loading')?.toLowerCase() === 'lazy') {
        ignored.lazyImages++
        continue
      }
      add(node, 'src', ['eager-image'])
      if (node.hasAttribute('srcset') || node.closest('picture')) responsiveImages.push({
        fallback: node.getAttribute('src'), srcset: node.getAttribute('srcset'),
        sizes: node.getAttribute('sizes'),
        pictureSources: [...(node.closest('picture')?.querySelectorAll('source') || [])].map(source => ({
          srcset: source.getAttribute('srcset'), media: source.getAttribute('media'), type: source.getAttribute('type')
        }))
      })
    }

    for (const resource of resources.values()) {
      const url = new URL(resource.url)
      if (url.origin !== origin) {
        resource.status = 'external-not-fetched'
        continue
      }
      let localFile
      try {
        localFile = resolve(dist, `.${decodeURIComponent(url.pathname)}`)
        if (!inside(dist, localFile)) throw new Error('Path outside dist')
        localFile = await realpath(localFile)
        if (!inside(dist, localFile)) throw new Error('Symlink outside dist')
        Object.assign(resource, { status: 'measured', file: relative(dist, localFile), ...await measureFile(localFile) })
      } catch (error) {
        resource.status = error.code === 'ENOENT' ? 'missing' : 'unmeasured'
        resource.reason = error.message
      }
    }
    const entries = [...resources.values()]
    const measured = entries.filter(resource => resource.status === 'measured')
    const htmlSizes = sizes(html)
    const totals = sum(measured)
    pages.push({
      locale, path, htmlFile, status: 'measured', htmlModifiedAt: (await stat(file)).mtime.toISOString(),
      html: htmlSizes, resources: entries, directLocalResources: totals,
      htmlAndDirectLocalResources: Object.fromEntries(dimensions.map(key => [key, htmlSizes[key] + totals[key]])),
      byType: Object.fromEntries(['javascript', 'css', 'font', 'image', 'other'].map(type => [type, sum(measured.filter(item => item.type === type))])),
      externalResources: entries.filter(item => item.status === 'external-not-fetched').length,
      missingResources: entries.filter(item => item.status === 'missing').length,
      unmeasuredResources: entries.filter(item => item.status === 'unmeasured').length,
      ignored, responsiveImages
    })
    dom.window.close()
  }
  return { dist, fontInventory: { ...sum(fonts), files: fonts }, pages }
}

try {
  const report = {
    generatedAt: new Date().toISOString(),
    method: {
      scope: 'Static build-file estimate, not browser transfer size or Core Web Vitals.',
      compression: 'Each file compressed separately: gzip level 9; Brotli quality 11. Actual server encoding, caching and headers are unknown.',
      deduplication: 'Direct resource URLs are deduplicated per page, retaining query strings and removing fragments. Repeated preload/img or preload/stylesheet references count once.',
      pageResources: 'HTML-linked script, stylesheet, preload, modulepreload and non-lazy img src. Excludes recursive JS imports, CSS dependencies, runtime requests, viewport-dependent lazy loading and external resource sizes.',
      responsiveImages: 'Only eager img src fallback bytes are included. Responsive alternatives are listed separately; no viewport or browser format selection is simulated.',
      conditionalResources: 'Media/type/nomodule conditions are recorded but not evaluated; a browser may skip these candidates.',
      fonts: 'Font inventory covers every font file in dist. It is not a per-page download total; only directly linked fonts are included in page estimates.'
    },
    sites: []
  }
  for (const directory of directories.length ? directories : ['dist']) report.sites.push(await measure(directory))
  console.log(JSON.stringify(report, null, 2))
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
