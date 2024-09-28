# Pokébex

## Descrição

Pokédex é uma aplicação web que funciona como uma Pokédex, permitindo aos usuários pesquisar, visualizar e filtrar informações sobre os Pokémon. A aplicação utiliza a PokeAPI para obter dados sobre os Pokémon.

##📌Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript para construir interfaces de usuário.
- **Vite**: Ferramenta de build rápida para aplicações web.
- **Bootstrap**: Framework CSS para estilização responsiva.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vitest**: Framework de testes para o Vue.
- **Vue Test Utils**: Biblioteca oficial para testar componentes Vue.

##🕹️Funcionalidades Requeridas

1. **Listagem de Pokémon**:

   - Exibir uma **lista paginada** de Pokémon com imagens, nomes e números.
   - Cada item deve mostrar a **imagem**, **nome** e **número** do Pokémon.
   - Implementar paginação para navegar entre os Pokémon (pode ser paginação clássica ou scroll infinito).

2. **Detalhes do Pokémon**:

   - Ao selecionar um Pokémon, mostrar informações detalhadas, incluindo:
     - **Estatísticas**: HP, Attack, Defense, Special Attack, Special Defense e Speed.
     - **Tipos**: Exibir os tipos com cores correspondentes.
     - **Evoluções**: Mostrar a cadeia de evolução com imagens e nomes.

3. **Busca e Filtro**:

   - **Busca por Nome ou Número**:
     - Implementar uma barra de busca que permite ao usuário pesquisar pelo **nome** ou **número** do Pokémon.
     - Exibir resultados em tempo real ou ao submeter a pesquisa.
   - **Filtro por Tipo**:
     - Permitir que o usuário selecione um ou mais **tipos** para filtrar a lista de Pokémon (água, fogo, grama, etc.).
     - Atualizar a listagem conforme os filtros aplicados.

4. **Responsividade e Desempenho**:
   - A aplicação deve ser **responsiva** e funcionar bem em dispositivos móveis e desktops.
   - **Não esqueça da otimização de velocidade da aplicação nem da experiência do usuário.**

##🚧 Status do Projeto

Atualmente, a aplicação está em fase inicial. Já foi realizada a organização do layout principal, incluindo o header e o footer, e a renderização desses componentes foi testada.

##🧩 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/devluanpaiva/pokedex.git

   ```

2. Navegue até o diretório:

```sh
cd pokedex

```

3. Instale as dependências:

```bash
npm install
# ou
yarn install
```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
5. Abra o navegador e acesse `http://localhost::5173`.

##🔬 Testes

### Teste a aplicação com [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Rode testes End-to-End com [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

Isso executa os testes ponta a ponta no servidor de desenvolvimento Vite.
É muito mais rápido que a construção de produção.

Mas ainda é recomendado testar a compilação de produção com `test:e2e` antes da implantação (por exemplo, em ambientes de CI):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

##✍️ Contribuições
Sinta-se à vontade para contribuir com este projeto. Sugestões, correções de bugs e melhorias são sempre bem-vindas. Por favor, siga o fluxo de trabalho do Git Flow para submissão de pull requests.
