<script setup>
import { onMounted, reactive } from 'vue'

let pokemons = reactive({list:[]})

onMounted(() => {
    console.log('mo')
  fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    .then((response) => response.json())
    .then(response => {
        pokemons.list = response.results
    })
})
</script>

<template>
    <div>
      <h2>List of Pokémons (Limited to 151)</h2>
      <article class="card" style="width: 18rem;">
        <ul>
          <li v-for="pokemon in pokemons.list" :key="pokemon.name">
            {{ pokemon.name }}
          </li>
        </ul>
      </article>
    </div>
  </template>
  
