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
    yOffset: -36,
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

    const start = editor.view.coordsAtPos(from);
    const end = editor.view.coordsAtPos(to);

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