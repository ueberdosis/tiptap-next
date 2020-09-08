context('/examples/history', () => {
  beforeEach(() => {
    cy.visit('/examples/history')
  })

  describe('undo', () => {
    it('should not have a mistake', () => {
      cy.get('.ProseMirror').window().then(window => {
        const { editor } = window
        const html = editor.html()

        cy.get('.ProseMirror h2:first').should('not.contain', 'Mistake')
      })
    })

    it('should have a mistake', () => {
      cy.get('.ProseMirror').window().then(window => {
        const { editor } = window
        const html = editor.html()

        editor.insertText('Mistake')
        cy.get('.ProseMirror h2:first').should('contain', 'Mistake')
      })
    })

    it('the mistake should be removed again', () => {
      cy.get('.ProseMirror').window().then(window => {
        const { editor } = window
        const html = editor.html()

        editor.undo()
        cy.get('.ProseMirror h2:first').should('not.contain', 'Mistake')
      })
    })
  })
})