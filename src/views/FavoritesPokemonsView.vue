<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css' 
const favoritePokemons = ref([])
const pokemonDetails = ref([])

const fetchPokemonData = async (name) => {
    try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokemonData = await pokemonResponse.json()

        const imageUrl = pokemonData.sprites && pokemonData.sprites.other 
            ? pokemonData.sprites.other['official-artwork']?.front_default 
            : null;

        return {
            name: pokemonData.name,
            number: pokemonData.id,
            image: imageUrl
        }
    } catch (error) {
        console.error(`Erro ao buscar dados do Pokémon ${name}:`, error)
        return null
    }
}


const loadFavoritePokemons = async () => {
    const favorites = JSON.parse(localStorage.getItem('pokemonsFavorites')) || []
    favoritePokemons.value = favorites

    for (const pokemon of favorites) {
        const data = await fetchPokemonData(pokemon)
        if (data) {
            pokemonDetails.value.push(data)
        }
    }
}

onMounted(() => {
    loadFavoritePokemons()

    AOS.init({
        duration: 1000, 
        once: true 
    })
})
</script>

<template>
    <section class="container mt-5">
        <h2 class="text-center mb-4">Pokémons Favoritos</h2>

        <div v-if="pokemonDetails.length === 0" class="text-center">
            <p>Nenhum Pokémon favorito encontrado.</p>
        </div>

        <section v-else class="row">
            <div v-for="(pokemon, index) in pokemonDetails" :key="pokemon.name" class="col-lg-4 col-md-6 col-sm-12 mb-4"
                data-aos="fade-up" :data-aos-delay="index * 100">
                <article  class="card pokemon-card shadow-lg text-center">
                    <img :src="pokemon.image" class="card-img-top mx-auto mt-3" alt="pokemon" style="width: 150px;" />
                    <div class="card-body">
                        <h5 class="card-title">{{ pokemon.name.toUpperCase() }}</h5>
                        <p class="card-text">Número: #{{ pokemon.number }}</p>
                    </div>
                </article>
            </div>
        </section>
    </section>
</template>

<style scoped>
.pokemon-card {
    border-radius: 1rem;
    transition: transform 0.3s, box-shadow 0.3s;
    background-color: #f7f9fc;
}

.pokemon-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
</style>
