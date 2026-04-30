const app = getApp()

// ========================================
// 内置备选数据（零网络也能跑）
// 小程序启动时会优先尝试 CDN 加载
// 如果 CDN 加载失败，自动使用这些数据
// ========================================
var MOCK_DATA = {"tech": [{"title": "暂无 tech 数据", "hot": "", "source": "tech", "desc": "数据加载中，请稍后刷新", "tag": "loading"}], "dev": [{"title": "More Accessible Focus Indicators with Compose", "hot": "❤️ 16 💬 0", "source": "dev", "desc": "Last summer, I wrote a blog post about focus management...", "tag": "android,  a11y"}, {"title": "Forking Paseo: Mobile vibe coding for me", "hot": "❤️ 24 💬 1", "source": "dev", "desc": "TLDR - I wanted to upgrade my coding-from-my-phone work...", "tag": "ai,  agents"}, {"title": "vLLM on Google Cloud TPU: A Model Size vs Chip Cheat Sheet (With Interactive Tool)", "hot": "❤️ 10 💬 0", "source": "dev", "desc": "Picking a Cloud TPU slice for vLLM inference involves t...", "tag": "tpu,  googlecloud"}, {"title": "How I Used AI to Fix Our E2E Test Architecture", "hot": "❤️ 30 💬 7", "source": "dev", "desc": "I joined a project with an existing Playwright E2E test...", "tag": "testing,  e2e"}, {"title": "Why I'm Building SaaS in 2026", "hot": "❤️ 15 💬 15", "source": "dev", "desc": "In-house AI agents are seductive but fragile. Here's th...", "tag": "saas,  ai"}, {"title": "Everyone's Talking About Gemini. The Real Story at Google Cloud NEXT '26 Was GKE Agent Sandbox.", "hot": "❤️ 11 💬 4", "source": "dev", "desc": "Google Cloud NEXT '26 had one clear headline: the Gemin...", "tag": "cloudnextchallenge,  googlecloud"}, {"title": "Creating a CLI Tool with AI Agents: My Journey with kdn", "hot": "❤️ 0 💬 0", "source": "dev", "desc": "A few months ago, my experience with AI assistance was ...", "tag": "ai,  agents"}, {"title": "Service-to-Service Calls vs Event-Driven Flows: When to Use Which", "hot": "❤️ 0 💬 0", "source": "dev", "desc": "This post breaks down the difference between direct ser...", "tag": "backend,  architecture"}, {"title": "Leadership Micro Katas", "hot": "❤️ 4 💬 0", "source": "dev", "desc": "About twenty years ago, I broke production. I was a you...", "tag": "leadership,  learning"}, {"title": "Why Web3 Exists and Why Solana Matters", "hot": "❤️ 40 💬 2", "source": "dev", "desc": "You trust middlemen every single day. You probably don'...", "tag": "100daysofsolana,  learning"}, {"title": "Fine-Tuning Gemma 4 with Cloud Run Jobs: Serverless GPUs (NVIDIA RTX 6000 Pro) for pet breed classification 🐈🐕", "hot": "❤️ 51 💬 4", "source": "dev", "desc": "Google has just announced the release of Gemma 4! This ...", "tag": "gemma,  machinelearning"}, {"title": "How I used Gemini CLI to orchestrate a complex RAG migration", "hot": "❤️ 41 💬 2", "source": "dev", "desc": "Building a complex, multi-phase cloud project like a RA...", "tag": "gemini,  agents"}, {"title": "Meme Monday", "hot": "❤️ 33 💬 25", "source": "dev", "desc": "Meme Monday!  Today's cover image comes from the last t...", "tag": "discuss,  jokes"}, {"title": "Platform-Neutral AI Tools Are the Safer Long-Term Bet", "hot": "❤️ 0 💬 0", "source": "dev", "desc": "AI tool lock-in lives in your context and intent layer,...", "tag": "ai,  llm"}, {"title": "Cold Starts Are Dead", "hot": "❤️ 27 💬 7", "source": "dev", "desc": "It never fails. Every time I talk about serverless, som...", "tag": "serverless,  aws"}], "space": [{"title": "Next NASA ISS astronaut, doctor discusses upcoming mission", "hot": "4/30", "source": "space", "desc": "A doctor who has assisted in mass casualty events, serv...", "tag": "NASASpaceflight"}, {"title": "This Month at ESA: April 2026", "hot": "4/30", "source": "space", "desc": "What did space deliver for Europe this month? From the ...", "tag": "ESA"}, {"title": "The great parachute bake-out", "hot": "4/30", "source": "space", "desc": "From the ESA Blogs.", "tag": "ESA"}, {"title": "Arianespace Launches Another 32 Amazon LEO Satellites Aboard Ariane 6", "hot": "4/30", "source": "space", "desc": "European launch services provider Arianespace has succe...", "tag": "European Spaceflight"}, {"title": "Baking a parachute for Mars", "hot": "4/30", "source": "space", "desc": "Watch ESA’s Mars chief engineer Albert Haldemann explai...", "tag": "ESA"}, {"title": "Starry spiral in a familiar neighbourhood", "hot": "4/30", "source": "space", "desc": "From the ESA Blogs.", "tag": "ESA"}, {"title": "Winter’s End Is Written in the Clouds", "hot": "4/30", "source": "space", "desc": "As winter turned to spring, the skies over the Gulf of ...", "tag": "NASA"}, {"title": "Live coverage: SpaceX to launch 24 Starlink satellites on Falcon 9 rocket from Vandenberg SFB", "hot": "4/30", "source": "space", "desc": "The Starlink 17-36 mission will be SpaceX’s 51st Falcon...", "tag": "Spaceflight Now"}, {"title": "I Am Artemis: Ryan Schulte", "hot": "4/30", "source": "space", "desc": "Listen to this audio excerpt from Ryan Schulte, Orion f...", "tag": "NASA"}, {"title": "US-Indian Spacecraft Captures Mexico City Subsidence", "hot": "4/30", "source": "space", "desc": "Description A scientist produced this map of land subsi...", "tag": "NASA"}, {"title": "Curiosity Blog, Sols 4873-4878: Welcome to the Atacama Drill Target", "hot": "4/30", "source": "space", "desc": "Written by Sharon Wilson Purdy, Planetary Geologist at ...", "tag": "NASA"}, {"title": "US-Indian Space Mission Maps Extreme Subsidence in Mexico City", "hot": "4/30", "source": "space", "desc": "One of the most powerful radar systems ever launched in...", "tag": "NASA"}, {"title": "Artemis II Astronauts Visit the White House", "hot": "4/30", "source": "space", "desc": "President Trump welcomed the Artemis II crew to the Whi...", "tag": "SpacePolicyOnline.com"}, {"title": "Falcon Heavy Returns with ViaSat-3 F3", "hot": "4/30", "source": "space", "desc": "SpaceX’s Falcon Heavy rocket made a rare appearance on ...", "tag": "Space Scout"}, {"title": "SpaceX launches 6-ton ViaSat-3 F3 satellite on Falcon Heavy rocket", "hot": "4/30", "source": "space", "desc": "The mission was the 12th launch of a Falcon Heavy rocke...", "tag": "Spaceflight Now"}], "github": [{"title": "nexu-io/open-design: 🎨 Local-first, open-source alternative to Anthropic's Clau", "hot": "⭐ 6.8k", "source": "github", "desc": "🎨 Local-first, open-source alternative to Anthropic's C...", "tag": "TypeScript"}, {"title": "op7418/guizang-ppt-skill: A Claude Code Skill that turns prompts into horizontal", "hot": "⭐ 4.4k", "source": "github", "desc": "A Claude Code Skill that turns prompts into horizontal-...", "tag": "HTML"}, {"title": "cursor/cookbook: ", "hot": "⭐ 2.4k", "source": "github", "desc": "cursor/cookbook", "tag": "TypeScript"}, {"title": "freestylefly/awesome-gpt-image-2: Prompt as Code | GPT-Image2 工业级提示词引擎与模板库 - 329", "hot": "⭐ 2.4k", "source": "github", "desc": "Prompt as Code | GPT-Image2 工业级提示词引擎与模板库 - 329个案例逆向工程，1...", "tag": "GitHub"}, {"title": "victorchen96/deepseek_v4_rolepaly_instruct: 对于DeepSeek-V4角色扮演的特殊控制指令的说明", "hot": "⭐ 1.6k", "source": "github", "desc": "对于DeepSeek-V4角色扮演的特殊控制指令的说明", "tag": "GitHub"}, {"title": "theori-io/copy-fail-CVE-2026-31431: ", "hot": "⭐ 1.4k", "source": "github", "desc": "theori-io/copy-fail-CVE-2026-31431", "tag": "Python"}, {"title": "0x0funky/agent-sprite-forge: Agent Skill for generating 2D sprite sheets and map", "hot": "⭐ 1.4k", "source": "github", "desc": "Agent Skill for generating 2D sprite sheets and map, tr...", "tag": "Python"}, {"title": "openclaw/clawsweeper: ClawSweeper scans all issues and PRs and suggest what we c", "hot": "⭐ 1.4k", "source": "github", "desc": "ClawSweeper scans all issues and PRs and suggest what w...", "tag": "JavaScript"}, {"title": "GammaLabTechnologies/harmonist: Portable AI agent orchestration with mechanical ", "hot": "⭐ 925", "source": "github", "desc": "Portable AI agent orchestration with mechanical protoco...", "tag": "Python"}, {"title": "future-agi/future-agi: Open-source, end-to-end platform for evaluating, observin", "hot": "⭐ 763", "source": "github", "desc": "Open-source, end-to-end platform for evaluating, observ...", "tag": "Python"}, {"title": "ps5-linux/ps5-linux-loader: Linux payload implementing the HV exploit and a cust", "hot": "⭐ 728", "source": "github", "desc": "Linux payload implementing the HV exploit and a custom ...", "tag": "C"}, {"title": "DanOps-1/Gpt-Agreement-Payment: ChatGPT Plus/Team/Pro 订阅协议端到端重放工具集 · hCaptcha 视觉", "hot": "⭐ 693", "source": "github", "desc": "ChatGPT Plus/Team/Pro 订阅协议端到端重放工具集 · hCaptcha 视觉求解器 · 反...", "tag": "Python"}, {"title": "epoko77-ai/im-not-ai: AI가 쓴 글이 아닌 것처럼 윤문해주는 스킬", "hot": "⭐ 664", "source": "github", "desc": "AI가 쓴 글이 아닌 것처럼 윤문해주는 스킬", "tag": "Python"}, {"title": "GENEXIS-AI/chromex: A Codex-powered Chrome side-panel assistant for page context", "hot": "⭐ 626", "source": "github", "desc": "A Codex-powered Chrome side-panel assistant for page co...", "tag": "TypeScript"}, {"title": "alash3al/stash: Stash — persistent memory layer for AI agents. Episodes, facts, ", "hot": "⭐ 582", "source": "github", "desc": "Stash — persistent memory layer for AI agents. Episodes...", "tag": "Go"}]}



