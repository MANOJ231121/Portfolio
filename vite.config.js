import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    base: '/Portfolio/',
    server: {
      watch: {
        // Large video files in /public are served statically; watching them
        // causes EBUSY crashes on Windows while the file is being written.
        ignored: ['**/public/video/**'],
      },
    },
})
