import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppListPokemons from '@/components/pokemon/AppListPokemons.vue'
import AppPokemonItem from '@/components/pokemon/AppPokemonItem.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

global.fetch = vi.fn((input: URL | RequestInfo) => {
  let url: string

  if (typeof input === 'string') {
    url = input
  } else if (input instanceof URL) {
    url = input.toString()
  } else if (input instanceof Request) {
    url = input.url
  } else {
    return Promise.reject(new Error('Input inválido'))
  }

  if (url.includes('pokemon?limit=300&offset=0')) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [{ name: 'bulbasaur' }, { name: 'ivysaur' }, { name: 'venusaur' }]
        })
    } as Response)
  } else if (url.includes('pokemon/')) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          name: url.split('/').pop(),
          types: [{ type: { name: 'grass' } }]
        })
    } as Response)
  }

  return Promise.reject(new Error('URL não reconhecida'))
})

describe('AppListPokemons.vue', () => {
  let wrapper: any

  beforeEach(() => {
    const pinia = createPinia()
    const app = createApp(AppListPokemons)
    app.use(pinia)

    wrapper = mount(AppListPokemons, {
      global: {
        plugins: [pinia]
      }
    })
  })

  it('fetches Pokémon data on mount', async () => {
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.vm.pokemons.list).toHaveLength(3)

    const pokemonItems = wrapper.findAllComponents(AppPokemonItem)
    expect(pokemonItems).toHaveLength(3)
    expect(pokemonItems[0].props().name).toBe('bulbasaur')
    expect(pokemonItems[1].props().name).toBe('ivysaur')
    expect(pokemonItems[2].props().name).toBe('venusaur')
  })

  it('filters Pokémon by name', async () => {
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.vm.pokemons.list).toHaveLength(3)

    wrapper.vm.searchTerm = 'iv'
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.filteredPokemons).toHaveLength(1);
    expect(wrapper.vm.filteredPokemons[0].name).toBe('ivysaur');
  })
})
