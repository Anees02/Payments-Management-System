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
    // USER MUTATIONS
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
    DELETE_USER(state, userId) {
      state.users = state.users.filter(u => u.id !== userId)
      localStorage.setItem(USERS_KEY, JSON.stringify(state.users))
    },

    // PAYMENT MUTATIONS
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
    },
    DELETE_PAYMENT(state, paymentId) {
      state.payments = state.payments.filter(p => p.id !== paymentId)
      localStorage.setItem(PAYMENTS_KEY, JSON.stringify(state.payments))
    }
  },

  actions: {
    // USER ACTIONS
    addUser({ commit }, user) {
      commit("ADD_USER", user)
    },
    updateUser({ commit }, user) {
      commit("UPDATE_USER", user)
    },
    deleteUser({ commit }, userId) {
      commit("DELETE_USER", userId)
    },

    // PAYMENT ACTIONS
    addPayment({ commit }, payment) {
      commit("ADD_PAYMENT", payment)
    },
    updatePayment({ commit }, payment) {
      commit("UPDATE_PAYMENT", payment)
    },
    deletePayment({ commit }, paymentId) {
      commit("DELETE_PAYMENT", paymentId)
    }
  },

  getters: {
    getUserById: (state) => (id) =>
      state.users.find(user => user.id === id),

    getPaymentById: (state) => (id) =>
      state.payments.find(p => p.id === parseInt(id)),

    getPaymentsByUser: (state) => (userId) =>
      state.payments.filter(p => p.userId === parseInt(userId)),

    getUserByPaymentId: (state) => (paymentId) => {
      const payment = state.payments.find(p => p.id === parseInt(paymentId))
      if (!payment) return null
      return state.users.find(u => u.id === payment.userId) || null
    }
  }
})
