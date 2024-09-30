import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from '@/components/shared/AppFooter.vue'

describe('AppFooter.vue', () => {
  it('should render footer with sections', () => {
    const wrapper = mount(AppFooter, {
      global: {
        stubs: ['router-link']
      }
    })

    expect(wrapper.html()).toContain('Sobre o pokedex')

    expect(wrapper.html()).toContain('Links Úteis')

    expect(wrapper.html()).toContain('Siga-nos')
  })
})
