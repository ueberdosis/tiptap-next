<template>
  <div>
    <div id="demo" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import postscribe from 'postscribe'

export default defineComponent({
  name: 'App',
  mounted() {
    postscribe('#demo', `
      <div class="element"></div>

      <script type="module">
        /*
         Doesn‘t work: Loading packages through Vite
        */
        /*
        import { Editor } from '/@tiptap/core'
        import { Document } from '/@tiptap/extension-document'
        import { Paragraph } from '/@tiptap/extension-paragraph'
        import { Text } from '/@tiptap/extension-text'
        */

       /*
        Does work: Proxy.ts loads packages from the node_modules folder
       */
       import { Editor, Document, Paragraph, Text } from './src/Proxy.ts'

        const editor = new Editor({
          element: document.querySelector('.element'),
          extensions: [
            Document,
            Paragraph,
            Text,
          ],
          content: '<p>Your content.</p>',
        })
      <\/script>
  `)
  },
})
</script>
