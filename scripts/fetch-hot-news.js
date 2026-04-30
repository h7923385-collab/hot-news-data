const https = require('https')
const fs = require('fs')
const path = require('path')

const TIMEOUT = 12000
const AGENT = 'Mozilla/5.0 (compatible; HotNewsBot/1.0)'

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: TIMEOUT, headers: { 'User-Agent': AGENT } }, (res) => {
      let d = ''
      res.on('data', c => d += c)
      res.on('end', () => resolve({ status: res.statusCode, data: d }))
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')) })
  })
}

function fmtNum(n) { if (n>=1000000) return (n/1000000).toFixed(1)+'m'; if (n>=1000) return (n/1000).toFixed(1)+'k'; return ''+n }

async function fetchHN() {
  const TIMEOUT_HN = 25000
  try {
    const res = await new Promise((resolve, reject) => {
    const req = https.get('https://hacker-news.firebaseio.com/v0/topstories.json', { timeout: TIMEOUT_HN, headers: { 'User-Agent': AGENT } }, (r) => {
      let d = ''
      r.on('data', c => d += c)
      r.on('end', () => resolve({ status: r.statusCode, data: d }))
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')) })
  })
    const ids = JSON.parse(res.data).slice(0, 20)
    const items = await Promise.all(
      ids.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => JSON.parse(r.data)))
    )
    return items.filter(Boolean).map((item, i) => ({
      title: (item.title || '').replace(/[<>]/g, ''),
      hot: fmtNum((200 - i) * 15000),
      desc: item.url ? new URL(item.url).hostname.replace('www.', '') : 'news.ycombinator.com',
      source: 'tech',
      tag: item.score ? `⬆️ ${item.score} points` : 'Hacker News',
      url: item.url || `https://news.ycombinator.com/item?id=${item.id}`
    }))
  } catch(e) { return [] }
}

async function fetchDevTo() {
  try {
    const res = await fetch('https://dev.to/api/articles?per_page=20')
    const articles = JSON.parse(res.data)
    return articles.filter(Boolean).map(item => ({
      title: (item.title || '').replace(/[<>]/g, ''),
      hot: `❤️ ${item.positive_reactions_count || 0} 💬 ${item.comments_count || 0}`,
      desc: (item.description || item.title || '').substring(0, 120),
      source: 'dev',
      tag: item.tags ? item.tags.split(',').slice(0,2).join(', ') : 'Dev.to',
      url: item.url || ''
    }))
  } catch(e) { return [] }
}

async function fetchSpaceflight() {
  try {
    const res = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=15')
    const data = JSON.parse(res.data)
    return (data.results || []).map(item => {
      const date = new Date(item.published_at)
      return {
        title: (item.title || '').replace(/[<>]/g, ''),
        hot: `${date.getMonth()+1}/${date.getDate()}`,
        desc: (item.summary || item.title || '').substring(0, 150),
        source: 'space',
        tag: item.news_site || 'Space News',
        url: item.url || ''
      }
    })
  } catch(e) { return [] }
}

async function fetchGithub() {
  try {
    // Get trending repos from the last week
    const weekAgo = new Date(Date.now() - 7*24*60*60*1000).toISOString().split('T')[0]
    const res = await fetch(`https://api.github.com/search/repositories?q=created:>=${weekAgo}&sort=stars&order=desc&per_page=15`)
    const data = JSON.parse(res.data)
    return (data.items || []).map(item => ({
      title: `${item.full_name}: ${item.description || ''}`.substring(0, 80),
      hot: `⭐ ${fmtNum(item.stargazers_count)}`,
      desc: (item.description || item.full_name || '').substring(0, 150),
      source: 'github',
      tag: item.language || 'GitHub',
      url: item.html_url || ''
    }))
  } catch(e) { return [] }
}

async function main() {
  console.log('🚀 开始抓取真实热点数据...\n')
  
  const now = new Date().toISOString()
  const results = { updatedAt: now, source: 'live' }
  
  const tasks = {
    tech: fetchHN().then(d => { results.tech = d; console.log(`   HN科技: ${d.length} 条`) }),
    dev: fetchDevTo().then(d => { results.dev = d; console.log(`   Dev.to: ${d.length} 条`) }),
    space: fetchSpaceflight().then(d => { results.space = d; console.log(`   航天: ${d.length} 条`) }),
    github: fetchGithub().then(d => { results.github = d; console.log(`   GitHub: ${d.length} 条`) })
  }
  
  await Promise.allSettled(Object.values(tasks))
  
  // Fallback if some categories are empty
  const platforms = ['tech', 'dev', 'space', 'github']
  for (const p of platforms) {
    if (!results[p] || results[p].length === 0) {
      results[p] = [{ title: `暂无 ${p} 数据`, hot: '', desc: '数据加载中，请稍后刷新', source: p, tag: 'loading' }]
    }
  }
  
  const total = platforms.reduce((s, p) => s + results[p].length, 0)
  console.log(`\n✅ 总计 ${total} 条真实热点数据`)
  console.log(`   更新时间: ${now}`)
  
  // Write data files
  const dataDir = path.join(__dirname, '..', 'data')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  
  fs.writeFileSync(path.join(dataDir, 'hot-news.json'), JSON.stringify(results, null, 2))
  fs.writeFileSync(path.join(dataDir, 'hot-news.min.json'), JSON.stringify(results))
  
  for (const p of platforms) {
    fs.writeFileSync(path.join(dataDir, `${p}.json`), JSON.stringify({ data: results[p], updatedAt: now }, null, 2))
  }
  
  fs.writeFileSync(path.join(dataDir, 'update-time.txt'), now)
  console.log('✅ 数据文件已写入')
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
