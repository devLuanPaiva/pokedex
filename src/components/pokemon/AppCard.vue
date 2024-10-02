<script setup>
import { ref, watch, onMounted } from 'vue'
import { usePokemonStore } from '../../stores/usePokemonStore'

const pokemonStore = usePokemonStore()
const pokemonImage = ref('')
const pokemonStats = ref([])
const pokemonTypes = ref([])
const pokemonEvolutionChain = ref([])
const pokemonNumber = ref(null)

const fetchPokemonData = async (name) => {
  try {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemonData = await pokemonResponse.json()

    pokemonNumber.value = pokemonData.id
    pokemonImage.value = pokemonData.sprites.other['official-artwork'].front_default
    pokemonStats.value = pokemonData.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat
    }))

    pokemonTypes.value = pokemonData.types.map((type) => ({
      name: type.type.name,
      color: getColorForType(type.type.name)
    }))

    const speciesResponse = await fetch(pokemonData.species.url)
    const speciesData = await speciesResponse.json()

    const evolutionChainResponse = await fetch(speciesData.evolution_chain.url)
    const evolutionChainData = await evolutionChainResponse.json()

    let currentEvolution = evolutionChainData.chain
    const evolutions = []
    do {
      const evolutionName = currentEvolution.species.name
      const evolutionDataResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${evolutionName}`
      )
      const evolutionData = await evolutionDataResponse.json()
      evolutions.push({
        name: evolutionName,
        sprite: evolutionData.sprites.other['official-artwork'].front_default
      })
      currentEvolution = currentEvolution.evolves_to[0]
    } while (currentEvolution)

    pokemonEvolutionChain.value = evolutions
  } catch (error) {
    console.error('Erro ao buscar dados do Pokémon:', error)
  }
}

const getColorForType = (type) => {
  const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030'
  }
  return typeColors[type] || '#000'
}

watch(
  () => pokemonStore.selectedPokemon,
  (newPokemon) => {
    if (newPokemon) {
      fetchPokemonData(newPokemon)
    }
  }
)

onMounted(() => {
  if (pokemonStore.selectedPokemon) {
    fetchPokemonData(pokemonStore.selectedPokemon)
  }
})

const toggleFavorite = () => {
  if (pokemonStore.selectedPokemon) {
    pokemonStore.toggleFavorites(pokemonStore.selectedPokemon)
  }
}
const isFavorite = () => {
  if (pokemonStore.selectedPokemon) {
    return pokemonStore.isFavorite(pokemonStore.selectedPokemon)
}
  return false;
}
</script>

<template>
  <div v-if="pokemonStore.selectedPokemon">
    <article class="card pokemon-card shadow-lg">
      <header class="d-flex justify-content-between align-items-center">
        <h2 class="text-center text-primary ">{{ pokemonStore.selectedPokemon }}</h2>
        <i :class="isFavorite() ? 'fas fa-heart text-danger' : 'far fa-heart'" @click="toggleFavorite"
          style="cursor: pointer; font-size: 1.5rem;" title="Favoritar Pokémon"></i>
      </header>
      <img :src="pokemonImage" class="card-img-top rounded pokemon-img" alt="pokemon" />

      <div class="text-center mt-2">
        <span v-for="type in pokemonTypes" :key="type.name" :style="{ backgroundColor: type.color }"
          class="badge m-1 pokemon-type">
          {{ type.name }}
        </span>
      </div>

      <h5 class="mt-3 text-secondary">Estatísticas</h5>
      <ul class="list-group list-group-flush">
        <li v-for="stat in pokemonStats" :key="stat.name" class="list-group-item pokemon-stat-item">
          <div class="d-flex justify-content-between align-items-center">
            <span>{{ stat.name }}</span>
            <span class="badge bg-info">{{ stat.value }}</span>
          </div>
          <div class="progress mt-2">
            <span class="progress-bar bg-success" role="progressbar" :style="{ width: (stat.value / 250) * 100 + '%' }"
              :aria-valuenow="stat.value" aria-valuemin="0" aria-valuemax="250"></span>
          </div>
        </li>
      </ul>

      <section v-if="pokemonEvolutionChain.length > 0" class="mt-3 text-center">
        <h5 class="text-warning">Cadeia de Evolução:</h5>
        <div class="d-flex justify-content-center">
          <figure v-for="evolution in pokemonEvolutionChain" :key="evolution.name" class="mx-2">
            <img :src="evolution.sprite" alt="evolution" width="60" height="60" class="rounded-circle shadow-sm" />
            <figcaption>{{ evolution.name }}</figcaption>
          </figure>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.pokemon-card {
  border-radius: 1rem;
  padding: 1rem;
  background-color: #f7f9fc;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.pokemon-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 0 auto;
  display: block;
  transition: transform 0.2s;
}

.pokemon-img:hover {
  transform: scale(1.05);
}

.pokemon-type {
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 1rem;
  text-transform: capitalize;
}

.pokemon-stat-item {
  border: none;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
}

.pokemon-stat-item:hover {
  background-color: #e9ecef;
}

.progress {
  height: 8px;
  border-radius: 5px;
}

.progress-bar {
  transition: width 0.4s;
}

.badge.bg-info {
  background-color: #17a2b8;
}

.badge.bg-success {
  background-color: #28a745;
}

.text-center {
  text-transform: uppercase;
}
</style>
