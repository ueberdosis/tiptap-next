context('/examples/basic', () => {
  before(() => {
    cy.visit('/examples/basic')
  })

  beforeEach(() => {
    cy.get('.ProseMirror').then(([{ editor }]) => {
      editor.commands.setContent('<h1>Example Text</h1>')
      editor.commands.selectAll()
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

  it.only('transforms bullet lists to headings', () => {
    cy.get('.ProseMirror').then(([{ editor }]) => {
      editor.commands.setContent('<p>Paragraph</p><ul><li>List item</li></ul>')
      editor.commands.selectAll()
      editor.commands.setHeading({ level: 1 })

      cy.get('.ProseMirror')
        .find('h1')
        .should('contain', 'Paragraph')

      cy.get('.ProseMirror')
        .find('h1')
        .should('contain', 'List item')
    })
  })
})
