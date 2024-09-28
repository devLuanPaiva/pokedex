<script setup>
import { onMounted, reactive } from 'vue'
import AppPokemon from './AppPokemon.vue'

let pokemons = reactive({ list: [] })

onMounted(() => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=300&offset=0')
    .then((response) => response.json())
    .then((response) => {
      pokemons.list = response.results
    })
})
</script>

<template>
  <section>
    <article class="pokemon-item row">
      <AppPokemon v-for="pokemon in pokemons.list" :key="pokemon.name" :name="pokemon.name" />
    </article>
  </section>
</template>

<style scoped>

.pokemon-item {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}
</style>
