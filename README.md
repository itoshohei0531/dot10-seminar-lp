# Dot.10 セミナーLP

ジョージア銀行口座開設セミナーのランディングページ。

## ファイル構成

```
.
├── index.html          # メインHTML
├── lp.jsx              # LPコンポーネント (React + JSX, Babelで実行時コンパイル)
└── assets/             # 画像アセット
    ├── dot10-logo.png       # ヘッダーロゴ
    ├── hero-30f.png         # ヒーロー画像（30代女性）
    ├── hero-30m.png         # ヒーロー画像（30代男性）
    ├── hero-50f.png         # ヒーロー画像（50代女性）
    ├── hero-50m.png         # ヒーロー画像（50代男性）
    ├── instructor-seto.png  # 講師ポートレート
    ├── line-button.png      # 公式LINE登録ボタン
    ├── voice-1.png          # お客様の声（東京・45歳・男性）
    ├── voice-2.png          # お客様の声（愛知・32歳・女性）
    └── voice-3.png          # お客様の声（広島・38歳・男性）
```

## デプロイ手順 (Netlify)

1. このフォルダの中身をGitHubリポジトリにpush
2. Netlifyで「New site from Git」 → GitHubリポジトリを選択
3. ビルド設定はそのまま（Build command: 空欄、Publish directory: `.`）
4. デプロイ完了

## ローカル確認

ローカルで開く場合は、HTTPサーバー経由で開く必要があります（file://だとJSXが読み込めません）：

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .
```

その後ブラウザで http://localhost:8000 を開く。

## LINE登録リンク

`lp.jsx` の冒頭にある `LINE_URL` 定数を変更してください：

```js
const LINE_URL = 'https://s.lmes.jp/landing-qr/2009498784-C1pQAyaB?uLand=IHVQoF';
```
