<script setup>
import AppCard from '../components/pokemon/AppCard.vue'
import AppListPokemons from '../components/pokemon/AppListPokemons.vue'
</script>

<template>
  <section class="container pt-4">
    <div class="row g-4">
      <section class="col-sm-12 col-md-6">
        <AppCard />
      </section>
      <section class="col-sm-12 col-md-6 tableCards ">
        <AppListPokemons />
      </section>
    </div>
  </section>
</template>

<style scoped>
.tableCards {
  max-height: 820.36px;
  overflow-y: scroll;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #f7f9fc;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}
</style>
