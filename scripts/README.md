# 构建脚本说明

## 清理脚本 (clean.js)

### 功能
自动清理构建过程中产生的临时文件和目录，确保每次构建都是干净的。

### 使用方法

```bash
# 清理所有构建产物
npm run clean

# 清理所有构建产物（同上）
npm run clean:all

# 只清理 Next.js 构建产物
npm run clean:build

# 只清理 Electron 打包产物
npm run clean:dist

# 只清理缓存文件
npm run clean:cache
```

### 清理内容

#### `clean:all` / `clean`
- `out/` - Next.js 构建输出目录
- `.next/` - Next.js 缓存目录
- `dist/` - Electron 打包输出目录
- `node_modules/.cache/` - 缓存目录
- `storage/` - 存储目录
- `mydb/` - 数据库目录
- `tsconfig.tsbuildinfo` - TypeScript 构建信息
- `package-lock.json.backup` - 备份文件

#### `clean:build`
- `out/` - Next.js 构建输出目录
- `.next/` - Next.js 缓存目录
- `tsconfig.tsbuildinfo` - TypeScript 构建信息

#### `clean:dist`
- `dist/` - Electron 打包输出目录

#### `clean:cache`
- `node_modules/.cache/` - 缓存目录
- `storage/` - 存储目录
- `mydb/` - 数据库目录
- `package-lock.json.backup` - 备份文件

### 自动清理

以下命令会自动执行清理：

- `npm run build` - 构建前清理 build 相关文件
- `npm run electron-pack*` - 打包前清理所有文件
- `npm run preelectron-pack` - 预打包前清理所有文件

### 错误处理

脚本包含错误处理机制：
- 如果某个文件或目录无法删除，会显示警告但不会中断执行
- 支持跨平台操作（Windows、macOS、Linux）
