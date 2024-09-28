import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
  const selectedPokemon = ref<string | null>(null)

  function selectPokemon(name: string) {
    selectedPokemon.value = name
  }

  return {
    selectedPokemon,
    selectPokemon
  }
})
