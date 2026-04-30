Page({
  data: {
    title: '',
    hot: '',
    desc: '',
    source: '',
    time: '',
    relatedList: []
  },

  onLoad(options) {
    const now = new Date()
    const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`

    this.setData({
      title: decodeURIComponent(options.title || ''),
      hot: decodeURIComponent(options.hot || ''),
      desc: decodeURIComponent(options.desc || '暂无详细描述'),
      source: decodeURIComponent(options.source || '热点'),
      time: timeStr
    })
    this.generateRelated()
  },

  generateRelated() {
    this.setData({
      relatedList: [
        { title: '今日热门话题TOP10', hot: '🔥 3256万' },
        { title: '网友热议：你关注了吗？', hot: '🔥 2189万' },
        { title: '更多相关资讯持续更新', hot: '🔥 1543万' }
      ]
    })
  },

  copyContent() {
    const { title, hot } = this.data
    wx.setClipboardData({
      data: `${title} - 热度${hot}\nvia 今日热点小程序`,
      success: () => wx.showToast({ title: '复制成功', icon: 'success' })
    })
  },

  onShareAppMessage() {
    return { title: this.data.title, desc: this.data.desc }
  }
})
