<script setup>
import AppCard from '../components/pokemon/AppCard.vue'
import AppListPokemons from '../components/pokemon/AppListPokemons.vue'
</script>

<template>
  <section class="container pt-4">
    <div class="row">
      <section class="col-sm-12 col-md-6">
        <AppCard />
      </section>
      <section class="col-sm-12 col-md-6">
        <AppListPokemons />
      </section>
    </div>
  </section>
</template>
