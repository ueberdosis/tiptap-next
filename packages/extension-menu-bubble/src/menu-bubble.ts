import {
  Extension,
} from '@tiptap/core'

export interface MenuBubbleOptions {
  menuEl: HTMLElement | null,
  xOffset: number,
  yOffset: number,
  isActive: boolean,
  keepInBounds: boolean,
}

type DOMRectSide = "bottom" | "left" | "right" | "top";

function textRange(node: Node, from?: number, to?: number) {
  const range = document.createRange();
  range.setEnd(
    node,
    typeof to === "number" ? to : (node.nodeValue || "").length
  );
  range.setStart(node, from || 0);
  return range;
}

function singleRect(object: Range | Element, bias: number) {
  const rects = object.getClientRects();
  return !rects.length
    ? object.getBoundingClientRect()
    : rects[bias < 0 ? 0 : rects.length - 1];
}

// @ts-ignore
function coordsAtPos(view: EditorView, pos: number, end = false) {
  const { node, offset } = view.domAtPos(pos); //view.docView.domFromPos(pos);
  let side: DOMRectSide | null = null;
  let rect: DOMRect | null = null;

  if (node.nodeType === 3) {
    const nodeValue = node.nodeValue || "";
    if (end && offset < nodeValue.length) {
      rect = singleRect(textRange(node, offset - 1, offset), -1);
      side = "right";
    } else if (offset < nodeValue.length) {
      rect = singleRect(textRange(node, offset, offset + 1), -1);
      side = "left";
    }
  } else if (node.firstChild) {
    if (offset < node.childNodes.length) {
      const child = node.childNodes[offset];
      rect = singleRect(
        child.nodeType === 3 ? textRange(child) : (child as Element),
        -1
      );
      side = "left";
    }

    if ((!rect || rect.top === rect.bottom) && offset) {
      const child = node.childNodes[offset - 1];
      rect = singleRect(
        child.nodeType === 3 ? textRange(child) : (child as Element),
        1
      );
      side = "right";
    }
  } else {
    const element = node as Element;
    rect = element.getBoundingClientRect();
    side = "left";
  }

  if (rect && side) {
    const x = rect[side];
    return {
      top: rect.top - rect.height,
      bottom: rect.bottom,
      left: x,
      right: x,
    };
  }

  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
}

function hide(options: MenuBubbleOptions) {
  if (!options.menuEl) {
    return;
  }
  
  const attrs = {
    position: "absolute",
    left: "-100000px",
  }
  options.isActive = false;
  Object.assign(options.menuEl.style, attrs)
}


export const MenuBubble = Extension.create<MenuBubbleOptions>({
  name: 'menuBubble',

  defaultOptions: {
    menuEl: null,
    xOffset: 0,
    yOffset: 0,
    isActive: false,
    keepInBounds: true,
  },

  onCreate() {
    hide(this.options)
  },

  onSelectionUpdate() {
    const { editor, options } = this
    const { from, to } = editor.state.selection

    if (editor.state.selection.empty) {
      hide(options);
      return;
    }

    const start = coordsAtPos(editor.view, from);
    const end = coordsAtPos(editor.view, to, true);

    if (!options.menuEl) {
      return;
    }

    const parent = options.menuEl ? options.menuEl.offsetParent : null;

    if (!parent) {
      hide(options);
      return;
    }

    const box = parent.getBoundingClientRect();
    const el = options.menuEl.getBoundingClientRect();
    const left = (start.left + end.left) / 2 - options.menuEl.offsetWidth / 2;

    const attrs = {
      position: "absolute",
      zIndex: 1000,
      display: "block",
      left: options.xOffset + left + "px",
      top: options.yOffset + start.top + "px",
    }
    options.isActive = true;
    Object.assign(options.menuEl.style, attrs)
  },

})