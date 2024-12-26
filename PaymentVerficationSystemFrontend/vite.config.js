import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // Import path module

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.PNG', '**/*.JPG'], // Add .JPG to the list
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Set '@' to point to the 'src' directory
    }
  }
})
