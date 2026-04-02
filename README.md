# 极简个人主页（Next.js + Tailwind CSS）

新手优先看：`新手配置说明书.md`

## 启动

```bash
npm.cmd install
npm.cmd run dev
```

打开 `http://localhost:3000`。

## 你最常改的地方

- 所有文案和链接配置：`app/site-content.js`
- 头像和二维码图片配置：`app/site-content.js` 里的 `leftColumn.avatar.src` 与 `leftColumn.qrItems[*].src`
- 主题颜色：`app/globals.css` 里的 `:root` 变量

## 图片配置说明

- 支持本地路径（推荐）：把图片放到 `public` 目录，例如 `/avatar.jpg`、`/wechat-qr.png`
- 支持网络地址：例如 `https://.../avatar.png`
- 头像：`leftColumn.avatar.src`
- 微信二维码：`leftColumn.qrItems[0].src`
- 小程序二维码：`leftColumn.qrItems[1].src`
