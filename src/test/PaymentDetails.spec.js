import { mount } from '@vue/test-utils'
import PaymentDetails from '../component/PaymentDetails.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/payments', component: { template: '<div></div>' } },
    { path: '/payments/:id', component: PaymentDetails },
  ],
})


const mockStore = createStore({
  getters: {
    getPaymentById: () => () => ({
      id: 1,
      amount: 100,
      description: 'Test Payment',
      status: 'Pending',
      userId: 1,
      user: 'Test User'
    }),
    getUserByPaymentId: () => (id) => ({
      id: 1,
      name: 'Test User',
      phone: '1234567890'
    })
  },
})

describe('PaymentDetails.vue', () => {
  it('goBack method redirects to /payments', async () => {
    mockRouter.push('/payments/1')
    await mockRouter.isReady()

    const wrapper = mount(PaymentDetails, {
      global: {
        plugins: [mockRouter, mockStore],
      },
    })

    await wrapper.vm.goBack()
    await nextTick()

    expect(wrapper.vm.$route.path).toBe('/payments')
  })
})
