context('/demos/Marks/Code', () => {
  before(() => {
    cy.visit('/demos/Marks/Code')
  })

  beforeEach(() => {
    cy.get('.ProseMirror').then(([{ editor }]) => {
      editor.commands.setContent('<p>Example Text</p>')
      cy.get('.ProseMirror').type('{selectall}')
    })
  })

  it('should parse code tags correctly', () => {
    cy.get('.ProseMirror').then(([{ editor }]) => {
      editor.commands.setContent('<p><code>Example Text</code></p>')
      expect(editor.getHTML()).to.eq('<p><code>Example Text</code></p>')

      editor.commands.setContent('<code>Example Text</code>')
      expect(editor.getHTML()).to.eq('<p><code>Example Text</code></p>')
    })
  })

  it('should mark the selected text as inline code', () => {
    cy.get('button:first')
      .click()

    cy.get('.ProseMirror')
      .find('code')
      .should('contain', 'Example Text')
  })

  it('should toggle the selected text as inline code', () => {
    cy.get('button:first')
      .click()

    cy.get('.ProseMirror')
      .type('{selectall}')

    cy.get('button:first')
      .click()

    cy.get('.ProseMirror code')
      .should('not.exist')
  })

  it('should make the selected text bold when the keyboard shortcut is pressed', () => {
    cy.get('.ProseMirror')
      .trigger('keydown', { modKey: true, key: 'e' })
      .find('code')
      .should('contain', 'Example Text')
  })

  it('should toggle the selected text bold when the keyboard shortcut is pressed', () => {
    cy.get('.ProseMirror')
      .trigger('keydown', { modKey: true, key: 'e' })
      .find('code')
      .should('contain', 'Example Text')

    cy.get('.ProseMirror')
      .trigger('keydown', { modKey: true, key: 'e' })

    cy.get('.ProseMirror code').should('not.exist')
  })

  it('should make inline code from the markdown shortcut', () => {
    cy.get('.ProseMirror')
      .type('`Example`')
      .find('code')
      .should('contain', 'Example')
  })

  it.only('leaves the inline code mark with keyboard shortcut', () => {
    cy.get('.ProseMirror').then(([{ editor }]) => {
      editor.commands.clearContent()

      cy.get('.ProseMirror')
        .type('`Example`{leftarrow}{rightarrow}')
        .trigger('keydown', { shiftKey: true, key: 'Enter' })
        .type('Text')
        .find('code')
        .should('contain', 'Example')
        .should('not.contain', 'ExampleText')
    })
  })
})
