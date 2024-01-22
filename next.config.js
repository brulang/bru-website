module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      pure: true,
    }
  },
  experimental: {
    serverComponentsExternalPackages: ['shiki']
  }
}
