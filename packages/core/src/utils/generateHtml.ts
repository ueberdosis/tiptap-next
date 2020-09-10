import getSchema from './getSchema'
import getHtmlFromFragment from './getHtmlFromFragment'
import { Node } from 'prosemirror-model'
import { Extensions } from '../types'

export default function generateHtml(doc: object, extensions: Extensions): string {
  const schema = getSchema(extensions)
  const contentNode = Node.fromJSON(schema, doc)

  return getHtmlFromFragment(contentNode, schema)
}
