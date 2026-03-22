import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Where can I go?',
        short_name: 'WhereCan I Go',
        description: 'Instantly check visa requirements for Nepal passport holders across 195+ countries.',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json}'],
        navigateFallback: 'index.html'
      }
    })
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          content: [
            `${__dirname}/index.html`,
            `${__dirname}/src/**/*.{js,jsx}`,
          ],
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                brand: {
                  50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6',
                  600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
                }
              }
            }
          },
          plugins: [],
        }),
        autoprefixer(),
      ]
    }
  },
})
