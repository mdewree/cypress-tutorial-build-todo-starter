describe('Input Form', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('focuses input on load', () => {
        cy.focused()
            .should('have.class', 'new-todo');
    })

    it('accepts input', () => {
        const typedText = 'Buy Milk';
        cy.get('.new-todo')
            .type(typedText)
            .should('have.value', typedText);
    })

    context('Form Submission', () => {
        it.only('adds a new todo on submit', () => {
            const itemText = 'Buy Eggs';
            cy.server();
            cy.route('POST', '/api/todos', {
                name: itemText,
                id: 1,
                isComplete: false
            });
            cy.get('.new-todo')
                .type(itemText)
                .type('{enter}')
                .should('have.value', '');
            cy.get('.todo-list li')
                .should('have.length', 1)
                .and('contain', itemText)
        })
    })
})