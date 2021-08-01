import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/weather",
    name: "Weather",
    component: () => import("../views/weather/Weather.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.userModule.isLogin === true) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },

  {
    path: "/users",
    name: "User",
    component: () => import("../views/user/User.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.userModule.isLogin === true) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/todos",
    name: "Todo",
    component: () => import("../views/todo/Todo.vue"),
    
  },

  {
    path: "/auth-user",
    name: "AuthUser",
    component: () => import("../views/auth-users/AuthUser.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.userModule.isLogin === true) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
