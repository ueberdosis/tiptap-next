import {
  Command,
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/core'

export interface StrikeOptions {
  HTMLAttributes: {
    [key: string]: any
  },
}

export const inputRegex = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))$/gm
export const pasteRegex = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))/gm

export const Strike = Mark.create({
  name: 'strike',

  defaultOptions: <StrikeOptions>{
    HTMLAttributes: {},
  },

  parseHTML() {
    return [
      {
        tag: 's',
      },
      {
        tag: 'del',
      },
      {
        tag: 'strike',
      },
      {
        style: 'text-decoration=line-through',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['s', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      /**
       * Set a strike mark
       */
      setStrike: (): Command => ({ commands }) => {
        return commands.setMark('strike')
      },
      /**
       * Toggle a strike mark
       */
      toggleStrike: (): Command => ({ commands }) => {
        return commands.toggleMark('strike')
      },
      /**
       * Unset a strike mark
       */
      unsetStrike: (): Command => ({ commands }) => {
        return commands.unsetMark('strike')
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-x': () => this.editor.commands.toggleStrike(),
    }
  },

  addInputRules() {
    return [
      markInputRule(inputRegex, this.type),
    ]
  },

  addPasteRules() {
    return [
      markPasteRule(inputRegex, this.type),
    ]
  },
})

declare module '@tiptap/core' {
  interface AllExtensions {
    Strike: typeof Strike,
  }
}
