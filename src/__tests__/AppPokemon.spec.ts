import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import AppPokemon from '@/components/pokemon/AppPokemon.vue' 
import { usePokemonStore } from '@/stores/usePokemonStore'

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        results: [{ name: 'bulbasaur' }, { name: 'ivysaur' }, { name: 'venusaur' }]
      })
  } as Response)
)

describe('AppPokemon Component', () => {
  let pokemonStore: ReturnType<typeof usePokemonStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    pokemonStore = usePokemonStore()
  })


  it('selects a pokemon on click', async () => {
    const wrapper = mount(AppPokemon, {
      props: { name: 'bulbasaur' },
    })

    await wrapper.find('.card').trigger('click')

    expect(pokemonStore.selectedPokemon).toBe('bulbasaur')
  })
})