Page({
  data: {
    currentCategory: 'weibo',
    newsList: [],
    loading: true,
    refreshing: false,
    error: '',
    updateTime: '',
    favorites: [],
    categoryNames: {
      tech: '🚀 全球科技',
      dev: '💻 开发者资讯',
      space: '🛰️ 航天探索',
      github: '⭐ 开源趋势'
    }
  },

  onLoad() {
    this.loadHotNews()
  },

  onShow() {
    this.setData({ favorites: app.globalData.favorites || [] })
  },

  switchCategory(e) {
    const c = e.currentTarget.dataset.category
    if (c === this.data.currentCategory) return
    this.setData({ currentCategory: c, newsList: [], loading: true })
    this.loadHotNews()
  },

  loadHotNews() {
    const cat = this.data.currentCategory
    const list = MOCK_DATA[cat] || MOCK_DATA.weibo
    
    // 先用内置数据立即显示（0延迟）
    this.setData({
      newsList: list,
      updateTime: this.formatTime(new Date()),
      loading: false
    })
    
    // 同时尝试从 CDN 拉取最新数据（有更好，没有也无所谓）
    this.tryLoadFromCDN(cat)
  },

  // 后台尝试从 CDN 加载（不阻塞界面）
  tryLoadFromCDN(cat) {
    const self = this
    wx.request({
      url: 'https://cdn.jsdelivr.net/gh/h792338-collab/hot-news-data@main/data/hot-news.min.json',
      method: 'GET',
      timeout: 8000,
      success(res) {
        if (res.statusCode === 200 && res.data && res.data[cat] && res.data[cat].length > 0) {
          let updateTime = ''
          if (res.data.updatedAt) {
            const d = new Date(res.data.updatedAt)
            updateTime = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0') + ' ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0')
          }
          self.setData({
            newsList: res.data[cat],
            updateTime: updateTime
          })
          console.log('✅ CDN数据已更新')
        }
      },
      fail() {
        console.log('CDN加载失败，使用内置数据')
      }
    })
  },

  onRefresh() {
    this.setData({ refreshing: true })
    this.loadHotNews()
    this.setData({ refreshing: false })
  },

  goToDetail(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/detail/detail?title=' + encodeURIComponent(item.title) + '&hot=' + encodeURIComponent(item.hot || '') + '&desc=' + encodeURIComponent(item.desc || '') + '&tag=' + encodeURIComponent(item.tag || '') + '&source=' + encodeURIComponent(item.source || '')
    })
  },

  toggleFavorite(e) {
    const item = e.currentTarget.dataset.item
    let favs = app.globalData.favorites || []
    const idx = favs.findIndex(function(f) { return f.title === item.title })
    if (idx > -1) {
      favs.splice(idx, 1)
      wx.showToast({ title: '已取消收藏', icon: 'none' })
    } else {
      favs.push({ title: item.title, hot: item.hot, desc: item.desc, source: item.source, savedAt: new Date().toISOString() })
      wx.showToast({ title: '收藏成功', icon: 'success' })
    }
    app.globalData.favorites = favs
    this.setData({ favorites: favs })
  },

  isFavorited(item) {
    var favs = app.globalData.favorites || []
    return favs.some(function(f) { return f.title === item.title })
  },

  formatTime(date) {
    return String(date.getHours()).padStart(2,'0') + ':' + String(date.getMinutes()).padStart(2,'0')
  }
})
