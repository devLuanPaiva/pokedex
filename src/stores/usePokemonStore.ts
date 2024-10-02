import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
  const selectedPokemon = ref<string | null>(null)
  const favorites = ref<string[]>([])

  const loadFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem('pokemonsFavorites')
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites)
    }
  }

  const toggleFavorites = (pokemon: string) => {
    const index = favorites.value.indexOf(pokemon)
    if (index === -1) {
      favorites.value.push(pokemon)
    } else {
      favorites.value.splice(index, 1)
    }
    localStorage.setItem('pokemonsFavorites', JSON.stringify(favorites.value))
  }

  const isFavorite = (pokemon: string) => favorites.value.includes(pokemon)

  const selectPokemon = (name: string) => {
    selectedPokemon.value = name
  }

  loadFavoritesFromLocalStorage()

  return {
    selectedPokemon,
    selectPokemon,
    favorites,
    isFavorite,
    toggleFavorites
  }
})
