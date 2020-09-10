# Schema
Unlike many other editors, tiptap is based on a [schema](https://prosemirror.net/docs/guide/#schema) that defines how your content is structured. That enables you to define the kind of nodes that may occur in the document, its attributes and the way they can be nested.

This schema is *very* strict. You can’t use any HTML element or attribute that is not defined in your schema.

Let me give you one example: If you paste something like `This is <strong>important</strong>` into tiptap, don’t have any extension that handles `strong` tags registered, you’ll only see `This is important` – without the strong tags.

## How a schema looks like

The most simple schema for a typical *ProseMirror* editor is looking something like that:

```js
{
  nodes: {
    document: {
      content: 'block+',
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
    },
    text: {
      group: 'inline',
    },
  },
}
```

:::warning Out of date
This content is written for tiptap 1 and needs an update.
:::

We register three nodes here. `document`, `paragraph` and `text`. `document` is the root node which allows one or more block nodes as children (`content: 'block+'`). Since `paragraph` is in the group of block nodes (`group: 'block'`) our document can only contain paragraphs. Our paragraphs allow zero or more inline nodes as children (`content: 'inline*'`) so there can only be `text` in it. `parseDOM` defines how a node can be parsed from pasted HTML. `toDOM` defines how it will be rendered in the DOM.

In tiptap we define every node in its own `Extension` class instead. This allows us to split logic per node. Under the hood the schema will be merged together.

```js
class Document extends Node {
  name = 'document'
  topNode = true

  schema() {
    return {
      content: 'block+',
    }
  }
}

class Paragraph extends Node {
  name = 'paragraph'

  schema() {
    return {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
    }
  }
}

class Text extends Node {
  name = 'text'

  schema() {
    return {
      group: 'inline',
    }
  }
}
```
