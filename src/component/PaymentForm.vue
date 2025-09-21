<template>
  <div class="p-6 bg-gray-50 min-h-screen flex justify-center items-start">
    <div class="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        {{ isEditMode ? 'Edit Payment' : 'New Payment' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">

        <!-- User ID -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">User ID</label>
          <input
            v-model="form.userId"
            type="text"
            placeholder="Enter user ID"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            @input="fillUserName"
          />
        </div>

        <!-- Auto-filled User Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">User Name</label>
          <input
            v-model="form.user"
            type="text"
            placeholder="User name will appear here"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-100"
            readonly
          />
        </div>

        <!-- Amount -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            v-model.number="form.amount"
            type="number"
            placeholder="Enter amount"
            min="0"
            step="0.01"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            v-model="form.category"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Transfer">Transfer</option>
            <option value="Bill">Bill</option>
            <option value="Top-Up">Top-Up</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="form.status"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            v-model="form.date"
            type="date"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <!-- Payment Method -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <input
            v-model="form.method"
            type="text"
            placeholder="Enter payment method"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Buttons -->
        <div class="flex justify-center gap-4 pt-4">
          <button
            type="button"
            @click="cancel"
            class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {{ isEditMode ? 'Update Payment' : 'Create Payment' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"

const router = useRouter()
const route = useRoute()
const store = useStore()

const isEditMode = ref(false)

const form = ref({
  id: "",
  userId: "",
  user: "",
  amount: null,
  category: "",
  status: "Pending",
  date: "",
  method: ""
})

onMounted(() => {
  const paymentId = route.params.id
  if (paymentId) {
    isEditMode.value = true
    const existing = store.getters.getPaymentById(paymentId)
    if (existing) {
      Object.assign(form.value, existing)
      fillUserName()
    }
    form.value.status = existing.status || "Pending"
  }
})

function fillUserName() {
  const user = store.getters.getUserById(form.value.userId)
  form.value.user = user ? user.name : ""
}

function handleSubmit() {
  if (isEditMode.value) {
    store.dispatch("updatePayment", { ...form.value })
    alert(`Payment ${form.value.id} updated!`)
  } else {
    form.value.id = store.state.payments.length
      ? Math.max(...store.state.payments.map(p => p.id)) + 1
      : 1
    store.dispatch("addPayment", { ...form.value })
    alert("New payment created!")
  }
  router.push("/payments")
}

function cancel() {
  router.push("/payments")
}
</script>
