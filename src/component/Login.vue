<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen w-screen bg-white">
    <!-- Left side -->
    <div class="flex items-center justify-center text-gray-800 bg-gray-200 p-8">
      <div class="max-w-md">
        <h2 class="text-4xl font-bold mb-4">Z-Fintech</h2>
        <p class="text-lg leading-relaxed">
          Empowering businesses with secure and scalable solutions.  
          Together, let’s build the future of finance and management.
        </p>
      </div>
    </div>

    <!-- Right side -->
    <div class="flex flex-col justify-center items-center bg-gray-100 p-8">
      <h2 class="text-4xl font-bold mb-8 text-black text-center">Welcome</h2>
      <form @submit.prevent="handleLogin" class="w-full max-w-md space-y-6">
        <div>
          <label class="block text-sm font-medium text-black mb-2">Username</label>
          <input 
            v-model="username" 
            type="text" 
            required 
            class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-black mb-2">Password</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter your password"
          />
        </div>
        <button 
          type="submit" 
          class="w-full py-3 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition text-lg font-semibold">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    handleLogin() {
      if (this.username === "admin" && this.password === "admin") {
        localStorage.setItem("isLoggedIn", "true")
        this.$router.push("/users")
      } else {
        alert("Invalid credentials. Try admin/admin.")
      }
    }
  }
}
</script>
