# 🔥 热点推送 - 微信小程序

> **零成本** | **自动更新** | **GitHub Actions + CDN**

---

## ✨ 功能

| 平台 | 分类 |
|------|------|
| 🔥 微博热搜 | 实时抓取 |
| 🦴 百度热搜 | 实时抓取 |
| 💡 知乎热榜 | 实时抓取 |
| 🎵 抖音热榜 | 实时抓取 |
| 🚀 科技热点 | Hacker News |

## 🚀 5 分钟部署

### 第 0 步：准备工作
- [GitHub](https://github.com) 账号
- [微信小程序 AppID](https://mp.weixin.qq.com)（免费注册）

### 第 1 步：Fork 并推送代码到 GitHub

```bash
# 1. 在 GitHub 上新建一个仓库（例如 hot-news-data）
# 2. 把代码推上去
git remote add origin https://github.com/你的用户名/hot-news-data.git
git push -u origin main
```

### 第 2 步：启用 GitHub Actions

去 GitHub 仓库 → **Actions** 标签 → 启用 Workflows

之后每 **30 分钟** 自动抓取一次热点，推送到仓库的 `data/` 目录。

### 第 3 步：改小程序配置

修改 `miniprogram/pages/index/index.js` 最上面的两行：

```js
const GITHUB_USERNAME = '你的GitHub用户名'
const GITHUB_REPO = '你的仓库名'
```

### 第 4 步：导入微信开发者工具

1. 复制 `miniprogram/` 整个目录到新位置（或直接导入整个项目）
2. 打开微信开发者工具 → 导入项目
3. 填入 AppID，选择 `miniprogram/` 目录
4. 编译运行 ✅

---

## ⚡ 数据流

```
GitHub Actions (每30分钟)
    ↓ 抓取
各平台热点数据
    ↓ 生成 JSON
data/hot-news.min.json
    ↓ 推送到 GitHub
jsDelivr CDN (全球加速)
    ↓ 请求
微信小程序 → 展示给用户
```

> 注意：首次推送后，CDN 可能需要几分钟才能缓存最新数据。

## 🛠 技术栈

- **前端**: 微信小程序 (WXML + WXSS + JS)
- **后端**: 无（纯前端 + CDN）
- **数据抓取**: GitHub Actions + Node.js
- **托管**: jsDelivr CDN（免费，全球加速）
- **成本**: **￥0**

---

MIT License
