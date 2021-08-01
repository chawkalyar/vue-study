import MainContent from "./views/main-content/MainContent.vue";
import Login from "./views/login/Login.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "@vue/runtime-core";
import useLoading from "./common/useLoading";


export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    let loginStatus = computed(() => {
      return store.state.userModule.isLogin;
      
    });

    const user = computed(() => {
      return store.state.userModule.loggedUser;
    });

    

    const logout = () => {
      store.dispatch("userModule/logout", false);
      router.push({ name: "Login" });
    };

    const title = ref("default");

    router.beforeEach((to) => {
      title.value = to.name;
    });

    const { commonState } = useLoading();


    return {
      leftDrawerOpen: ref(false),
      loginStatus,
      logout,
      user,
      title,
      commonState,
    };
  },
  components: {
    MainContent,
    Login,
    
  },
};
