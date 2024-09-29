<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import AppPokemonItem from './AppPokemonItem.vue'

let pokemons = reactive({ list: [] })
let searchTerm = ref('')
let filteredPokemons = ref([])
let selectedType = ref('')

const getColorForType = (type) => {
  const colors = {
    grass: '#78C850',
    fire: '#F08030',
    water: '#6890F0',
    normal: '#A8A878',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    poison: '#A040A0',
    bug: '#A8B820',
    dragon: '#7038F8',
    ice: '#98D8D8',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898'
  }
  return colors[type] || '#FFFFFF' 
}

const fetchPokemonDetails = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await response.json()
  return {
    name: data.name,
    types: data.types.map((type) => ({
      name: type.type.name,
      color: getColorForType(type.type.name)
    }))
  }
}

const fetchAllPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=300&offset=0')
  const data = await response.json()
  const pokemonPromises = data.results.map((pokemon) => fetchPokemonDetails(pokemon.name))
  pokemons.list = await Promise.all(pokemonPromises)
  filteredPokemons.value = pokemons.list 
}

onMounted(fetchAllPokemons)

watch(searchTerm, (newTerm) => {
  filterPokemons(newTerm, selectedType.value)
})

watch(selectedType, (newType) => {
  filterPokemons(searchTerm.value, newType)
})

const filterPokemons = (term, type) => {
  let filtered = pokemons.list

  if (type) {
    filtered = filtered.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().startsWith(term.toLowerCase()) &&
        pokemon.types.some((t) => t.name === type)
    )
  } else {
    filtered = filtered.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(term.toLowerCase())
    )
  }

  filteredPokemons.value = filtered
}
</script>

<template>
    <section class="filters">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Digite a inicial do Pokémon"
        class="search-input"
      />
      <select v-model="selectedType" class="dropdown">
        <option selected value="" class="btn btn-secondary dropdown-toggle"> Filtrar</option>
        <option  value=""> Todos</option>
        <option value="grass">Grass</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="normal">Normal</option>
        <option value="electric">Electric</option>
        <option value="ground">Ground</option>
        <option value="fairy">Fairy</option>
        <option value="poison">Poison</option>
        <option value="bug">Bug</option>
        <option value="dragon">Dragon</option>
        <option value="ice">Ice</option>
        <option value="fighting">Fighting</option>
        <option value="psychic">Psychic</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
      </select>
    </section>
    <section class="pokemon-list row">
      <AppPokemonItem
        v-for="pokemon in filteredPokemons"
        :key="pokemon.name"
        :name="pokemon.name"
        class="pokemon-card"
      />
      <p v-if="filteredPokemons.length === 0" class="no-results">Nenhum Pokémon encontrado.</p>
    </section>
</template>

<style scoped>
.search-input {
  padding: 10px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 400px;
  border: 2px solid #008cba;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #005f7f;
  outline: none;
}

.dropdown {
  padding: 10px;
  margin-left: 10px;
  border-radius: 5px;
  border: 2px solid #008cba;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.3s;
  height: 47.56px;
}

.dropdown:hover {
  border-color: #005f7f;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.pokemon-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.no-results {
  font-size: 18px;
  color: #ff4500;
  margin-top: 20px;
}

.filters {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 5px;
}
</style>
