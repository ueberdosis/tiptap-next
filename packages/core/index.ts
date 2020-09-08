import { Editor, CommandSpec } from './src/Editor'

export default Editor
export { Editor, CommandSpec }
export { default as ComponentRenderer } from './src/ComponentRenderer'
export { default as Extension } from './src/Extension'
export { default as Node } from './src/Node'
export { default as Mark } from './src/Mark'

export { default as capitalize } from './src/utils/capitalize'

export { default as markInputRule } from './src/inputRules/markInputRule'
export { default as markPasteRule } from './src/pasteRules/markPasteRule'