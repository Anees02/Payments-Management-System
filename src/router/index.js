import { createRouter, createWebHistory } from "vue-router"


import UserList from "../views/UserList.vue"
import UserForm from "../component/UserForm.vue"
import UserDetail from "../component/UserDetail.vue"

import PaymentList from "../views/PaymentList.vue"
import PaymentForm from "../component/PaymentForm.vue"
import PaymentDetails from "../component/PaymentDetails.vue"
import Login from "@/component/Login.vue"

const routes = [
  { path: "/login", component: Login },

  {
    path: "/users",
    name: "UserList",
    component: UserList,
    meta: { requiresAuth: true }
  },
  {
    path: "/users/create",
    name: "UserCreate",
    component: UserForm,
    meta: { requiresAuth: true }
  },
  {
    path: "/users/:id",
    name: "UserDetail",
    component: UserDetail,
    meta: { requiresAuth: true }
  },
  {
    path: "/users/:id/edit",
    name: "UserEdit",
    component: UserForm,
    meta: { requiresAuth: true }
  },

  {
    path: "/payments",
    name: "PaymentList",
    component: PaymentList,
    meta: { requiresAuth: true }
  },
  {
    path: "/payments/create",
    name: "PaymentCreate",
    component: PaymentForm,
    meta: { requiresAuth: true }
  },
  {
    path: "/payments/:id",
    name: "PaymentDetail",
    component: PaymentDetails,
    meta: { requiresAuth: true }
  },
  {
    path: "/payments/:id/edit",
    name: "PaymentEdit",
    component: PaymentForm,
    meta: { requiresAuth: true }
  },

  { path: "/", redirect: "/login" },

  
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: {
      template: `<div class="p-6 text-center">
                  <h2 class="text-3xl font-bold">404 Not Found</h2>
                  <p class="mt-4">Page does not exist.</p>
                </div>`
    }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login")
  } else {
    next()
  }
})


export default router
