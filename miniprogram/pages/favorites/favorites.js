const app = getApp()

Page({
  data: { favorites: [] },

  onShow() { this.loadFavorites() },

  loadFavorites() {
    this.setData({ favorites: app.globalData.favorites || [] })
  },

  removeFavorite(e) {
    const index = e.currentTarget.dataset.index
    const favorites = [...app.globalData.favorites]
    favorites.splice(index, 1)
    app.globalData.favorites = favorites
    this.setData({ favorites })
    wx.showToast({ title: '已移除', icon: 'none' })
  },

  goToDetail(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail/detail?title=${encodeURIComponent(item.title)}&hot=${encodeURIComponent(item.hot || '')}&desc=${encodeURIComponent(item.desc || '')}&source=${encodeURIComponent(item.source || '')}`
    })
  },

  goToHome() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return `${d.getMonth()+1}/${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
  }
})
