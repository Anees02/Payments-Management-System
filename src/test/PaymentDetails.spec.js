import { mount } from '@vue/test-utils'
import PaymentDetails from '../component/PaymentDetails.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

// Dummy component for route targets
const Dummy = { template: '<div></div>' }

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/payments', component: Dummy },
    { path: '/payments/:id', component: PaymentDetails },
  ],
})

// Mock store
const store = createStore({
  getters: {
    getPaymentById: () => () => ({
      id: 1,
      amount: 100,
      description: 'Test Payment'
    }),
  },
})

describe('PaymentDetails.vue', () => {
  it('goBack method redirects to /payments', async () => {
    // Set the initial route before mounting
    router.push('/payments/1')
    await router.isReady()

    const wrapper = mount(PaymentDetails, {
      global: {
        plugins: [router, store],
      },
    })

    await wrapper.vm.goBack()
    await nextTick()

    expect(wrapper.vm.$route.path).toBe('/payments')
  })
})
