/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  // GitHub Pagesの場合、リポジトリ名をbasePathに設定
  // 例: https://username.github.io/WorldCoinSubapp/
  basePath: isProd ? '/WorldCoinSubapp' : '',
  assetPrefix: isProd ? '/WorldCoinSubapp/' : '',
  images: {
    unoptimized: true,
  },
  output: 'export',
  // 静的エクスポート時のトレイリングスラッシュ設定
  trailingSlash: true,
}

export default nextConfig