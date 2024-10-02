import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePokemonStore } from '@/stores/usePokemonStore'
import FavoritesPokemonsView from '@/views/FavoritesPokemonsView.vue'

beforeEach(() => {
  global.fetch = vi.fn(() => {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [{ name: 'bulbasaur' }, { name: 'ivysaur' }, { name: 'venusaur' }]
        })
    } as Response)
  }) as typeof global.fetch
})

describe('FavoritesPokemonsView.vue', () => {
  let store: ReturnType<typeof usePokemonStore>

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    store = usePokemonStore()

    localStorage.clear()

    const favoritePokemons = ['bulbasaur', 'ivysaur']
    localStorage.setItem('pokemonsFavorites', JSON.stringify(favoritePokemons))
  })

  it('should display message when there are no favorite pokemons', async () => {
    localStorage.setItem('pokemonsFavorites', JSON.stringify([]))

    const wrapper = mount(FavoritesPokemonsView)

    await wrapper.vm.$nextTick()

    expect(wrapper.find('p').text()).toBe('Nenhum Pokémon favorito encontrado.')
  })
})
