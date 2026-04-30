// 加载详细数据
var HOT_DETAIL = require('../../data-detail.js')

var SOURCE_NAMES = {
  weibo: '🔥 微博热搜',
  baidu: '🦴 百度热搜',
  zhihu: '💡 知乎热榜',
  douyin: '🎵 抖音热榜',
  tech: '🚀 科技热点'
}

Page({
  data: {
    title: '',
    hot: '',
    fullDesc: '',
    source: '',
    sourceName: '',
    tag: '热点',
    time: ''
  },

  onLoad(options) {
    var title = decodeURIComponent(options.title || '')
    var hot = decodeURIComponent(options.hot || '')
    var desc = decodeURIComponent(options.desc || '')
    var source = decodeURIComponent(options.source || '热点')
    var sourceName = SOURCE_NAMES[source] || source

    // 尝试从详细数据中匹配
    var fullDesc = desc
    var tag = '热点'
    if (HOT_DETAIL && HOT_DETAIL[source]) {
      for (var i = 0; i < HOT_DETAIL[source].length; i++) {
        var item = HOT_DETAIL[source][i]
        if (item.title === title) {
          if (item.desc) fullDesc = item.desc
          if (item.tag) tag = item.tag
          break
        }
      }
    }

    // 如果描述太短，补充默认内容
    if (!fullDesc || fullDesc.length < 20) {
      fullDesc = title + '。' + (fullDesc || '') + '。更多相关信息正在持续更新中，请关注后续报道。'
    }

    // 生成时间
    var now = new Date()
    var timeStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0')

    this.setData({
      title: title,
      hot: hot,
      fullDesc: fullDesc,
      source: source,
      sourceName: sourceName,
      tag: tag,
      time: timeStr
    })
  },

  copyContent: function() {
    var text = this.data.title + ' - 热度' + this.data.hot + '\n' + this.data.fullDesc + '\nvia 今日热点小程序'
    wx.setClipboardData({
      data: text,
      success: function() { wx.showToast({ title: '复制成功', icon: 'success' }) }
    })
  },

  onShareAppMessage: function() {
    return {
      title: this.data.title,
      desc: this.data.fullDesc.substring(0, 60)
    }
  }
})
