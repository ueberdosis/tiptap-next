context('/demos/Examples/Default/Vue', () => {
  before(() => {
    cy.visit('/demos/Examples/Default/Vue')
  })

  beforeEach(() => {
    cy.get('.ProseMirror').then(([{ editor }]) => {
      editor.commands.setContent('<h1>Example Text</h1>')
      cy.get('.ProseMirror').type('{selectall}')
    })
  })

  it('should apply the paragraph style when the keyboard shortcut is pressed', () => {
    cy.get('.ProseMirror h1').should('exist')
    cy.get('.ProseMirror p').should('not.exist')

    cy.get('.ProseMirror')
      .trigger('keydown', { modKey: true, altKey: true, key: '0' })
      .find('p')
      .should('contain', 'Example Text')
  })

  it.only('keeps line breaks from pasted plain text', () => {
    const text = `Paragraph 1
Paragraph 1

Paragraph 2`
    const html = '<p>Paragraph 1<br />Paragraph 1</p><p>Paragraph 2</p>'

    cy.get('.ProseMirror').paste({ pastePayload: text, pasteType: 'text/plain' })

    cy.get('.ProseMirror').then(([{ editor }]) => {
      expect(editor.getHTML()).to.eq(html)
    })
  })
})
