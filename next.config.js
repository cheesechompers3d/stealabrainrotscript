/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.scrandle.pro','image.scrandle.pro'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  },
  // 禁用错误页面预渲染
  excludeDefaultMomentLocales: true,
  generateEtags: false,
  poweredByHeader: false,
  // 自定义构建输出
  experimental: {
    // 禁用默认错误页面的静态生成
    disableOptimizedLoading: true,
    // 禁用404和500页面的预渲染
    excludePages: ['/_error', '/404', '/500']
  }
}

module.exports = nextConfig 