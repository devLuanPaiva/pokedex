import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppNav from '../components/shared/AppNav.vue'

describe('AppNav.vue', () => {
  it('should render navbar with brand and links', () => {
    const wrapper = mount(AppNav)

    const brandLink = wrapper.find('.navbar-brand')
    expect(brandLink.exists()).toBe(true)
    expect(brandLink.text()).toContain('Pokédex')

    const navCollapse = wrapper.find('.navbar-collapse')
    expect(navCollapse.exists()).toBe(true)
  })
})
