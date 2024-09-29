import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import AppPokemonItem from '@/components/pokemon/AppPokemonItem.vue' 
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

describe('AppPokemonItem Component', () => {
  let pokemonStore: ReturnType<typeof usePokemonStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    pokemonStore = usePokemonStore()
  })


  it('selects a pokemon on click', async () => {
    const wrapper = mount(AppPokemonItem, {
      props: { name: 'bulbasaur' },
    })

    await wrapper.find('.card').trigger('click')

    expect(pokemonStore.selectedPokemon).toBe('bulbasaur')
  })
})
