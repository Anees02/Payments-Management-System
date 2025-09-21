<template>
  <div class="p-6 bg-gray-50 min-h-screen flex justify-center items-start">
    <div class="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8">
      
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Payment View</h2>
        <span
          :class="[
            'px-3 py-1 rounded-full text-sm font-semibold',
            payment.status === 'Success'
              ? 'bg-green-100 text-green-700'
              : payment.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          ]"
        >
          {{ payment.status }}
        </span>
      </div>

  
      <div class="space-y-4 border-t border-b py-4">
        <div class="flex justify-between">
          <span class="text-gray-500 font-medium">Payment ID</span>
          <span class="text-gray-900 font-semibold">{{ payment.id }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 font-medium">User</span>
          <span class="text-gray-900 font-semibold">{{ store.getters.getUserByPaymentId(payment.id)?.name  }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 font-medium">Amount</span>
          <span class="text-gray-900 font-bold text-lg">${{ payment.amount}}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 font-medium">Category</span>
          <span class="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">{{ payment.category }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 font-medium">Date</span>
          <span class="text-gray-900">{{ payment.date }}</span>
        </div>
        <div v-if="payment.method" class="flex justify-between">
          <span class="text-gray-500 font-medium">Payment Method</span>
          <span class="text-gray-900">{{ payment.method }}</span>
        </div>
        <div v-if="payment.notes" class="flex justify-between">
          <span class="text-gray-500 font-medium">Notes</span>
          <span class="text-gray-900">{{ payment.notes }}</span>
        </div>
      </div>

      <div class="pt-6 text-center">
        <button
          @click="goBack"
          class="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium"
        >
          Back to Payments
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"

const store = useStore()
const route = useRoute()
const router = useRouter()

const payment = computed(() => store.getters.getPaymentById(route.params.id))

async function goBack() {
  await router.push("/payments")
}

</script>
