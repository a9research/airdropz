const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: path.join(__dirname, '..') });
const handle = app.getRequestHandler();

class NextServer {
  constructor(port = 3001) {
    this.port = port;
    this.server = null;
  }

  async start() {
    return new Promise((resolve, reject) => {
      try {
        // 等待Next.js准备就绪
        app.prepare().then(() => {
          this.server = createServer((req, res) => {
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;

            // 处理静态文件
            if (pathname.startsWith('/_next/static/') || pathname.startsWith('/static/')) {
              return handle(req, res, parsedUrl);
            }

            // 处理API路由
            if (pathname.startsWith('/api/')) {
              return handle(req, res, parsedUrl);
            }

            // 处理所有其他路由（SPA支持）
            return handle(req, res, parsedUrl);
          });

          this.server.listen(this.port, (err) => {
            if (err) {
              console.error('Failed to start Next.js server:', err);
              reject(err);
            } else {
              console.log(`Next.js server started on port ${this.port}`);
              resolve();
            }
          });

          this.server.on('error', reject);
        }).catch(reject);
      } catch (error) {
        console.error('Failed to prepare Next.js app:', error);
        reject(error);
      }
    });
  }

  async stop() {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          console.log('Next.js server stopped');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

module.exports = NextServer;
