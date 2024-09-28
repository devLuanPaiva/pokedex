<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import AppPokemon from './AppPokemon.vue'

let pokemons = reactive({ list: [] })
let searchTerm = ref('')
let filteredPokemons = ref([])

onMounted(() => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=300&offset=0')
    .then((response) => response.json())
    .then((response) => {
      pokemons.list = response.results
      filteredPokemons.value = pokemons.list
    })
})

watch(searchTerm, (newTerm) => {
  if (newTerm) {
    filteredPokemons.value = pokemons.list.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(newTerm.toLowerCase())
    )
  } else {
    filteredPokemons.value = pokemons.list
  }
})
</script>

<template>
  <section class="pokemon-section">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Digite a inicial do Pokémon"
      class="search-input"
    />
    <article class="pokemon-item row">
      <AppPokemon
        v-for="pokemon in filteredPokemons"
        :key="pokemon.name"
        :name="pokemon.name"
        class="pokemon-card"
      />
      <p v-if="filteredPokemons.length === 0" class="no-results">Nenhum Pokémon encontrado.</p>
    </article>
  </section>
</template>

<style scoped>
.pokemon-section {
  padding: 20px;
  text-align: center;
  background-color: #f0f8ff;
  border-radius: 10px;
}

.search-input {
  padding: 10px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 400px;
  border: 2px solid #008cba;
  border-radius: 5px;
  font-size: 16px;
}

.pokemon-item {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.pokemon-card {
  transition: transform 0.2s;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.no-results {
  font-size: 18px;
  color: #ff4500;
  margin-top: 20px;
}
</style>
