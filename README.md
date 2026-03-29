# COURTSIDE — 運動賽事追蹤網站

## 數據來源（全部免費，無需 API Key）

| 運動 | 來源 | 端點 | 更新頻率 |
|------|------|------|---------|
| NBA  | cdn.nba.com 官方 CDN | `/liveData/scoreboard/todaysScoreboard_00.json` | 每 10 秒 |
| MLB  | statsapi.mlb.com 官方 API | `/schedule`, `/standings` | 即時 |
| F1   | Jolpica (Ergast 相容) | `api.jolpi.ca/ergast/f1` | 即時 |
| BWF  | 靜態近期結果 | — | 手動更新 |

---

## 部署到 Vercel（免費，5 分鐘完成）

### 方法一：GitHub + Vercel（推薦，之後更新只要 push 就自動部署）

**Step 1 — 建立 GitHub Repo**
```bash
git init
git add .
git commit -m "init: courtside sports tracker"
gh repo create courtside --public --push
# 或手動在 github.com 建立 repo，然後 push
```

**Step 2 — 連接 Vercel**
1. 前往 [vercel.com](https://vercel.com) → 用 GitHub 帳號登入
2. 點「Add New Project」→ 選剛剛建立的 repo
3. Framework Preset 選「**Other**」
4. 點「Deploy」— 完成！

Vercel 會自動偵測 `vercel.json` 並套用設定。部署完成後你會得到一個 `xxx.vercel.app` 的網址。

---

### 方法二：Vercel CLI（直接從電腦部署，不用 GitHub）

**安裝 Vercel CLI**
```bash
npm install -g vercel
```

**部署**
```bash
cd sports-tracker/
vercel
# 照著指示操作，選 Yes 到底
# 第一次會要求登入 Vercel 帳號
```

**之後更新**
```bash
vercel --prod
```

---

## 本地開發（解決 CORS 問題）

直接點開 HTML 檔案會有 CORS 問題（瀏覽器安全限制），用以下任一方式在本地跑伺服器：

**Option A — Node.js（推薦）**
```bash
npx serve .
# 開啟 http://localhost:3000
```

**Option B — Python**
```bash
python3 -m http.server 8080
# 開啟 http://localhost:8080
```

**Option C — VS Code**
安裝 Live Server 擴充套件，右鍵 index.html → Open with Live Server

---

## 檔案結構

```
sports-tracker/
├── index.html      # 主要網站檔案（所有 HTML/CSS/JS 在同一檔）
├── vercel.json     # Vercel 部署設定（路由、快取、CORS headers）
└── README.md       # 這個檔案
```

---

## 自訂設定

在 `index.html` 的 `<script>` 區塊頂部找到 `CFG` 物件：

```js
const CFG = {
  NBA_SCOREBOARD: 'https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json',
  NBA_SCHEDULE:   'https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json',
  NBA_STANDINGS:  'https://cdn.nba.com/static/json/staticData/standings.json',
  MLB:            'https://statsapi.mlb.com/api/v1',
  F1:             'https://api.jolpi.ca/ergast/f1',
};
```

部署到 Vercel 後，可以把 URL 改成走 Vercel proxy（避免任何 CORS 問題）：
```js
// 改成使用 Vercel proxy
NBA_SCOREBOARD: '/api/nba/liveData/scoreboard/todaysScoreboard_00.json',
MLB: '/api/mlb',
F1:  '/api/f1',
```

---

## 下一步規劃

- [ ] 關注球隊 / 球員設定（localStorage 儲存）
- [ ] 瀏覽器推播通知（開賽提醒）
- [ ] 球員數據頁面
- [ ] BWF 串接動態數據
