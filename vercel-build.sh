#!/bin/bash

echo "🚀 Fetching Git LFS files..."
git lfs install
git lfs pull

echo "📦 Installing dependencies..."
npm install

echo "🛠️ Running Vite build..."
npm run build
