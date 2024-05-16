import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "COSS",
  description: "coss im",
  locales: {
    root: {
      label: 'English',
      lang: 'en', // optional, will be added  as `lang` attribute on `html` tag
      themeConfig: {
        siteTitle: 'COSS',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Documentation', link: '/what' }
        ],

        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'What is COSS?', link: '/what' },
              { text: 'Real-time Communication', link: '/real-time' },
              { text: 'End-to-End Encryption', link: '/encryption' },
              { text: 'Distributed', link: '/distributed' },
              { text: 'High Concurrency', link: '/high-concurrency' },
            ]
          }
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/cossim' }
        ]
  }
    },
    zh: {
      label: '简体中文',
      lang: 'zh', // optional, will be added  as `lang` attribute on `html` tag
      link: '/zh/', // default /fr/ -- shows on navbar translations menu, can be external
      themeConfig: {
        siteTitle: 'COSS',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '文档', link: '/zh/what' }
        ],
    
        sidebar: [
          {
            text: '介绍',
            items: [
              { text: '什么是COSS？', link: '/zh/what' },
              { text: '实时通信', link: '/zh/real-time' },
              { text: '端到端加密', link: '/zh/encryption' },
              { text: '分布式', link: '/zh/distributed' },
              { text: '高并发', link: '/zh/high-concurrency' },
            ]
          }
        ],
    
        socialLinks: [
          { icon: 'github', link: 'https://github.com/cossim' }
        ]
      }
    }
  }
})
