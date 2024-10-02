import AppCard from '@/components/pokemon/AppCard.vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePokemonStore } from '@/stores/usePokemonStore'

describe('AppCard', () => {
  let pokemonStore: ReturnType<typeof usePokemonStore>

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    pokemonStore = usePokemonStore()
    pokemonStore.selectedPokemon = 'pikachu' 
  })


  it('toggles favorite when heart icon is clicked', async () => {
    const wrapper = mount(AppCard)

    await wrapper.find('.heart-icon').trigger('click')

    expect(pokemonStore.favorites).toContain('pikachu')

    await wrapper.find('.heart-icon').trigger('click')

    expect(pokemonStore.favorites).not.toContain('pikachu')
  })
})
