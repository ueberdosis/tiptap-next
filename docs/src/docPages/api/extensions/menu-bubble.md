# Menu Bubble
[![Version](https://img.shields.io/npm/v/@tiptap/extension-menu-bubble.svg?label=version)](https://www.npmjs.com/package/@tiptap/extension-menu-bubble)
[![Downloads](https://img.shields.io/npm/dm/@tiptap/extension-menu-bubble.svg)](https://npmcharts.com/compare/@tiptap/extension-menu-bubble?minimal=true)

This extension will make a contextual menu appear near a selection of text.

## Installation
```bash
# with npm
npm install @tiptap/extension-menu-bubble

# with Yarn
yarn add @tiptap/extension-menu-bubble
```

## Settings
| Option   | Type          | Default   | Description                                                           |
| ---------| ------------- | --------- | --------------------------------------------------------------------- |
| menuEl   | `HTMLElement` | `null`    | $ref to html element containing menu options.                         |
| xOffset  | `Number`      | `0`       | Positive or negative number to offset horizontal alignment.           |
| yOffset  | `Number`      | `0`       | Positive or negative number to offset vertical alignment.             |

## Source code
[packages/extension-menu-bubble/](https://github.com/ueberdosis/tiptap-next/blob/main/packages/extension-menu-bubble/)

## Usage
<demo name="Extensions/MenuBubble" />