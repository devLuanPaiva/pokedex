<script setup>
import { ref, onMounted } from 'vue'
import { usePokemonStore } from '../../stores/usePokemonStore'

const pokemon = defineProps(['name'])
const pokemonImage = ref('')
const pokemonNumber = ref(null)
const pokemonStore = usePokemonStore()

const fetchPokemonData = async (name) => {
  try {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemonData = await pokemonResponse.json()

    pokemonNumber.value = pokemonData.id
    pokemonImage.value = pokemonData.sprites.other['official-artwork'].front_default
  } catch (error) {
    console.error('Erro ao buscar dados do Pokémon:', error)
  }
}

onMounted(() => {
  fetchPokemonData(pokemon.name)
})

const handleClick = () => {
  pokemonStore.selectPokemon(pokemon.name)
}
</script>

<template>
  <div class="col-4">
    <article class="card m-2" @click="handleClick">
      <h3 class="text-center">{{ pokemon.name }}</h3>
      <img :src="pokemonImage" class="card-img-top" alt="pokemon" />
    </article>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}

.card-img-top {
  object-fit: contain;
  height: 150px;
}
</style>
