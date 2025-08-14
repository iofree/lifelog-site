import { readdirSync } from 'node:fs'
import { join } from 'node:path'

// 动态生成路由重写规则
export function generateRewrites(basePath?: string): Record<string, string> {
  const rewrites: Record<string, string> = {}
  const rootPath = basePath || process.cwd()

  // 首页映射
  rewrites['index/zh/index.md'] = 'index.md'
  rewrites['index/en/index.md'] = 'en/index.md'

  try {
    // 中文文档映射
    const zhDocsPath = join(rootPath, 'md/zh')
    if (readdirSync(zhDocsPath, { withFileTypes: true }).length > 0) {
      const zhFiles = readdirSync(zhDocsPath).filter((file: string) => file.endsWith('.md'))
      zhFiles.forEach((file: string) => {
        const fileName = file.replace('.md', '')
        if (['privacy', 'terms'].includes(fileName)) {
          rewrites[`md/zh/${file}`] = `${fileName}.md`
        } else {
          rewrites[`md/zh/${file}`] = `docs/${file}`
        }
      })
    }

    // 英文文档映射
    const enDocsPath = join(rootPath, 'md/en')
    if (readdirSync(enDocsPath, { withFileTypes: true }).length > 0) {
      const enFiles = readdirSync(enDocsPath).filter((file: string) => file.endsWith('.md'))
      enFiles.forEach((file: string) => {
        const fileName = file.replace('.md', '')
        if (['privacy', 'terms'].includes(fileName)) {
          rewrites[`md/en/${file}`] = `en/${fileName}.md`
        } else {
          rewrites[`md/en/${file}`] = `en/docs/${file}`
        }
      })
    }
  } catch (error) {
    console.warn('Warning: Could not read markdown directories, using fallback rewrites')
    // 如果读取目录失败，使用原有的静态配置作为后备
    return {
      'index/zh/index.md': 'index.md',
      'index/en/index.md': 'en/index.md',
      'md/zh/qa.md': 'docs/qa.md',
      'md/zh/contact.md': 'docs/contact.md',
      'md/zh/privacy.md': 'privacy.md',
      'md/zh/terms.md': 'terms.md',
      'md/en/qa.md': 'en/docs/qa.md',
      'md/en/contact.md': 'en/docs/contact.md',
      'md/en/privacy.md': 'en/privacy.md',
      'md/en/terms.md': 'en/terms.md'
    }
  }

  return rewrites
}