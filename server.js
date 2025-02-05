// File: server.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = path.join(__dirname, 'postsData.json');

// GET /api/posts -> 전체 글 배열
app.get('/api/posts', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.json([]); // 파일이 없으면 빈 배열
      }
      return res.status(500).json({ error: 'File read error' });
    }
    const posts = JSON.parse(data || '[]');
    res.json(posts);
  });
});

// GET /api/posts/:id -> 특정 글
app.get('/api/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ error: 'No data' });
      }
      return res.status(500).json({ error: 'File read error' });
    }
    const posts = JSON.parse(data || '[]');
    const found = posts.find((p) => p.id === postId);
    if (!found) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(found);
  });
});

// POST /api/posts -> 새 글 작성
app.post('/api/posts', (req, res) => {
  const newPost = req.body;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let posts = [];
    if (!err && data) {
      posts = JSON.parse(data || '[]');
    }
    // 맨 앞에 추가
    posts.unshift(newPost);
    fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), (err2) => {
      if (err2) {
        return res.status(500).json({ error: 'File write error' });
      }
      res.json({ success: true, post: newPost });
    });
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
