#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// 解析命令行参数
const args = process.argv.slice(2);
const cleanType = args[0] || 'all';

// 要清理的目录列表
const dirsToClean = {
  build: ['out', '.next'],
  dist: ['dist'],
  cache: ['node_modules/.cache', 'storage', 'mydb'],
  all: ['out', '.next', 'dist', 'node_modules/.cache', 'storage', 'mydb']
};

// 要清理的文件列表
const filesToClean = {
  build: ['tsconfig.tsbuildinfo'],
  dist: [],
  cache: ['package-lock.json.backup'],
  all: ['tsconfig.tsbuildinfo', 'package-lock.json.backup']
};

function cleanDirectories(dirs) {
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`🗑️  删除目录: ${dir}`);
      try {
        rimraf.sync(dir);
      } catch (error) {
        console.warn(`⚠️  无法删除目录 ${dir}: ${error.message}`);
      }
    }
  });
}

function cleanFiles(files) {
  files.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`🗑️  删除文件: ${file}`);
      try {
        fs.unlinkSync(file);
      } catch (error) {
        console.warn(`⚠️  无法删除文件 ${file}: ${error.message}`);
      }
    }
  });
}

console.log(`🧹 开始清理 (类型: ${cleanType})...`);

// 根据类型清理
if (cleanType === 'all') {
  cleanDirectories(dirsToClean.all);
  cleanFiles(filesToClean.all);
} else if (cleanType === 'build') {
  cleanDirectories(dirsToClean.build);
  cleanFiles(filesToClean.build);
} else if (cleanType === 'dist') {
  cleanDirectories(dirsToClean.dist);
  cleanFiles(filesToClean.dist);
} else if (cleanType === 'cache') {
  cleanDirectories(dirsToClean.cache);
  cleanFiles(filesToClean.cache);
} else {
  console.log('❌ 未知的清理类型。支持的类型: all, build, dist, cache');
  process.exit(1);
}

console.log('✅ 清理完成！');
