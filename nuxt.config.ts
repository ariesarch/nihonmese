// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  postcss: {
    plugins: {
      'postcss-nesting': {},
      // Other PostCSS plugins can be added here
    },
  },
  css: ['@/assets/css/tailwind.css'],
})
