import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { usePokemonStore } from '@/stores/usePokemonStore';
import FavoritesPokemonsView from '@/views/FavoritesPokemonsView.vue';

beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: vi.fn(() => JSON.stringify(['pikachu', 'bulbasaur'])),
            setItem: vi.fn(),
            clear: vi.fn(),
        },
        writable: true,
    });
});

describe('FavoritesPokemonsView.vue', () => {
    let store: ReturnType<typeof usePokemonStore>;

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
        store = usePokemonStore();
        localStorage.clear();
    });

    it('should display message when there are no favorite pokemons', async () => {
        localStorage.setItem('pokemonsFavorites', JSON.stringify([]));
        const wrapper = mount(FavoritesPokemonsView);
        await wrapper.vm.$nextTick();
        expect(wrapper.find('p').text()).toBe('Nenhum Pokémon favorito encontrado.');
    });

    it('renders the title and favorite Pokémon names', async () => {
        localStorage.setItem('pokemonsFavorites', JSON.stringify(['pikachu', 'bulbasaur']));
        const wrapper = mount(FavoritesPokemonsView);
        await wrapper.vm.loadFavoritePokemons(); 
        expect(wrapper.find('h2').text()).toBe('Pokémons Favoritos');
        await wrapper.vm.$nextTick();
        const pokemonTitles = wrapper.findAll('.card-title');
        expect(pokemonTitles.length).toBe(2); 
        expect(pokemonTitles[0].text()).toBe('PIKACHU');
        expect(pokemonTitles[1].text()).toBe('BULBASAUR');
    });
});
