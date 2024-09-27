import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('should render App component with Nav and Footer', () => {
    const wrapper = mount(App, {
      global: {
        stubs: ['router-link', 'router-view'] 
      }
    })

    expect(wrapper.findComponent({ name: 'Nav' }).exists()).toBe(true)

    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true)
  })
})
