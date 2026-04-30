const app = getApp()

// ========================================
// 🎯 唯一需要你改的地方！
// 把下面的 USERNAME 和 REPO 换成你自己的
// ========================================
const GITHUB_USERNAME = 'h7923385-collab'
const GITHUB_REPO = 'hot-news-data'

// 自动生成 CDN 地址（用 jsDelivr 全球加速，完全免费）
const CDN_BASE = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${GITHUB_REPO}@main/data`

Page({
  data: {
    currentCategory: 'weibo',
    newsList: [],
    loading: false,
 refreshing: false,
    error: '',
    updateTime: '',
    favorites: [],
    categories: ['weibo', 'baidu', 'zhihu', 'douyin', 'tech'],
    categoryNames: {
      weibo: '🔥 微博热搜',
      baidu: '🦴 百度热搜',
      zhihu: '💡 知乎热榜',
      douyin: '🎵 抖音热榜',
      tech: '🚀 科技热点'
    }
  },

  onLoad() {
    this.loadHotNews()
  },

  onShow() {
    this.setData({
      favorites: app.globalData.favorites || []
    })
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category
    if (category === this.data.currentCategory) return
    
    this.setData({
      currentCategory: category,
      newsList: [],
      error: '',
      loading: true
    }, () => {
      this.loadHotNews()
    })
  },

  // 从 CDN 加载热点数据
  async loadHotNews() {
    const { currentCategory } = this.data
    
    this.setData({ loading: true, error: '' })

    try {
      // 优先加载按分类拆分的文件（更小更快）
      let url = `${CDN_BASE}/${currentCategory}.json`
      let res = await this.fetchJSON(url)

      // 如果分类文件不存在，加载总文件
      if (!res || !res.data || res.data.length === 0) {
        url = `${CDN_BASE}/hot-news.min.json`
        const allData = await this.fetchJSON(url)
        if (allData && allData[currentCategory]) {
          res = { data: allData[currentCategory] }
        }
      }

      if (res && res.data && res.data.length > 0) {
        // 记录更新时间
        let updateTime = ''
        if (res.updatedAt) {
          const d = new Date(res.updatedAt)
          updateTime = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
        }

        this.setData({
          newsList: res.data,
          updateTime: updateTime || this.formatTime(new Date()),
          loading: false
        })
      } else {
        throw new Error('数据为空')
      }
    } catch (err) {
      console.error('CDN加载失败:', err)
      this.setData({
        error: '数据加载失败，请下拉刷新重试',
        loading: false
      })
    }
  },

  // 带重试的请求
  async fetchJSON(url, retries = 2) {
    for (let i = 0; i <= retries; i++) {
      try {
        const res = await new Promise((resolve, reject) => {
          wx.request({
            url,
            method: 'GET',
            timeout: 10000,
            success: resolve,
            fail: reject
          })
        })
        
        if (res.statusCode === 200 && res.data) {
          return res.data
        }
      } catch (e) {
        if (i === retries) throw e
        // 重试前等待 1 秒
        await new Promise(r => setTimeout(r, 1000))
      }
    }
    return null
  },

  // 下拉刷新
  async onRefresh() {
    this.setData({ refreshing: true })
    await this.loadHotNews()
    this.setData({ refreshing: false })
  },

  // 跳转详情
  goToDetail(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail/detail?title=${encodeURIComponent(item.title)}&hot=${encodeURIComponent(item.hot || '')}&desc=${encodeURIComponent(item.desc || '')}&source=${encodeURIComponent(item.source || '')}`
    })
  },

  // 切换收藏
  toggleFavorite(e) {
    const item = e.currentTarget.dataset.item
    let favorites = app.globalData.favorites || []
    
    const idx = favorites.findIndex(f => f.title === item.title)
    if (idx > -1) {
      favorites.splice(idx, 1)
      wx.showToast({ title: '已取消收藏', icon: 'none' })
    } else {
      favorites.push({ ...item, savedAt: new Date().toISOString() })
      wx.showToast({ title: '收藏成功', icon: 'success' })
    }
    
    app.globalData.favorites = favorites
    this.setData({ favorites })
  },

  // 检查是否已收藏
  isFavorited(item) {
    const favorites = app.globalData.favorites || []
    return favorites.some(f => f.title === item.title)
  },

  // 格式化时间
  formatTime(date) {
    const h = String(date.getHours()).padStart(2, '0')
    const m = String(date.getMinutes()).padStart(2, '0')
    return `${h}:${m}`
  }
})
