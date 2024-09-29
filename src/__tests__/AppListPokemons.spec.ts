import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppListPokemons from '@/components/pokemon/AppListPokemons.vue'
import AppPokemonItem from '@/components/pokemon/AppPokemonItem.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        results: [{ name: 'bulbasaur' }, { name: 'ivysaur' }, { name: 'venusaur' }]
      })
  } as Response)
)

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
    await new Promise(resolve => setTimeout(resolve, 100)); 

    expect(wrapper.vm.pokemons.list).toHaveLength(3) 

    const pokemonItems = wrapper.findAllComponents(AppPokemonItem)
    expect(pokemonItems).toHaveLength(3) 
    expect(pokemonItems[0].props().name).toBe('bulbasaur')
    expect(pokemonItems[1].props().name).toBe('ivysaur')
    expect(pokemonItems[2].props().name).toBe('venusaur')
  })
})
