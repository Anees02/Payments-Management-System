<template>
  <div class="p-4 sm:p-8 md:p-12 bg-gray-50 min-h-screen">
   
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h2 class="text-2xl font-bold text-gray-800">Payment Management</h2>
      <button
        @click="goToCreatePayment"
        class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto justify-center"
      >
        <PlusCircleIcon class="w-5 h-5 text-white" /> New Payment
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow-md rounded-xl p-4 mb-6 grid gap-4 sm:flex sm:flex-wrap items-center">
      <input
        v-model="filters.search"
        type="text"
        placeholder="Search by user or ID..."
        class="w-full sm:w-auto flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <select
        v-model="filters.status"
        class="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Status</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
      </select>

      <select
        v-model="filters.category"
        class="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Categories</option>
        <option value="Transfer">Transfer</option>
        <option value="Bill">Bill</option>
        <option value="Top-Up">Top-Up</option>
      </select>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-xl">
      <table class="min-w-max w-full text-left border-collapse">
        <thead class="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr>
            <th class="px-6 py-3">Payment ID</th>
            <th class="px-6 py-3">User</th>
            <th class="px-6 py-3">Amount</th>
            <th class="px-6 py-3">Category</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3">Date</th>
            <th class="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="payment in filteredPayments"
            :key="payment.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="px-6 py-4 font-medium text-gray-800">
              {{ payment.id }}
            </td>
            <td class="px-6 py-4">
              {{ store.getters.getUserByPaymentId(payment.id)?.name }}
            </td>
            <td class="px-6 py-4 text-gray-700">
              ${{ payment.amount.toFixed(2) }}
            </td>
            <td class="px-6 py-4">
              <span class="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                {{ payment.category }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  payment.status === 'Success'
                    ? 'bg-green-100 text-green-700'
                    : payment.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                ]"
              >
                {{ payment.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ payment.date }}</td>
            <td class="px-6 py-4 flex justify-center gap-2 flex-wrap">
              <button
                @click="viewPayment(payment.id)"
                class="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition text-sm"
              >
                View
              </button>
              <button
                @click="editPayment(payment.id)"
                class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition text-sm"
              >
                Edit
              </button>
              <button
                @click="deletePayment(payment.id)"
                class="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { ref, computed} from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import {PlusCircleIcon} from '@heroicons/vue/24/solid'

const router = useRouter()

const filters = ref({
  search: "",
  status: "",
  category: ""
})


const store = useStore()
const payments = computed(() => store.state.payments)



const filteredPayments = computed(() => {
  return payments.value.filter(p => {
    return (
      (filters.value.search === "" ||
        store.getters.getUserByPaymentId(p.id).name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
        p.id.toString().includes(filters.value.search.toLowerCase())) &&
      (filters.value.status === "" || p.status === filters.value.status) &&
      (filters.value.category === "" || p.category === filters.value.category)
    )
  })
})

function goToCreatePayment() {
  router.push("/payments/create")
}

function viewPayment(id) {
  router.push(`/payments/${id}`)
}

function editPayment(id) {
  router.push(`/payments/${id}/edit`)
}

function deletePayment(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    store.dispatch("deletePayment", id)
  }
}
</script>
