<template>
  <div class="p-12 bg-gray-50 min-h-screen pt-12">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex justify-center items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Payment Management</h2>
      </div>
      <button
        @click="goToCreatePayment"
        class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        <PlusCircleIcon class="w-5 h-5 text-white" />New Payment
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow-md rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">
      <input
        v-model="filters.search"
        type="text"
        placeholder="Search by user or ID..."
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <select
        v-model="filters.status"
        class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Status</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
      </select>

      <select
        v-model="filters.category"
        class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Categories</option>
        <option value="Transfer">Transfer</option>
        <option value="Bill">Bill</option>
        <option value="Top-Up">Top-Up</option>
      </select>
    </div>

    <!-- Payment Table -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-xl">
      <table class="w-full text-left border-collapse">
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
            <td class="px-6 py-4">{{ store.getters.getUserByPaymentId(payment.id)?.name }}</td>
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
            <td class="px-6 py-4 flex justify-center gap-2">
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
  payments.value = payments.value.filter(p => p.id !== id)
}
</script>
