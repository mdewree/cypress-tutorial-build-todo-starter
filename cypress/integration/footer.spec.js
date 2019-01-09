describe('Footer', () => {
    context('With a single todo', () => {
        it('displays a singular todo in count', () => {
            cy.seedAndVisit([{ id: 1, name: 'Buy Milk', isComplete: false }]);
            cy.get('.todo-count')
                .should('contain', '1 todos left');
        })
    })

    context('With multiple todos', () => {
        beforeEach(() => {
            cy.seedAndVisit();
        })
        it('displays plural todos in count', () => {
            cy.get('.todo-count')
                .should('contain', '3 todos left');
        })
        it.only('filters to active todos', () => {
            const filters = [
                { link: 'Active', expectedLength: 4 },
                { link: 'Completed', expectedLength: 4 },
                { link: 'All', expectedLength: 4 }
            ];
            cy.wrap(filters)
                .each(filter => {
                    cy.contains(filter.link)
                        .click();
                    cy.get('.todo-list li')
                        .should('have.length', filter.expectedLength);
                })
        })

    })
})