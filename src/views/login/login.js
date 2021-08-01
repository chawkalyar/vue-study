import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
  setup() {
    const user = reactive({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
    const store = useStore();

    const router = useRouter();

    const loginStatus = computed(() => {
      return store.state.userModule.isLogin;
    });

    const login = () => {
      store.dispatch("userModule/login", user);
      if (loginStatus.value === true) {
        router.push({ name: "Weather" });
      }
    };

    const createDialog = () => {
      show.value = true;
    };

    const authUser = computed(() => {
      return store.state.userModule.loginUser;
    });

    const createUserAccount = () => {
      if (user.name !== "" && user.email !== "" && user.password !== "") {
        user.id = authUser.value.length + 1;
        store.dispatch("userModule/createUserAccount", user);
        if (store.state.userModule.isUserExist === true) {
          show.value = true;
        } else {
          show.value = false;
        }
      }
    };

    const existUser = computed(() => {
      return store.state.userModule.isUserExist;
    });

    const show = ref(false);

    return {
      password: ref(""),
      isPwd: ref(true),
      ...toRefs(user),
      loginStatus,
      login,
      icon: ref(false),
      show,
      createDialog,
      createUserAccount,
      existUser,
      authUser
    };
  },
};
