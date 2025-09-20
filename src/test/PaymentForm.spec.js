import { mount } from '@vue/test-utils'
import PaymentForm from '../component/PaymentForm.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'

const store = createStore({
  state() {
    return { payments: [] }
  },
  getters: {
    getPaymentById: () => jest.fn()
  },
  mutations: {
    ADD_PAYMENT: jest.fn(),
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

describe('PaymentForm.vue', () => {
  it('renders correctly', async () => {
    const wrapper = mount(PaymentForm, {
      global: {
        plugins: [store, router]
      }
    })
    expect(wrapper.text()).toContain('New Payment')
  })

  it('updates form data when input changes', async () => {
    const wrapper = mount(PaymentForm, {
      global: { plugins: [store, router] }
    })
    const amountInput = wrapper.find('input[type="number"]')
    await amountInput.setValue(500)
    expect(wrapper.vm.form.amount).toBe(500)
  })
})
