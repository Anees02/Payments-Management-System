<template>
  <div class="flex h-screen w-screen bg-white -mt-10 ">
  
    <div class="w-7/12 flex items-center justify-center text-gray-800 bg-gray-200">
      <div class="p-12 max-w-md">
        <h2 class="text-4xl font-bold mb-4">Z-Fintech</h2>
        <p class="text-lg leading-relaxed">
          Empowering businesses with secure and scalable solutions.  
          Together, let’s build the future of finance and management.
        </p>
      </div>
    </div>

    <div class="w-5/12 flex flex-col justify-center items-center  bg-gray-100 px-16">
      <h2 class="text-4xl font-bold mb-8 text-black text-center pb-10">Welcome</h2>
      <form @submit.prevent="handleLogin" class="w-full max-w-md space-y-6">
        <div>
          <label class="block text-sm font-medium text-black mb-">Username</label>
          <input 
            v-model="username" 
            type="text" 
            required 
            class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-black"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-black mb-2">Password</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-black"
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
