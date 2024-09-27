<template>
  <footer class="bg-dark text-white mt-5">
    <section class="container py-4">
      <section class="row">
        <article class="col-md-4">
          <h5>Sobre o Pokebox</h5>
          <p>
            Pokebox é o lugar perfeito para os treinadores encontrarem informações e curiosidades
            sobre seus Pokémons favoritos.
          </p>
        </article>

        <article class="col-md-4">
          <h5>Links Úteis</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white">Início</router-link></li>
            <li><router-link to="/" class="text-white">Pokémons</router-link></li>
            <li><router-link to="/" class="text-white">Tipos</router-link></li>
            <li><router-link to="/" class="text-white">Contato</router-link></li>
          </ul>
        </article>

        <article class="col-md-4">
          <h5>Siga-nos</h5>
          <router-link to="#" class="text-white me-3"><i class="bi bi-facebook"></i></router-link>
          <router-link to="#" class="text-white me-3"><i class="bi bi-twitter-x"></i></router-link>
          <router-link to="#" class="text-white me-3"><i class="bi bi-instagram"></i></router-link>
          <router-link to="#" class="text-white me-3"><i class="bi bi-youtube"></i></router-link>
        </article>
      </section>

      <hr class="bg-light" />

      <section class="text-center py-3">
        <p>&copy; 2024 Pokebox. Todos os direitos reservados.</p>
      </section>
    </section>
  </footer>
</template>
<style>
footer {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
