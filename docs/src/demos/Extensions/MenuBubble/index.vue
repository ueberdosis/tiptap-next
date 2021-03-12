<template>
  <div>
    <div ref="bubbleMenu">
      <div v-if="editor">
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
          bold
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
          italic
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
          strike
        </button>
        <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
          code
        </button>
      </div>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import { defaultExtensions } from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import MenuBubble from '@tiptap/extension-menu-bubble'

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    const { bubbleMenu } = this.$refs
    this.editor = new Editor({
      extensions: [
        ...defaultExtensions(),
        Document,
        Paragraph,
        Text,
        MenuBubble.configure({
          menuEl: bubbleMenu,
          xOffset: 0,
          yOffset: -10,
        }),
      ],
      content: `
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English</p>
      `,
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>