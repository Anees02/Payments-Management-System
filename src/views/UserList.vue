<template>
  <div class="p-4 sm:p-8 md:p-12 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h2 class="text-2xl font-bold text-gray-800">User Management</h2>
      <button
        @click="goToCreateUser"
        class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto justify-center"
      >
        <PlusCircleIcon class="w-5 h-5 text-white" /> New User
      </button>
    </div>

    <!-- Filter -->
    <div class="bg-white shadow-md rounded-xl p-4 mb-6">
      <input
        v-model="filters.search"
        type="text"
        placeholder="Search by name, email, or phone..."
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-xl">
      <table class="min-w-max w-full text-left border-collapse">
        <thead class="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr>
            <th class="px-6 py-3">User ID</th>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">Phone</th>
            <th class="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="px-6 py-4 font-medium text-gray-800">{{ user.id }}</td>
            <td class="px-6 py-4">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">{{ user.phone }}</td>
            <td class="px-6 py-4 flex justify-center gap-2 flex-wrap">
              <button
                @click="viewUser(user.id)"
                class="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition text-sm"
              >
                View
              </button>
              <button
                @click="editUser(user.id)"
                class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition text-sm"
              >
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
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
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { PlusCircleIcon } from "@heroicons/vue/24/solid"

const router = useRouter()
const store = useStore()

const filters = ref({
  search: ""
})

const users = computed(() => store.state.users)

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    return (
      filters.value.search === "" ||
      user.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      user.phone.toLowerCase().includes(filters.value.search.toLowerCase())
    )
  })
})

function goToCreateUser() {
  router.push("/users/create")
}

function viewUser(id) {
  router.push(`/users/${id}`)
}

function editUser(id) {
  router.push(`/users/${id}/edit`)
}

function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    store.dispatch("deleteUser", id)
  }
}
</script>
