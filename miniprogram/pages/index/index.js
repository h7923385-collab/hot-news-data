const app = getApp()

// ========================================
// 内置备选数据（零网络也能跑）
// 小程序启动时会优先尝试 CDN 加载
// 如果 CDN 加载失败，自动使用这些数据
// ========================================
const MOCK_DATA = {
  weibo: [
    {title: '全国多地迎来高温天气', hot: '8.6亿', source: 'weibo', desc: '中央气象台连续发布高温橙色预警，华北、黄淮、江南等多地气温突破40℃。专家提醒市民做好防暑降温措施，减少户外活...', tag: '民生热点'},
    {title: '国产大模型通过图灵测试', hot: '6.3亿', source: 'weibo', desc: '由国内AI团队研发的新一代大语言模型在最新一轮图灵测试中以92%的通过率打破纪录，标志着中国AI技术跻身世界前...', tag: '科技前沿'},
    {title: '新能源汽车渗透率突破60%', hot: '5.8亿', source: 'weibo', desc: '中汽协数据显示，4月新能源汽车零售渗透率首次突破60%，达到62.3%。传统燃油车市场份额加速萎缩，多家合资品...', tag: '财经资讯'},
    {title: '教育部发布新高考改革方案', hot: '4.7亿', source: 'weibo', desc: '教育部正式发布2027年起实施的新高考改革方案，包括科目设置调整、综合评价录取比例提升、英语考试改革等多项重大...', tag: '教育要闻'},
    {title: '华为发布新一代折叠屏手机', hot: '4.2亿', source: 'weibo', desc: '华为正式发布新一代折叠屏旗舰手机Mate X6，起售价相比前代降低15%，搭载最新麒麟芯片和自研鸿蒙系统。该机...', tag: '数码产品'},
    {title: '五一假期旅游消费创新高', hot: '3.9亿', source: 'weibo', desc: '文旅部数据显示，2026年五一假期全国国内旅游出游合计3.8亿人次，同比增长12.3%，旅游消费总额突破350...', tag: '旅游出行'},
    {title: 'AI医生辅助诊断准确率超98%', hot: '3.5亿', source: 'weibo', desc: '由多家三甲医院参与的AI辅助诊断临床试验结果显示，AI系统在影像诊断、病理分析等方面的准确率达到98.7%，超...', tag: '医疗健康'},
    {title: '中国航天员再次成功出舱', hot: '3.1亿', source: 'weibo', desc: '神舟二十号航天员乘组圆满完成第二次出舱活动，进行了空间站舱外设备安装与维护任务。此次出舱用时6小时28分钟，刷...', tag: '航天探索'},
    {title: '跨境电商出口额同比增长40%', hot: '2.8亿', source: 'weibo', desc: '海关总署数据显示，一季度我国跨境电商出口额同比增长40.2%。东南亚、中东、拉美市场增长最为迅猛。越来越多的中...', tag: '经济动态'},
    {title: '无人驾驶出租车全面开放运营', hot: '2.4亿', source: 'weibo', desc: '北京、上海、深圳等10个城市宣布无人驾驶出租车全面开放商业运营，市民可通过主流打车软件预约。起步价仅为传统出租...', tag: '出行科技'}
  ],
  baidu: [
    {title: '五一假期首日全国铁路发送旅客创新高', hot: '1226万', source: 'baidu', desc: '五一假期首日，全国铁路发送旅客突破2000万人次，创历史新高。各地火车站增开临时列车，延长运营时间，全力保障旅...', tag: '交通出行'},
    {title: '人民币汇率保持稳定', hot: '986万', source: 'baidu', desc: '央行最新报告显示，人民币兑美元汇率在合理均衡水平上保持基本稳定。央行表示将继续实施稳健的货币政策，维护外汇市场...', tag: '财经资讯'},
    {title: '数字人民币应用场景持续扩大', hot: '852万', source: 'baidu', desc: '数字人民币试点范围已扩展至全国30个城市，覆盖零售消费、公共交通、医疗缴费等场景。数字人民币App用户数突破3...', tag: '金融科技'},
    {title: '中国新能源车企海外建厂提速', hot: '743万', source: 'baidu', desc: '比亚迪、蔚来、小鹏等多家中国新能源车企宣布在东南亚、欧洲建设海外工厂。中国汽车出口量已跃居全球第一，新能源车成...', tag: '汽车资讯'},
    {title: 'AI教育助手走进中小学课堂', hot: '621万', source: 'baidu', desc: '全国已有超过5000所中小学引入AI教育助手系统，实现个性化学习辅导和智能批改。调查显示使用AI助教的学生平均...', tag: '教育科技'},
    {title: '国产芯片制造工艺取得突破', hot: '568万', source: 'baidu', desc: '国内芯片制造企业宣布3nm工艺进入试产阶段，良率达到预期水平。这是中国在高端芯片制造领域的重大突破，有望打破国...', tag: '科技前沿'},
    {title: '中欧班列开行量创新高', hot: '492万', source: 'baidu', desc: '一季度中欧班列累计开行突破5000列，同比增长18%，运送货物价值超300亿美元。中欧贸易往来持续升温，一带一...', tag: '一带一路'},
    {title: '生物医药创新药获批上市', hot: '435万', source: 'baidu', desc: '国家药监局批准多款国产创新药上市，涵盖肿瘤治疗、自身免疫疾病等领域。国产创新药研发能力持续提升，多款药物实现海...', tag: '医疗健康'},
    {title: '智慧城市建设成果显著', hot: '387万', source: 'baidu', desc: '住建部公布30个智慧城市建设示范城市名单，覆盖数字政务、智慧交通、智慧环保等领域。智慧城市让城市管理更高效，市...', tag: '城市发展'},
    {title: '乡村振兴战略成效显著', hot: '342万', source: 'baidu', desc: '农业农村部数据显示，2025年农村居民人均可支配收入同比增长8.5%，城乡收入差距持续缩小。特色农业、乡村旅游...', tag: '三农政策'}
  ],
  zhihu: [
    {title: '如何评价2026年五一假期的旅游数据？', hot: '2876万', source: 'zhihu', desc: '旅游业的全面复苏已是事实，3.8亿人次的出游规模显示出中国经济强大的内需动力。但同时也暴露出景区承载力不足、服...', tag: '热门讨论'},
    {title: 'AI会取代程序员吗？深度分析来了', hot: '2153万', source: 'zhihu', desc: '随着AI编程工具能力的飞速提升，很多人担心程序员会被取代。事实上AI更多是提高效率的工具，而非替代者。未来程序...', tag: '职业发展'},
    {title: '新能源汽车 vs 燃油车，到底怎么选？', hot: '1987万', source: 'zhihu', desc: '随着新能源渗透率突破60%，充电设施不断完善，新能源车的使用体验已全面超越燃油车。但在长途出行和极端天气场景下...', tag: '购车指南'},
    {title: '年轻人为什么越来越喜欢City Walk？', hot: '1654万', source: 'zhihu', desc: 'City Walk的流行反映了年轻人对深度体验式旅游的偏好变化。相较传统景点的走马观花，City Walk更注...', tag: '生活方式'},
    {title: '如何看待国产大模型的快速崛起？', hot: '1289万', source: 'zhihu', desc: '国产大模型在短短两年内实现了从追赶到并跑的历史性跨越，在全球AI竞赛中占据重要位置。这得益于我国在数据资源、应...', tag: '科技观察'},
    {title: '如何科学减肥不反弹？', hot: '987万', source: 'zhihu', desc: '科学减肥的核心在于建立可持续的健康生活方式，包括合理膳食、规律运动和充足睡眠。极端节食和过度运动难以持久，也容...', tag: '健康生活'},
    {title: '大学毕业到底该考研还是工作？', hot: '865万', source: 'zhihu', desc: '这取决于个人职业规划。如果目标是学术研究或高门槛专业岗位，考研是更好的选择。如果更看重实践经验和职业探索，直接...', tag: '教育选择'},
    {title: '延迟退休政策怎么看？', hot: '754万', source: 'zhihu', desc: '延迟退休是应对人口老龄化的必然选择。渐进式延迟退休方案充分考虑不同群体的诉求，采取小步调整、弹性实施的方式推进...', tag: '社会保障'},
    {title: '2026年最值得关注的科技趋势', hot: '1123万', source: 'zhihu', desc: '从AI大模型到量子计算，从脑机接口到人形机器人，2026年将是科技变革加速的一年。其中AI Agent的普及预...', tag: '科技趋势'},
    {title: 'ChatGPT之后，AI还能怎么进化？', hot: '1432万', source: 'zhihu', desc: '当前AI正从大语言模型向多模态智能体进化。未来的AI将具备更强的推理能力、更长的记忆能力和更丰富的交互方式，成...', tag: 'AI前沿'}
  ],
  douyin: [
    {title: '五一特种兵旅游之24小时吃遍一座城', hot: '3502万', source: 'douyin', desc: '博主挑战24小时内吃遍一座城市的地道美食，从早餐到宵夜，穿越城市的大街小巷。这种特种兵式旅游攻略深受年轻人喜爱...', tag: '美食探店'},
    {title: '挑战全网最自律的一周Vlog', hot: '2867万', source: 'douyin', desc: '一位大学生挑战连续一周早上5点起床、读书锻炼、高效学习，记录下自律生活的每一天。视频激励了无数网友开始自己的自...', tag: '生活记录'},
    {title: 'AI绘画生成自己的漫画形象', hot: '2456万', source: 'douyin', desc: '使用最新的AI绘画工具，上传照片即可生成专属漫画形象。不同风格随意切换，日漫、美漫、国风全都支持，全网掀起AI...', tag: '创意玩法'},
    {title: '乡村生活治愈系视频合集', hot: '1987万', source: 'douyin', desc: '记录乡村生活的点点滴滴：清晨的鸡鸣、田间的劳作、院子里的晚饭。没有城市的喧嚣，只有最朴实的人间烟火气，治愈了无...', tag: '田园生活'},
    {title: '宠物搞笑瞬间TOP10', hot: '1765万', source: 'douyin', desc: '盘点本周最搞笑的宠物视频，猫狗争宠、调皮捣蛋、迷惑行为大赏。萌宠们的沙雕日常总能让人开怀大笑，缓解一天的疲惫。', tag: '萌宠日常'},
    {title: '街头采访：你觉得多少钱可以退休', hot: '1543万', source: 'douyin', desc: '在街头随机采访路人，询问他们心中的退休存款目标。答案从50万到5000万不等，引发网友对财务自由和生活规划的深...', tag: '社会话题'},
    {title: '舞蹈挑战赛全民参与', hot: '1321万', source: 'douyin', desc: '最新热门舞蹈挑战赛席卷全网，从专业舞者到广场舞大妈都在跳同一个舞步。简单易学的动作和魔性的旋律让人忍不住跟着跳...', tag: '热门舞蹈'},
    {title: '100元吃一天挑战', hot: '1187万', source: 'douyin', desc: '博主挑战100元吃一天，从早餐的包子豆浆到深夜的烧烤宵夜，精打细算每一分钱。既展示了各地的美食文化，也引发了消...', tag: '美食挑战'},
    {title: '变装视频合集惊艳网友', hot: '1023万', source: 'douyin', desc: '从路人到明星，从朴素到华丽，变装视频的魅力在于短短几秒内的视觉冲击。创意十足的变装内容让每个普通人都能展现自己...', tag: '创意视频'},
    {title: '方言挑战：你能听懂几句？', hot: '2134万', source: 'douyin', desc: '全国各地网友用方言说同一句话，你能猜出几个？从东北话到广东话，从四川话到闽南语，方言挑战让各地网友在欢笑中感受...', tag: '地域文化'}
  ],
  tech: [
    {title: 'Apple Vision Pro 2 曝光全新功能', hot: '768万', source: 'tech', desc: '第二代Apple Vision Pro预计将大幅降低重量，续航提升至8小时，并加入手势识别3.0技术和全新的空...', tag: '科技新品'},
    {title: 'OpenAI发布GPT-5：AGI更进一步', hot: '693万', source: 'tech', desc: 'OpenAI正式发布GPT-5，在逻辑推理、多模态理解、长文本处理等方面全面超越前代。模型在多个专业领域考试中...', tag: 'AI前沿'},
    {title: 'SpaceX星舰第五飞成功', hot: '627万', source: 'tech', desc: 'SpaceX星舰完成第五次轨道飞行测试，成功实现助推器回收和载荷部署。此次飞行验证了多项关键技术，为未来的月球...', tag: '航天探索'},
    {title: '台积电3nm工艺良率突破90%', hot: '564万', source: 'tech', desc: '台积电宣布其3nm制程工艺良率已突破90%，超越同期5nm工艺的表现。这意味着3nm芯片的产能和成本将达到商业...', tag: '半导体'},
    {title: '小米汽车SU7交付量突破20万', hot: '512万', source: 'tech', desc: '小米汽车SU7自发布以来累计交付量突破20万辆，成为国内最快达到这一里程碑的新势力车企。小米正在加速推进第二款...', tag: '智能汽车'},
    {title: '量子计算机首次解决实用问题', hot: '478万', source: 'tech', desc: '中国科研团队研制的量子计算机在药物分子模拟领域首次解决了一个传统计算机无法在合理时间内完成的实际问题，标志着量...', tag: '量子计算'},
    {title: '脑机接口技术人体试验成功', hot: '435万', source: 'tech', desc: 'Neuralink宣布其脑机接口芯片在首批5名志愿者体内运行良好，成功实现意念控制计算机光标、文字输入等功能。...', tag: '脑科学'},
    {title: '全球首款可折叠平板电脑发布', hot: '392万', source: 'tech', desc: '三星发布全球首款可折叠平板电脑Galaxy Tab Fold，展开后屏幕尺寸达14英寸。该设备可在手机、平板和...', tag: '消费电子'},
    {title: '5.5G商用网络正式启用', hot: '356万', source: 'tech', desc: '三大运营商宣布5.5G（5G-A）商用网络正式启用，下行峰值速率达到10Gbps。5.5G将支撑XR、全息通信...', tag: '通信技术'},
    {title: '人形机器人走进工厂工作', hot: '324万', source: 'tech', desc: '多款国产人形机器人在汽车制造、物流仓储等场景中开始实际应用，完成物料搬运、装配、质检等工作。人形机器人量产成本...', tag: '机器人'}
  ],
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
