<template>
  <!-- Wrapper -->
  <div v-if="user" class="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
    <!-- Card -->
    <div class="bg-white shadow-xl rounded-2xl w-full max-w-lg p-6 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        User Details
      </h2>

      <!-- User Info -->
      <div class="space-y-4 border-t border-b py-4">
        <div class="flex justify-between text-sm sm:text-base">
          <span class="text-gray-500 font-medium">Full Name:</span>
          <span class="text-gray-900">{{ user.name }}</span>
        </div>
        <div class="flex justify-between text-sm sm:text-base">
          <span class="text-gray-500 font-medium">Email:</span>
          <span class="text-gray-900 break-all">{{ user.email }}</span>
        </div>
        <div class="flex justify-between text-sm sm:text-base">
          <span class="text-gray-500 font-medium">Phone:</span>
          <span class="text-gray-900">{{ user.phone }}</span>
        </div>
        <div class="flex justify-between text-sm sm:text-base">
          <span class="text-gray-500 font-medium">Date of Birth:</span>
          <span class="text-gray-900">{{ user.dob }}</span>
        </div>
      </div>

      <!-- Back Button -->
      <div class="pt-6 text-center">
        <button
          @click="goBack"
          class="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition w-full sm:w-auto"
        >
          Back to Users
        </button>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="min-h-screen flex items-center justify-center p-6 text-gray-500 text-center">
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
