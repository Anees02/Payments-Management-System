import { mount } from '@vue/test-utils'
import PaymentList from '../views/PaymentList.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'

const mockStore = createStore({
  state() {
    return { payments: [{ id: 1, user: 'John', amount: 100, status: 'Pending', category: 'Bill', date: '2025-09-20' }] }
  },
  getters: {
    getUserByPaymentId: () => () => ({ name: 'John' })
  }
})

const mockRouter = createRouter({
  history: createWebHistory(),
  routes: []
})

describe('PaymentList.vue', () => {
  it('renders payment list correctly', () => {
    const wrapper = mount(PaymentList, { global: { plugins: [mockStore, mockRouter] } })
    expect(wrapper.text()).toContain('Payment Management')
    expect(wrapper.text()).toContain('John')
  })

  it('filters payments by status', async () => {
    const wrapper = mount(PaymentList, { global: { plugins: [mockStore, mockRouter] } })
    wrapper.vm.filters.status = 'Pending'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.filteredPayments.length).toBe(1)
  })
})
