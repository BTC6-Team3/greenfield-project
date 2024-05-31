# Greenfield-Project

## 環境構築

### installing

- フロントエンドにパッケージを追加

```.sh
npm install react -w frontend
```

- バックエンドにパッケージを追加

```.sh
npm install express -w backend
```

### 開発環境の実行方法

※ 一番上の階層から実行できます

- フロントエンドの実行

```.sh
npm run dev -w frontend
```

- バックエンドの実行

```.sh
npm run dev -w backend
```

## DB の設定方法

### .env の作成場所

- .env は db 内に作成

backend  
 ┣db  
 ┃ ┣ migrations  
 ┃ ┣ `.env`  
 ┃ ┣ .env.example  
 ┃ ┗ knexfile.js

### 初期化

``.sh
npm run latestMigrate
npm run seed

```

## Appendix

- npm workspace の使用方法
  https://zenn.dev/ttaniguchi/articles/27971fdf7b30e1#npm-workspace%E3%82%92%E4%BD%BF%E3%81%86
```

## deploy 時の手順

### Render 側の環境変数の設定

DB_URL
NODE_ENV:production
NODE_VERSION:20.12.0

## Render 　側コマンド関係の設定

Build Command:npm run build -w frontend ; npm run build -w backend
Start Command:npm start
