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

### 実行方法

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
