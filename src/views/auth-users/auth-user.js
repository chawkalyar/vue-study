import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { reactive, ref, toRefs } from "vue";

export default {
  setup() {
    const store = useStore();
    let user = reactive({
      name: "",
      email: "",
      password: "",
      role: "",
    });

    const router = useRouter();
    const authUser = computed(() => {
      return store.state.userModule.loginUser;
    });

    const columns = [

      {
        name: "id",
        align: "left",
        label: "No",
        field: "id",
        sortable: true,
      },
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },

      {
        name: "email",
        align: "left",
        label: "Email",
        field: "email",
        sortable: true,
      },
      {
        name: "password",
        align: "left",
        label: "Password",
        field: "password",
        sortable: true,
      },
      {
        name: "role",
        align: "left",
        label: "Role",
        field: "role",
        sortable: true,
      },
      { name: "actions", align: "left", label: "Actions", field: "actions" },
    ];

    const deleteAuthUser = () => {
      store.dispatch("userModule/deleteAuthUser", deleteUserID.value);
      console.log(deleteUserID);
      showDelete.value = false;
    };

    const deleteDialog = (index) => {
      showDelete.value = true;
      deleteUserID.value = index;
    };

    const deleteUserID = ref(-1);
    const showDelete = ref(false);

    const editDialog = (editUser) => {
      user.name = editUser.name;
      user.email = editUser.email;
      user.password = editUser.password;
      user.role = editUser.role;
      show.value = true;

      isEdit.value = true;
      console.log("authUser::", editUser);
    };

    const updateAuthUser = () => {
      store.dispatch("userModule/updateAuthUser", user);
      show.value = false;
    };
    const show = ref(false);

    const createDialog = () => {
      show.value = true;
      isEdit.value = false;
      (user.name = ""),
        (user.email = ""),
        (user.password = ""),
        (user.role = ""),
        console.log("create::", isEdit.value);
    };
    const createUser = () => {
      if (
        user.name !== "" &&
        user.email !== "" &&
        user.password !== "" &&
        user.role !== ""
      ) {
        user.id = authUser.value.length + 1;
        store.dispatch("userModule/createUserAccount", user);
        if (store.state.userModule.isUserExist === true) {
          show.value = true;
        } else {
          show.value = false;
        }
      }
    };

    const isEdit = ref(false);
    const existUser = computed(() => {
      return store.state.userModule.isUserExist;
    });

    return {
      store,
      router,
      authUser,
      columns,
      deleteAuthUser,
      showDelete,
      deleteDialog,
      editDialog,
      createDialog,
      updateAuthUser,
      createUser,
      show,
      isEdit,
      ...toRefs(user),
      options: ["admin", "user"],
      existUser,
    };
  },
};
