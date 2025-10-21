import fs from 'fs/promises'
import path from 'path'

const BLOG_DIR = path.resolve(process.cwd(), 'public', 'data', 'blog')
const OUT_FILE = path.join(BLOG_DIR, 'index.json')

function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9\-]+/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '')
}

async function generateIndex() {
  try {
    const files = await fs.readdir(BLOG_DIR)
    const articles = []

    for (const file of files) {
      if (!file.endsWith('.json')) continue
      if (file === 'index.json') continue

      const full = path.join(BLOG_DIR, file)
      const raw = await fs.readFile(full, 'utf-8')
      let data
      try {
        data = JSON.parse(raw)
      } catch (e) {
        console.warn(`Skipping ${file} — invalid JSON`)
        continue
      }

      const title = data.title ?? ''
      const slug = data.slug ?? slugify(title) ?? path.basename(file, '.json')
      const id = data.id ?? slug
      const cover = data.cover ?? null
      const date = data.date ?? null
      const summary = data.summary ?? null
      const tags = Array.isArray(data.tags) ? data.tags : []

      articles.push({ id, title, cover, date, summary, tags, slug })
    }

    articles.sort((a, b) => {
      if (!a.date && !b.date) return 0
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date) - new Date(a.date)
    })

    await fs.writeFile(OUT_FILE, JSON.stringify(articles, null, 2), 'utf-8')
    console.log(`Generated ${OUT_FILE} (${articles.length} items)`)
  } catch (err) {
    console.error('Failed to generate index:', err)
    process.exit(1)
  }
}

generateIndex()
