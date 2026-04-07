# 豪大根内容助手 Agent

## 功能
- 小红书种草 / 抖音脚本 / 朋友圈 / 爆款标题 / B端招商文案
- 上传产品图片，根据图片生成文案
- 历史记录保存（本地 localStorage）
- 团队共用，无需每人填 API Key

---

## 部署到 Vercel（5分钟）

### 第一步：上传到 GitHub
1. 打开 https://github.com/new 新建仓库（随便取名，如 `haodagen-agent`）
2. 把这个文件夹所有文件上传上去

### 第二步：导入到 Vercel
1. 打开 https://vercel.com，用 GitHub 账号登录
2. 点 **Add New Project** → 选你刚创建的仓库 → 点 **Deploy**

### 第三步：配置 API Key（关键！）
1. 部署完后进入项目 → **Settings** → **Environment Variables**
2. 添加一条：
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-xxxxxxxx`（你的 Anthropic API Key）
3. 点 Save → 回到 Deployments → 点 **Redeploy**

### 第四步：分享给团队
Vercel 会给你一个域名如 `haodagen-agent.vercel.app`，发给团队成员直接打开用。

---

## 文件结构
```
haodagen-agent/
├── api/
│   └── chat.js          # 后端接口（藏 API Key 的地方）
├── public/
│   └── index.html       # 前端页面
├── vercel.json          # Vercel 路由配置
└── package.json
```

---

## 费用参考
每次生成文案约消耗 $0.003~0.006，团队20人日常使用每月大概 $5~15。
