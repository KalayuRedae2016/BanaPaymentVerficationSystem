import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.PNG', '**/*.JPG'], // Add .JPG to the list
  plugins: [vue()],
})
