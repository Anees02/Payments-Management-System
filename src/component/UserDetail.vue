<template>
  <div v-if="user" class="p-6 bg-gray-50 min-h-screen flex justify-center items-start">
    <div class="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">User Details</h2>

      <div class="space-y-4 border-t border-b py-4">
        <div class="flex justify-between">
          <span class="text-gray-500 font-medium">Full Name:</span>
          <span class="text-gray-900">{{ user.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 font-medium">Email:</span>
          <span class="text-gray-900">{{ user.email }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 font-medium">Phone:</span>
          <span class="text-gray-900">{{ user.phone }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 font-medium">Date of Birth:</span>
          <span class="text-gray-900">{{ user.dob }}</span>
        </div>
      </div>

      <div class="pt-6 text-center">
        <button @click="goBack" class="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
          Back to Users
        </button>
      </div>
    </div>
  </div>

  <div v-else class="p-6 text-center text-gray-500">
    Loading user details...
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"

const store = useStore()
const route = useRoute()
const router = useRouter()


const user = computed(() => store.getters.getUserById(route.params.id))

function goBack() {
  router.push("/users")
}
</script>
