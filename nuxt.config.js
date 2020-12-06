export default {
  target: 'static',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Netflix Show Image Generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An easy to use tool for generating high definition Netflix Show Image for A/B testing or Youtube cover image' },
      { hid: 'theme-color', name: 'theme-color', content: '#000' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:image', name: 'og:image', content: 'https://netflix.schrodinger-hat.it/icon.png' },
      { hid: 'og:title', name: 'og:title', content: 'Netflix Show Image Generator' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Netflix Show Image Generator' },
      { hid: 'og:description', name: 'og:description', content: '#An easy to use tool for generating high definition Netflix Show Image for A/B testing or Youtube cover image' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://netflix.schrodinger-hat.it/icon.png' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Netflix Show Image Generator' },
      { hid: 'twitter:description', name: 'twitter:description', content: '#An easy to use tool for generating high definition Netflix Show Image for A/B testing or Youtube cover image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/styles/global.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/konva.client', ssr: false },
    { src: '~/plugins/ga', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
