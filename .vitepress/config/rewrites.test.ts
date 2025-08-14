import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { generateRewrites } from './rewrites'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

describe('generateRewrites', () => {
    let testDir: string
    let consoleSpy: any

    beforeEach(() => {
        // 创建临时测试目录
        testDir = join(tmpdir(), `test-rewrites-${Date.now()}`)
        mkdirSync(testDir, { recursive: true })

        // Mock console.warn
        consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { })
    })

    afterEach(() => {
        // 清理测试目录
        try {
            rmSync(testDir, { recursive: true, force: true })
        } catch (error) {
            // 忽略清理错误
        }

        // 恢复 console.warn
        consoleSpy.mockRestore()
    })

    it('should generate basic index rewrites', () => {
        const result = generateRewrites(testDir)

        expect(result).toHaveProperty('index/zh/index.md', 'index.md')
        expect(result).toHaveProperty('index/en/index.md', 'en/index.md')
    })

    it('should handle empty directories gracefully', () => {
        // 创建空的 md/zh 和 md/en 目录
        mkdirSync(join(testDir, 'md/zh'), { recursive: true })
        mkdirSync(join(testDir, 'md/en'), { recursive: true })

        const result = generateRewrites(testDir)

        // 应该只包含基础的 index 映射
        expect(result).toEqual({
            'index/zh/index.md': 'index.md',
            'index/en/index.md': 'en/index.md'
        })
    })

    it('should generate correct rewrites for regular documents', () => {
        // 创建测试文件
        mkdirSync(join(testDir, 'md/zh'), { recursive: true })
        mkdirSync(join(testDir, 'md/en'), { recursive: true })

        writeFileSync(join(testDir, 'md/zh/qa.md'), '# QA')
        writeFileSync(join(testDir, 'md/zh/contact.md'), '# Contact')
        writeFileSync(join(testDir, 'md/en/qa.md'), '# QA EN')
        writeFileSync(join(testDir, 'md/en/contact.md'), '# Contact EN')

        const result = generateRewrites(testDir)

        expect(result).toHaveProperty('md/zh/qa.md', 'docs/qa.md')
        expect(result).toHaveProperty('md/zh/contact.md', 'docs/contact.md')
        expect(result).toHaveProperty('md/en/qa.md', 'en/docs/qa.md')
        expect(result).toHaveProperty('md/en/contact.md', 'en/docs/contact.md')
    })

    it('should handle privacy and terms documents specially', () => {
        // 创建测试文件
        mkdirSync(join(testDir, 'md/zh'), { recursive: true })
        mkdirSync(join(testDir, 'md/en'), { recursive: true })

        writeFileSync(join(testDir, 'md/zh/privacy.md'), '# Privacy')
        writeFileSync(join(testDir, 'md/zh/terms.md'), '# Terms')
        writeFileSync(join(testDir, 'md/en/privacy.md'), '# Privacy EN')
        writeFileSync(join(testDir, 'md/en/terms.md'), '# Terms EN')

        const result = generateRewrites(testDir)

        // privacy 和 terms 应该映射到根路径
        expect(result).toHaveProperty('md/zh/privacy.md', 'privacy.md')
        expect(result).toHaveProperty('md/zh/terms.md', 'terms.md')
        expect(result).toHaveProperty('md/en/privacy.md', 'en/privacy.md')
        expect(result).toHaveProperty('md/en/terms.md', 'en/terms.md')
    })

    it('should filter out non-markdown files', () => {
        // 创建测试文件
        mkdirSync(join(testDir, 'md/zh'), { recursive: true })

        writeFileSync(join(testDir, 'md/zh/qa.md'), '# QA')
        writeFileSync(join(testDir, 'md/zh/image.png'), 'fake image')
        writeFileSync(join(testDir, 'md/zh/config.json'), '{}')
        writeFileSync(join(testDir, 'md/zh/readme.txt'), 'readme')

        const result = generateRewrites(testDir)

        // 只应该包含 .md 文件
        expect(result).toHaveProperty('md/zh/qa.md', 'docs/qa.md')
        expect(result).not.toHaveProperty('md/zh/image.png')
        expect(result).not.toHaveProperty('md/zh/config.json')
        expect(result).not.toHaveProperty('md/zh/readme.txt')
    })

    it('should handle mixed document types correctly', () => {
        // 创建测试文件
        mkdirSync(join(testDir, 'md/zh'), { recursive: true })
        mkdirSync(join(testDir, 'md/en'), { recursive: true })

        // 混合普通文档和特殊文档
        writeFileSync(join(testDir, 'md/zh/qa.md'), '# QA')
        writeFileSync(join(testDir, 'md/zh/privacy.md'), '# Privacy')
        writeFileSync(join(testDir, 'md/zh/contact.md'), '# Contact')
        writeFileSync(join(testDir, 'md/zh/terms.md'), '# Terms')

        writeFileSync(join(testDir, 'md/en/qa.md'), '# QA EN')
        writeFileSync(join(testDir, 'md/en/privacy.md'), '# Privacy EN')

        const result = generateRewrites(testDir)

        // 验证普通文档映射
        expect(result).toHaveProperty('md/zh/qa.md', 'docs/qa.md')
        expect(result).toHaveProperty('md/zh/contact.md', 'docs/contact.md')
        expect(result).toHaveProperty('md/en/qa.md', 'en/docs/qa.md')

        // 验证特殊文档映射
        expect(result).toHaveProperty('md/zh/privacy.md', 'privacy.md')
        expect(result).toHaveProperty('md/zh/terms.md', 'terms.md')
        expect(result).toHaveProperty('md/en/privacy.md', 'en/privacy.md')
    })

    it('should return fallback rewrites when directories do not exist', () => {
        // 使用不存在的目录
        const nonExistentDir = join(testDir, 'non-existent')

        const result = generateRewrites(nonExistentDir)

        // 应该返回后备配置
        expect(result).toEqual({
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
        })

        // 应该输出警告
        expect(consoleSpy).toHaveBeenCalledWith('Warning: Could not read markdown directories, using fallback rewrites')
    })

    it('should use process.cwd() when no basePath is provided', () => {
        // 这个测试验证默认行为，但由于我们无法控制 process.cwd()，
        // 我们只验证函数能正常调用而不抛出错误
        expect(() => generateRewrites()).not.toThrow()
    })

    it('should handle large number of files efficiently', () => {
        // 创建大量测试文件
        mkdirSync(join(testDir, 'md/zh'), { recursive: true })
        mkdirSync(join(testDir, 'md/en'), { recursive: true })

        // 创建 100 个文件
        for (let i = 0; i < 100; i++) {
            writeFileSync(join(testDir, `md/zh/doc${i}.md`), `# Document ${i}`)
            writeFileSync(join(testDir, `md/en/doc${i}.md`), `# Document ${i} EN`)
        }

        const startTime = Date.now()
        const result = generateRewrites(testDir)
        const endTime = Date.now()

        // 验证所有文件都被处理
        expect(Object.keys(result)).toHaveLength(202) // 100*2 + 2 (index files)

        // 验证性能（应该在合理时间内完成）
        expect(endTime - startTime).toBeLessThan(1000) // 1秒内完成

        // 验证一些随机文件的映射
        expect(result).toHaveProperty('md/zh/doc0.md', 'docs/doc0.md')
        expect(result).toHaveProperty('md/en/doc99.md', 'en/docs/doc99.md')
    })
})