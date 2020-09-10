export default function createStyleTag(style: string): HTMLElement {
  const styleNode = document.createElement('style')

  styleNode.innerHTML = style
  document.getElementsByTagName('head')[0].appendChild(styleNode)

  return styleNode
}