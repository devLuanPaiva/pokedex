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

// Assistir às mudanças no Pokémon selecionado
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
</script>

<template>
  <div class="" v-if="pokemonStore.selectedPokemon">
    <article class="card m-2">
      <h3 class="text-center">{{ pokemonStore.selectedPokemon }}</h3>
      <img :src="pokemonImage" class="card-img-top" alt="pokemon" />

      Tipos de Pokémon com cores
      <div class="text-center mt-2">
        <span
          v-for="type in pokemonTypes"
          :key="type.name"
          :style="{ backgroundColor: type.color }"
          class="badge m-1"
        >
          {{ type.name }}
        </span>
      </div>

      Estatísticas
      <ul class="list-group list-group-flush">
        <li v-for="stat in pokemonStats" :key="stat.name" class="list-group-item">
          {{ stat.name }}: {{ stat.value }}
        </li>
      </ul>

      Cadeia de Evolução
      <div v-if="pokemonEvolutionChain.length > 0" class="mt-3 text-center">
        <h5>Cadeia de Evolução:</h5>
        <div class="d-flex justify-content-center">
          <div v-for="evolution in pokemonEvolutionChain" :key="evolution.name" class="mx-2">
            <img :src="evolution.sprite" alt="evolution" width="60" height="60" />
            <p>{{ evolution.name }}</p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
