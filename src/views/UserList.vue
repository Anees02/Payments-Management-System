<template>
  <div class="p-14 bg-gray-50 min-h-screen pt-12">


    <div class="flex justify-between items-center mb-6">
      <div class="flex justify-center items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">User Management</h2>
      </div>
      <button
        @click="goToCreateUser"
        class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
       <UserPlusIcon class="w-5 h-5" />Add User
      </button>
    </div>

    <div class="overflow-x-auto bg-white shadow-lg rounded-xl">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr>
            <th class="px-6 py-3">ID</th>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">Phone Number</th>
            <th class="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="px-6 py-4">{{ user.id }}</td>
            <td class="px-6 py-4 font-medium text-gray-800">
              {{ user.name }}
            </td>
            <td class="px-6 py-4 text-gray-600">{{ user.email }}</td>
            <td class="px-6 py-4 text-gray-600">
                {{ user.phone }}
            </td>
            <td class="px-6 py-4 flex justify-center gap-2">
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

import { useStore } from "vuex"
import { computed } from "vue"
import { useRouter } from "vue-router"
import { UserPlusIcon} from '@heroicons/vue/24/solid'


const store = useStore()
const users = computed(() => store.state.users) 

const router = useRouter()



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
  users.value = users.value.filter(user => user.id !== id)
}
</script>

<style scoped>
table tr {
  transition: background 0.2s ease;
}
</style>
