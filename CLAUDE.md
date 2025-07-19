# WorldCoin MiniApp - ハンバーガー神経衰弱ゲーム

## プロジェクト概要
WorldCoinのminiappとして、WorldIdでログインしてハンバーガーの神経衰弱ゲームができるアプリケーションを作成しました。

## 参考資料
- ドキュメント: https://docs.world.org/mini-apps
- テンプレートリポジトリ: https://github.com/worldcoin/minikit-next-template

## 主要機能
1. ✅ WorldIdでのログイン機能
2. ✅ ハンバーガーの神経衰弱ゲーム（6種類の絵文字、12枚のカード）
3. ✅ ゲーム結果の記録・表示（手数、マッチ数、勝利メッセージ）
4. ✅ ログアウト機能
5. ✅ ゲームリセット機能

## 技術スタック
- Next.js 15.4.1
- React 19.1.0
- TypeScript 5.8.3
- TailwindCSS 4.1.11
- WorldCoin MiniKit JS 1.9.6
- WorldCoin MiniKit React 1.9.7

## プロジェクト構造
```
WorldCoinSubapp/
├── app/
│   ├── globals.css          # TailwindCSS設定
│   ├── layout.tsx           # レイアウト + MiniKitProvider
│   └── page.tsx             # メインページ（認証 + ゲーム）
├── components/
│   ├── MiniKitProvider.tsx  # MiniKit初期化
│   ├── WorldIdAuth.tsx      # WorldId認証コンポーネント
│   └── MemoryGame.tsx       # 神経衰弱ゲーム
├── public/                  # 静的ファイル
├── .env.example            # 環境変数テンプレート
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

## セットアップ手順

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
```bash
cp .env.example .env
```

`.env`ファイルを編集して以下の値を設定：
```env
NEXT_PUBLIC_WLD_APP_ID=your_app_id_here
NEXT_PUBLIC_WLD_ACTION_ID=your_action_id_here
WLD_CLIENT_ID=your_client_id_here
WLD_CLIENT_SECRET=your_client_secret_here
DEV_PORTAL_API_KEY=your_dev_portal_api_key_here

# オプション: 開発環境で実際のWorld ID認証を使用する場合
# NEXT_PUBLIC_FORCE_REAL_AUTH=true
```

### 3. WorldCoin Developer Portal での設定
1. [World ID Developer Portal](https://developer.worldcoin.org) にアクセス
2. 新しいアプリケーションを作成
3. `login` アクションを作成
4. 必要な認証情報を取得して `.env` に設定

## 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm run start

# 型チェック
npm run type-check

# リント
npm run lint
```

## テスト方法

### 1. PC開発環境でのテスト
```bash
npm run dev
```
- ブラウザで http://localhost:3000 にアクセス
- **開発モード**: World App外でもモック認証でテスト可能
- 黄色い警告バナーが表示され、「Login (Development Mode)」ボタンが表示される
- 1秒後にモック認証が完了し、ゲームが開始される

#### 開発環境で実際のWorld ID認証を使用する場合
`.env`ファイルに以下を設定：
```env
NEXT_PUBLIC_FORCE_REAL_AUTH=true
```
- 青色のバナーが表示され、「Real authentication enabled in development」と表示される
- World Appで開く必要があるため、ngrokやlocaltunnelを使用してアクセス可能なURLを生成する

### 2. スマホからのテスト

#### 方法A: ngrokを使用（推奨）
```bash
# ngrokをインストール
brew install ngrok

# 開発サーバーを起動
npm run dev

# 別のターミナルでngrokを起動
ngrok http 3000
```
- 生成されたHTTPS URLをスマホのWorld Appで開く

#### 方法B: localtunnelを使用
```bash
# localtunnelをインストール
npm install -g localtunnel

# 開発サーバーを起動
npm run dev

# 別のターミナルでlocaltunnelを起動
lt --port 3000
```
- 生成されたURLをスマホのWorld Appで開く

#### 方法C: 同一ネットワーク内アクセス
```bash
# モバイル向けに起動
npm run dev:mobile

# または
npm run dev -- -H 0.0.0.0
```
- スマホから `http://[PCのIPアドレス]:3000` でアクセス
- IPアドレスは `ifconfig` で確認可能

### 3. World App内でのテスト
1. World Appをスマートフォンにインストール
2. 上記のいずれかの方法でURLを取得
3. World App内でURLを開く
4. 実際のWorld ID認証が実行される
5. 認証成功後、ゲームが開始される

### 4. 本番環境でのテスト
```bash
npm run build
npm run start
```
- World App内でのみ動作
- 開発モードのモック認証は無効化される

## ゲーム仕様
- **カード数**: 12枚（6種類のハンバーガー系絵文字 × 2枚）
- **絵文字**: 🍔 🍟 🌭 🥪 🍕 🥙
- **勝利条件**: 6組のペアを全て見つける
- **機能**: 手数カウント、マッチ数表示、リセット、勝利時の祝福

## 実装済み機能
- [x] WorldId認証フロー
- [x] 認証後のゲーム画面表示
- [x] ハンバーガー絵文字を使った神経衰弱ゲーム
- [x] カードクリック・フリップアニメーション
- [x] マッチ判定とペア削除
- [x] 手数とマッチ数の表示
- [x] 勝利判定と祝福メッセージ
- [x] ゲームリセット機能
- [x] ログアウト機能
- [x] レスポンシブデザイン

## 今後の拡張可能性
- スコアボード機能
- 複数の難易度設定
- 他のプレイヤーとの対戦機能
- NFT報酬システム
- プレイ統計の記録

## トラブルシューティング

### "MiniKit is not installed" エラー
- **開発環境**: 正常動作（モック認証を使用）
- **本番環境**: World App内で実行する必要がある

### 認証が失敗する場合
1. `.env` ファイルの環境変数を確認
2. World ID Developer Portal の設定を確認
3. `login` アクションが正しく作成されているか確認

### World App内での動作確認
1. World Appをインストール
2. Developer Portalで設定したURLにアクセス
3. 実際のWorld ID認証を実行

## 開発メモ
- MiniKit SDK の正しい使用方法を適用
- TypeScript での型安全性を確保
- TailwindCSS での UI実装
- Next.js App Router の活用
- 開発環境とWorld App環境の両方に対応
- モック認証による開発効率の向上