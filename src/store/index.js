import { createStore } from "vuex";
// import createPersistedState from "vuex-persistedstate";
import userModule from "./modules/user";
import postModule from "./modules/post";
import weatherModule from "./modules/weather";
import todoModule from "./modules/todo";


// const dataState = createPersistedState({
//   paths: ['data']
// })

const store = createStore({
  modules: {
    userModule,
    postModule,
    todoModule,
    weatherModule,
  },
  // plugins: [dataState]
});

export default store;
