import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

describe('editor', () => {
  it('sets an initial content from HTML', () => {
    const editor = new Editor({
      content: '<p>Example Text</p>',
      extensions: [
        Document(),
        Paragraph(),
        Text(),
      ],
    })

    expect(editor.html()).to.eq('<p>Example Text</p>')
  })
})