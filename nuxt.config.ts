// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    // function (_: any, nuxt: { hook: (arg0: string, arg1: (nitro: any) => void) => void }) {
    //   nuxt.hook('nitro:init', nitro => {
    //     nitro.options.scanDirs = []
    //   })
    // }
  ],
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
