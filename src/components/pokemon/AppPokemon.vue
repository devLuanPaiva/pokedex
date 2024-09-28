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
  <div class="pokemon-card col-6 col-sm-4">
    <article class="card m-2" @click="handleClick">
      <div class="card-overlay"></div>
      <h3 class="text-center">{{ pokemon.name }}</h3>
      <img :src="pokemonImage" class="card-img-top" alt="pokemon" />
    </article>
  </div>
</template>

<style scoped>
.pokemon-card {
  position: relative;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
  overflow: hidden;
  background: transparent;
}

.pokemon-card:hover {
  transform: translateY(-12px) scale(1.05) rotate(2deg);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.card {
  padding: 3px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(145deg, #141e30, #243b55);
  border: 1px solid #333;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  color: white;
  text-transform: uppercase;
}

.card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 90deg, #ff4b2b, #ff416c, #141e30, #243b55);
  transform: rotate(30deg);
  transition: opacity 0.5s;
  opacity: 0.5;
}

.card:hover::before {
  opacity: 0.8;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}

.pokemon-card:hover .card-overlay {
  opacity: 0;
}

.card-img-top {
  object-fit: contain;
  height: 150px;
  padding: 10px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

.text-center {
  font-family: 'Poppins', sans-serif;
  color: #fff;
  font-size: 1.3rem;
  letter-spacing: 1px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.pokemon-card:hover .text-center {
  text-shadow: 0 4px 10px rgba(255, 255, 255, 0.6);
}
</style>
