<script setup>
import AppCard from '../components/pokemon/AppCard.vue';
import AppListPokemons from '../components/pokemon/AppListPokemons.vue'
</script>

<template>
  <section class="container pt-4">
    <div class="d-flex justify-content-between flex-sm-column flex-md-row gap-3">
      <AppCard />
      <AppListPokemons/>
    </div>
  </section>
</template>
