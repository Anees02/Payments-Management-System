<template>
  <header class="fixed top-0 left-0 right-0  z-100 bg-blue-600 text-white shadow-md h-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center h-full justify-between">
      
      <div class="text-2xl font-bold">Fintech Dashboard</div>

      
      <nav class="flex gap-6 items-center">
        <router-link
          to="/users"
          class="flex flex-col items-center p-2 hover:bg-blue-700 rounded transition"
        >
          <UserIcon class="w-5 h-5 text-white" />
          <span class="text-base mt-1 text-white">Users</span>
        </router-link>

        <router-link
          to="/payments"
          class="flex flex-col items-center p-2 hover:bg-blue-700 rounded transition"
        >
          <CreditCardIcon class="w-5 h-5 text-white" />
          <span class="text-base mt-1 text-white">Payments</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { UserIcon, CreditCardIcon } from '@heroicons/vue/24/solid'
</script>
