// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@pinia/nuxt'
    // function (_: any, nuxt: { hook: (arg0: string, arg1: (nitro: any) => void) => void }) {
    //   nuxt.hook('nitro:init', nitro => {
    //     nitro.options.scanDirs = []
    //   })
    // }
  ],
  content: {
    markdown: {
      // This option allows you to use Vue components in your markdown content
      vue: true
    }
  },
  buildModules: [
    '@nuxt/typescript-build',
  ],
  postcss: {
    plugins: {
      'postcss-nesting': {},
      // Other PostCSS plugins can be added here
    },
  },
  css: ['@/assets/css/tailwind.css'],
})
