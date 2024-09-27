<script setup>
import { onMounted, reactive } from 'vue'
import AppPokemon from './AppPokemon.vue'

let pokemons = reactive({ list: [] })

onMounted(() => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    .then((response) => response.json())
    .then((response) => {
      pokemons.list = response.results
    })
})
</script>

<template>
    <section class="card">
      <article class="card-body row">
          <AppPokemon
            v-for="pokemon in pokemons.list"
            :key="pokemon.name"
            :name="pokemon.name"
          />
      </article>
    </section>
</template>
