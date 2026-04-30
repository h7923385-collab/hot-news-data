const app = getApp()

// ========================================
// 内置备选数据（零网络也能跑）
// 小程序启动时会优先尝试 CDN 加载
// 如果 CDN 加载失败，自动使用这些数据
// ========================================
const MOCK_DATA = {
  weibo: [
    { title: '全国多地迎来高温天气', hot: '8.6亿', desc: '气象台发布高温预警', source: 'weibo' },
    { title: '国产大模型通过图灵测试', hot: '6.3亿', desc: 'AI领域里程碑式突破', source: 'weibo' },
    { title: '新能源汽车渗透率突破60%', hot: '5.8亿', desc: '燃油车加速退场', source: 'weibo' },
    { title: '教育部发布新高考改革方案', hot: '4.7亿', desc: '2027年起实施', source: 'weibo' },
    { title: '华为发布新一代折叠屏手机', hot: '4.2亿', desc: '售价创新低', source: 'weibo' },
    { title: '五一假期旅游消费创新高', hot: '3.9亿', desc: '全面复苏', source: 'weibo' },
    { title: 'AI医生辅助诊断准确率超98%', hot: '3.5亿', desc: '智慧医疗新突破', source: 'weibo' },
    { title: '中国航天员再次成功出舱', hot: '3.1亿', desc: '空间站建设进展顺利', source: 'weibo' },
    { title: '跨境电商出口额同比增长40%', hot: '2.8亿', desc: '中国品牌加速出海', source: 'weibo' },
    { title: '无人驾驶出租车全面开放运营', hot: '2.4亿', desc: '10个城市率先试点', source: 'weibo' },
    { title: '高考报名人数再创新高', hot: '2.1亿', desc: '达到1350万人', source: 'weibo' },
    { title: '6G通信试验网正式开通', hot: '1.6亿', desc: '峰值速率达1Tbps', source: 'weibo' },
    { title: 'AI生成视频技术惊艳业界', hot: '1.4亿', desc: 'Sora之后又一突破', source: 'weibo' },
    { title: '国产GPU性能追平国际旗舰', hot: '1.2亿', desc: '自主芯片重大突破', source: 'weibo' },
    { title: 'City Walk成为年轻人新潮流', hot: '9867万', desc: '城市漫步记录生活', source: 'weibo' }
  ],
  baidu: [
    { title: '五一假期首日全国铁路发送旅客创新高', hot: '1226万', desc: '各地火车站迎来出行高峰', source: 'baidu' },
    { title: '人民币汇率保持稳定', hot: '986万', desc: '央行释放积极信号', source: 'baidu' },
    { title: '数字人民币应用场景持续扩大', hot: '852万', desc: '覆盖线上线下多个领域', source: 'baidu' },
    { title: '中国新能源车企海外建厂提速', hot: '743万', desc: '全球化布局加速推进', source: 'baidu' },
    { title: 'AI教育助手走进中小学课堂', hot: '621万', desc: '个性化学习成为可能', source: 'baidu' },
    { title: '国产芯片制造工艺取得突破', hot: '568万', desc: '3nm工艺进入试产阶段', source: 'baidu' },
    { title: '中欧班列开行量创新高', hot: '492万', desc: '一带一路贸易持续增长', source: 'baidu' },
    { title: '生物医药创新药获批上市', hot: '435万', desc: '国产创新药走向世界', source: 'baidu' },
    { title: '智慧城市建设成果显著', hot: '387万', desc: '30个城市获评示范', source: 'baidu' },
    { title: '乡村振兴战略成效显著', hot: '342万', desc: '农村居民收入稳步增长', source: 'baidu' }
  ],
  zhihu: [
    { title: '如何评价2026年五一假期的旅游数据？', hot: '2876万', desc: '旅游业全面复苏', source: 'zhihu' },
    { title: 'AI会取代程序员吗？深度分析来了', hot: '2153万', desc: '未来职业发展思考', source: 'zhihu' },
    { title: '新能源汽车 vs 燃油车，到底怎么选？', hot: '1987万', desc: '购车决策指南', source: 'zhihu' },
    { title: '年轻人为什么越来越喜欢City Walk？', hot: '1654万', desc: '生活方式变迁', source: 'zhihu' },
    { title: '如何看待国产大模型的快速崛起？', hot: '1289万', desc: '科技自立自强', source: 'zhihu' },
    { title: '如何科学减肥不反弹？', hot: '987万', desc: '健康生活指南', source: 'zhihu' },
    { title: '大学毕业到底该考研还是工作？', hot: '865万', desc: '人生选择', source: 'zhihu' },
    { title: '延迟退休政策怎么看？', hot: '754万', desc: '社会保障讨论', source: 'zhihu' },
    { title: '2026年最值得关注的科技趋势', hot: '1123万', desc: '年度预测盘点', source: 'zhihu' },
    { title: 'ChatGPT之后，AI还能怎么进化？', hot: '1432万', desc: '技术前沿讨论', source: 'zhihu' }
  ],
  douyin: [
    { title: '五一特种兵旅游之24小时吃遍一座城', hot: '3502万', desc: '美食探店爆火', source: 'douyin' },
    { title: '挑战全网最自律的一周Vlog', hot: '2867万', desc: '生活记录类内容', source: 'douyin' },
    { title: 'AI绘画生成自己的漫画形象', hot: '2456万', desc: 'AI创意玩法', source: 'douyin' },
    { title: '乡村生活治愈系视频合集', hot: '1987万', desc: '田园生活记录', source: 'douyin' },
    { title: '宠物搞笑瞬间TOP10', hot: '1765万', desc: '萌宠内容', source: 'douyin' },
    { title: '街头采访：你觉得多少钱可以退休', hot: '1543万', desc: '社会话题讨论', source: 'douyin' },
    { title: '舞蹈挑战赛全民参与', hot: '1321万', desc: '热门舞蹈模仿', source: 'douyin' },
    { title: '100元吃一天挑战', hot: '1187万', desc: '美食省钱挑战', source: 'douyin' },
    { title: '变装视频合集惊艳网友', hot: '1023万', desc: '创意变装内容', source: 'douyin' },
    { title: '方言挑战：你能听懂几句？', hot: '2134万', desc: '地域趣味', source: 'douyin' }
  ],
  tech: [
    { title: 'Apple Vision Pro 2 曝光全新功能', hot: '768万', desc: '空间计算新突破', source: 'tech' },
    { title: 'OpenAI发布GPT-5：AGI更进一步', hot: '693万', desc: 'AI能力全面升级', source: 'tech' },
    { title: 'SpaceX星舰第五飞成功', hot: '627万', desc: '商业航天里程碑', source: 'tech' },
    { title: '台积电3nm工艺良率突破90%', hot: '564万', desc: '芯片制造新高度', source: 'tech' },
    { title: '小米汽车SU7交付量突破20万', hot: '512万', desc: '跨界造车成功案例', source: 'tech' },
    { title: '量子计算机首次解决实用问题', hot: '478万', desc: '量子计算里程碑', source: 'tech' },
    { title: '脑机接口技术人体试验成功', hot: '435万', desc: 'Neuralink最新进展', source: 'tech' },
    { title: '全球首款可折叠平板电脑发布', hot: '392万', desc: '消费电子新形态', source: 'tech' },
    { title: '5.5G商用网络正式启用', hot: '356万', desc: '通信技术演进', source: 'tech' },
    { title: '人形机器人走进工厂工作', hot: '324万', desc: '机器人产业化加速', source: 'tech' }
  ]
}

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
      url: 'https://cdn.jsdelivr.net//h792338-collab/hot-news-data@main/data/hot-news.min.json',
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
      url: '/pages/detail/detail?title=' + encodeURIComponent(item.title) + '&hot=' + encodeURIComponent(item.hot || '') + '&desc=' + encodeURIComponent(item.desc || '') + '&source=' + encodeURIComponent(item.source || '')
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
