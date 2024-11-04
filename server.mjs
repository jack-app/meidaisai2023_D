import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

// 静的ファイルを提供するルート
app.use(express.static(path.join(__dirname, 'public')));

// テストページ用のルーティング

app.get('/test2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/scripts/websockets/test2.html'));
});

// サーバーの起動
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
