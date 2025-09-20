import { createStore } from "vuex"
import seedData from "../data/seedData.json"

const USERS_KEY = "users"
const PAYMENTS_KEY = "payments"

function loadFromStorage(key, fallback) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : fallback
}

export default createStore({
  state: {
    users: loadFromStorage(USERS_KEY, seedData.users),
    payments: loadFromStorage(PAYMENTS_KEY, seedData.payments)
  },
  mutations: {
    
    ADD_USER(state, user) {
      state.users.push(user)
      localStorage.setItem(USERS_KEY, JSON.stringify(state.users))
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        state.users[index] = updatedUser
        localStorage.setItem(USERS_KEY, JSON.stringify(state.users))
      }
    },
   
    ADD_PAYMENT(state, payment) {
      state.payments.push(payment)
      localStorage.setItem(PAYMENTS_KEY, JSON.stringify(state.payments))
    },
    UPDATE_PAYMENT(state, updatedPayment) {
      const index = state.payments.findIndex(p => p.id === updatedPayment.id)
      if (index !== -1) {
        state.payments[index] = updatedPayment
        localStorage.setItem(PAYMENTS_KEY, JSON.stringify(state.payments))
      }
    }
  },
  actions: {
    addUser({ commit }, user) {
      commit('ADD_USER', user)
    },
    updateUser({ commit }, user) {
      commit('UPDATE_USER', user)
    },
    addPayment({ commit }, payment) {
      commit('ADD_PAYMENT', payment)
    },
    updatePayment({ commit }, payment) {
      commit('UPDATE_PAYMENT', payment)
    }
  },

  getters: {
    getUserById(state){
      return (id) => state.users.find(user => user.id = id)
    },

    getPaymentById: state => id =>
      state.payments.find(p => p.id === parseInt(id)),

    getPaymentsByUser: state => userId =>
      state.payments.filter(p => p.userId === parseInt(userId)),

    getUserByPaymentId: (state) => (paymentId) => {
      const payment = state.payments.find(p => p.id === parseInt(paymentId))
      if (!payment) return null
      return state.users.find(u => u.id === payment.userId) || null
    }
  }
})
