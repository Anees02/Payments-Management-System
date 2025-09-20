<template>
  <div class="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
    <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        {{ isEditMode ? 'Edit User' : 'Create New User' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input v-model="form.name" type="text" placeholder="Enter full name"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>

        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="Enter email"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none
                  border-gray-300 focus:ring-blue-500"
            required
          />
          <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailError }}</p>
        </div>


        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input v-model="form.phone" type="tel" placeholder="Enter phone number" pattern="[0-9]{10}"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          <p class="text-xs text-gray-500 mt-1">10-digit phone number</p>
        </div>

        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input v-model="form.dob" type="date"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>

       
        <div class="flex justify-center gap-3 pt-4">
          <button type="button" @click="cancel"
            class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Cancel</button>
          <button type="submit"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">{{ isEditMode ? 'Update User' : 'Save User' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"

const store = useStore()
const router = useRouter()
const route = useRoute()

const form = ref({
  id: "",
  name: "",
  email: "",
  phone: "",
  dob: ""
})

const isEditMode = ref(false)

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailError = computed(() => {
  if (!form.value.email) return "" // don’t show error when empty
  return emailRegex.test(form.value.email) ? "" : "Please enter a valid email address"
})

onMounted(() => {
  const userId = route.params.id
  if (userId) {
    isEditMode.value = true
    const existing = store.getters.getUserById(userId)
    if (existing) form.value = { ...existing }
  }
})

function handleSubmit() {
  if (emailError.value) {
    return // block submit if invalid email
  }

  if (isEditMode.value) {
    store.dispatch("updateUser", form.value)
  } else {
    form.value.id = `U${Date.now()}`
    store.dispatch("addUser", form.value)
  }
  router.push("/users")
}

function cancel() {
  router.push("/users")
}
</script>