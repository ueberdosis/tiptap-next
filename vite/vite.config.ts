// @ts-nocheck
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import globby from 'globby'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: globby.sync('../packages/*', { onlyDirectories: true })
      .map(name => name.replace('../packages/', ''))
      .map(name => {
        return [
          {
            find: `@tiptap/${name}`,
            replacement: path.resolve(`../packages/${name}/src/index.ts`),
          },
          {
            find: `/@tiptap/${name}`,
            replacement: path.resolve(`../packages/${name}/src/index.ts`),
          },
        ]
      }).flat(),
  },
})
