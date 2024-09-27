<script setup>
import { ref, onMounted } from 'vue'

// Recebendo o nome do Pokémon como prop
const pokemon = defineProps(['name'])

// Definindo referências reativas para armazenar os dados do Pokémon
const pokemonImage = ref('')
const pokemonStats = ref([])
const pokemonTypes = ref([])
const pokemonEvolutionChain = ref([])
const pokemonNumber = ref(null)

// Função para buscar dados do Pokémon
const fetchPokemonData = async (name) => {
  try {
    // Buscar os detalhes do Pokémon
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemonData = await pokemonResponse.json()

    // Obter o número do Pokémon
    pokemonNumber.value = pokemonData.id // Aqui você pega o ID

    // Atualizando a imagem
    pokemonImage.value = pokemonData.sprites.other['official-artwork'].front_default

    // Atualizando as estatísticas
    pokemonStats.value = pokemonData.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat
    }))

    // Atualizando os tipos
    pokemonTypes.value = pokemonData.types.map((type) => ({
      name: type.type.name,
      color: getColorForType(type.type.name)
    }))

    // Buscar informações da espécie para obter a cadeia de evolução
    const speciesResponse = await fetch(pokemonData.species.url)
    const speciesData = await speciesResponse.json()

    // Buscar a cadeia de evolução
    const evolutionChainResponse = await fetch(speciesData.evolution_chain.url)
    const evolutionChainData = await evolutionChainResponse.json()

    // Processar a cadeia de evolução
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
      currentEvolution = currentEvolution.evolves_to[0] // Passa para a próxima evolução
    } while (currentEvolution)

    pokemonEvolutionChain.value = evolutions
  } catch (error) {
    console.error('Erro ao buscar dados do Pokémon:', error)
  }
}

// Função para definir cores baseadas nos tipos de Pokémon
const getColorForType = (type) => {
  const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030'
    // Adicionar outros tipos com cores correspondentes
  }
  return typeColors[type] || '#000' // Cor padrão se o tipo não for encontrado
}

// Chama a função quando o componente é montado
onMounted(() => {
  fetchPokemonData(pokemon.name)
})
</script>

<template>
  <div class="col-4">
    <article class="card m-2">
      <p class="">{{pokemonNumber}} </p>
      <h3 class="text-center">{{ pokemon.name }}</h3>
      <img :src="pokemonImage" class="card-img-top" alt="pokemon" />
      <!-- 
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
      </div> -->
    </article>
  </div>
</template>

<style scoped>
/* Estilização adicional para o componente */
.card {
  border-radius: 10px;
  overflow: hidden;
}

.card-img-top {
  object-fit: contain;
  height: 150px;
}

.badge {
  padding: 10px;
  font-size: 0.9em;
  border-radius: 5px;
  color: white;
}
</style>
