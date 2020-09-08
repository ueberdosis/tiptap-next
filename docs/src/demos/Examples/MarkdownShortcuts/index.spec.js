context('/examples/markdown-shortcuts', () => {
  beforeEach(() => {
    cy.visit('/examples/markdown-shortcuts')

    cy.get('.ProseMirror').window().then(window => {
      const { editor } = window
      editor.clearContent()
    })
  })

  describe('headlines', () => {
    it('should make a h1', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('# Headline', {force: true})
          .contains('h1', 'Headline')
      })
    })

    it('should make a h2', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('## Headline', {force: true})
          .contains('h2', 'Headline')
      })
    })

    it('should make a h3', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('### Headline', {force: true})
          .contains('h3', 'Headline')
      })
    })

    it('should make a h4', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('#### Headline', {force: true})
          .contains('h4', 'Headline')
      })
    })

    it('should make a h5', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('##### Headline', {force: true})
          .contains('h5', 'Headline')
      })
    })

    it('should make a h6', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('###### Headline', {force: true})
          .contains('h6', 'Headline')
      })
    })
  })

  describe('code', () => {
    it('should create inline code', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('`$foobar`', {force: true})
          .contains('code', '$foobar')
      })
    })
  })

  describe('code block', () => {
    it.skip('should create a code block without language', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('``` {enter}const foo = bar{enter}```', {force: true})
          .contains('pre', 'const foo = bar')
      })
    })
  })

  describe('bullet list', () => {
    it.skip('should create a bullet list from asteriks', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('* foobar', {force: true})
          .contains('ul', 'foobar')
      })
    })

    it.skip('should create a bullet list from dashes', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('- foobar', {force: true})
          .contains('ul', 'foobar')
      })
    })

    it.skip('should create a bullet list from pluses', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
          .type('+ foobar', {force: true})
          .contains('ul', 'foobar')
      })
    })
  })

  describe('ordered list', () => {
    it.skip('should create a ordered list', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
        .type('1. foobar', {force: true})
        .contains('ol', 'foobar')
      })
    })
  })

  describe('blockquote', () => {
    it.skip('should create a blockquote', () => {
      cy.get('.ProseMirror').window().then(window => {
        cy.get('.ProseMirror')
        .type('> foobar', {force: true})
        .contains('blockquote', 'foobar')
      })
    })
  })
})