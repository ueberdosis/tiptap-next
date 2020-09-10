import { Editor, CommandSpec } from './src/Editor'

export default Editor
export { Editor, CommandSpec }
export { default as ComponentRenderer } from './src/ComponentRenderer'
export { default as Extension } from './src/Extension'
export { default as Node } from './src/Node'
export { default as Mark } from './src/Mark'
export { Extensions } from './src/types'

export { default as markInputRule } from './src/inputRules/markInputRule'
export { default as markPasteRule } from './src/pasteRules/markPasteRule'

export { default as getSchema } from './src/utils/getSchema'
export { default as generateHtml } from './src/utils/generateHtml'
export { default as getHtmlFromFragment } from './src/utils/getHtmlFromFragment'
export { default as getTopNodeFromExtensions } from './src/utils/getTopNodeFromExtensions'
export { default as getNodesFromExtensions } from './src/utils/getNodesFromExtensions'
export { default as getMarksFromExtensions } from './src/utils/getMarksFromExtensions'
