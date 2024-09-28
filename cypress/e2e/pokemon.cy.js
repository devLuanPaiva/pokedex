/// <reference types="cypress" />

describe('Pokemon Selection', () => {
  beforeEach(() => {
    // Visita a página inicial ou a página onde os Pokémon são listados
    cy.visit('http://localhost:4173') // Ajuste a URL se necessário
  })

  it('should render the selected Pokémon in AppCard when clicked', () => {
    // Seleciona um Pokémon pelo seu nome (ajuste o seletor conforme necessário)
    const pokemonName = 'pikachu' // Altere para o nome do Pokémon que você deseja testar
    const pokemonId = 25
    cy.get('.card').contains(pokemonName).click({ force: true }) // Força o clique, mesmo que o elemento esteja coberto

    // Verifica se o AppCard foi atualizado com o Pokémon selecionado
    cy.get('.card').should('be.visible') // Verifica se o AppCard está visível

    // Verifica se a imagem do Pokémon está correta
    cy.get('.card img')
      .should('have.attr', 'src')
      .and('include', `official-artwork/${pokemonId}.png`)

    // Verifica se o nome do Pokémon está sendo exibido corretamente
    cy.get('.card h2').contains(pokemonName)
  })
})
