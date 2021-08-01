import { reactive, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import useLoading from "../../common/useLoading";
export default {
  setup() {
    const store = useStore();
    store.dispatch("userModule/getUserList");

    let user = reactive({
      id: -1,
      name: "",
      username: "",
      email: "",
      website: "",
    });

    const columns = [
      {
        name: "id",
        required: true,
        label: "ID",
        align: "left",
        field: (row) => row.id,
        format: (val) => `${val}`,
        sortable: true,
        
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: "name",
        sortable: true,
      },
      {
        name: "username",
        align: "left",
        label: "UserName",
        field: "username",
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
        name: "website",
        align: "left",
        label: "Website",
        field: "website",
        sortable: true,
      },
    ];

    const users = computed(() => {
      return store.state.userModule.users;
    });

    const authUser = computed(() => {
      return store.state.userModule.loggedUser;
    });

    const deleteUser = () => {
      store.dispatch("userModule/deleteUser", deleteUserID.value);
      console.log(deleteUserID);
      showDelete.value = false;
    };

    const deleteUserID = ref(-1);

    const showDialog = (action, editUser = undefined) => {
      if (action.delete === true) {
        showDelete.value = true;
        deleteUserID.value = editUser.id;
        console.log(editUser.id);
      } else {
        show.value = true;
        if (action.edit && editUser !== undefined) {
          user.id = editUser.id;
          user.name = editUser.name;
          user.username = editUser.username;
          user.email = editUser.email;
          user.website=editUser.website;
        } else {
          user.name = "";
          user.username = "";
          user.email = "";
          user.website="";
        }
        isEdit.value = action.edit;
        console.log(editUser);
      }
    };

    const createUser = () => {
      if (user.name !== "" && user.username !== "" && user.email !== "") {
        user.id = users.value.length + 1;
        store.dispatch("userModule/createUser", user);
        show.value = false;
      }
    };
    const updateUser = () => {
      store.dispatch("userModule/updateUser", user);
      show.value = false;
    };
    const showDelete = ref(false);
    const show = ref(false);
    const isEdit = ref(false);

    const { commonState, errorStatus } = useLoading();
    watch(
      () => {
        return { ...commonState };
      },
      (newValue) => {
        if (newValue.error === true) {
          setTimeout(() => {
            errorStatus({ error: false });
          }, 4000);
        }
      }
    );

    return {
      ...toRefs(user),
      columns,
      authUser,
      users,
      deleteUser,
      showDialog,
      showDelete,
      show,
      commonState,
      isEdit,
      createUser,
      updateUser,
      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
};
