import { generateHtml } from '@tiptap/html'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

const html = generateHtml({
  'type': 'document',
  'content': [{
    'type': 'paragraph',
    'attrs': {
      'align': 'left'
    },
    'content': [{
      'type': 'text',
      'text': 'Example Text'
    }]
  }]
}, [
  new Document(),
  new Paragraph(),
  new Text(),
])