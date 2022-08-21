import {within} from "@testing-library/react";

describe('offer creation', ()=>{
    const user = 'test'
    const pass = '123'
    const weight = Math.floor(Math.random() * 1000) + 100 + ''
    const price = Math.floor(Math.random() * 50) + 50 + ''
    const sum = weight * price + '.00'
    it('user can create an offer draft', ()=>{
        cy.viewport(1200, 800)
        cy.visit('http://127.0.0.1:8000/')
        cy.findByRole('textbox', {  name: /логин/i}).type(user)
        cy.findByLabelText(/пароль/i).type(pass)
        cy.findByRole('button', {  name: /войти/i}).click()
        const currentUser = cy.findByTitle(/userinfo/i)
        expect(currentUser.contains(user))
        cy.findByRole('link', {  name: /сделки/i}).click()
        cy.findByRole('button', {  name: /\+ добавить предложение/i}).click()
        cy.findByTestId('weight').type(weight)
        cy.findByTestId('impurity').type('5')
        cy.findByTestId('price').type(price)
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const month = tomorrow.getMonth() + 1
        cy.findByTestId('date').type(`${tomorrow.getFullYear()}-${("0" + month)}-${("0" + tomorrow.getDate()).slice(-2)}`)
        cy.intercept('POST', '/api/offers/').as('postOffer')
        cy.intercept('GET', '/api/offers/').as('getOffers')
        cy.findByTestId('add-submit-btn')
            .click()
            .wait('@postOffer')
            .wait('@getOffers')
            .then(async ()=>{
                 await cy.contains(sum).first()
                .parent('tr')
                .within( ()=>{
                    cy.contains(/черновик/i)
                 })
            })
            // .then(async ()=>{
            //      await cy.contains(/16050\.00/i)
            //     .parent('tr')
            //     .within(async ()=>{
            //         // await cy.get('.btn-danger').first().click()
            //         await cy.findByRole('button', { name: /×/i })
            //     })
            // })
        cy.wait(500)
    })
    it('user can edit and send offer', ()=>{
            cy.contains(sum)
            .first()
            .parent('tr')
            .within( ()=>{
                 cy.findByTestId('edit-btn').first().click()
            })
            cy.findByTestId('status-selector').select('sended')
            cy.intercept('PATCH', '/api/offers/*').as('patchOffer')
            cy.findByTestId('send-offer-btn').click()
            cy.wait('@patchOffer')
                .then(()=>{
                    cy.contains(sum).first()
                .parent('tr')
                .within( ()=>{
                    cy.contains(/отправлено/i)
                 })
                })
            cy.wait(500)
        }
    )
})
