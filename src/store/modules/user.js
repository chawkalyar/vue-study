import userAPI from "../../api/user";
import useLoading from "../../common/useLoading";

const { loadingStatus, errorStatus } = useLoading();
const userModule = {
  namespaced: true,
  state: () => ({
    users: [],
    user: {},
    loginUser: [
      {
        id: 1,
        name: "User",
        email: "user@gmail.com",
        password: "password",
        role: "user",
      },

      {
        id: 2,
        name: "Admin",
        email: "admin@gmail.com",
        password: "password",
        role: "admin",
      },
    ],
    isLogin: false,
    loggedUser: {},
    isUserExist: false,
  }),
  mutations: {
    login(state, loginUser) {
      let index = state.loginUser.findIndex((user) => {
        return (
          user.email === loginUser.email &&
          user.password === loginUser.password
        );
      });

      if (index !== -1) {
        state.loggedUser = state.loginUser[index];
        state.isLogin = true;
      }
    },

    logout(state, value) {
      state.isLogin = value;
    },

    getUserList(state, users) {
      state.users = users;
    },
    getUserListById(state, user) {
      state.user = user;
    },
    createUser(state, user) {
      state.users.push(user);
    },
    updateUser(state, user) {
      let index = state.users.findIndex((u) => u.id === user.id);
      console.log("user update index:", user.id);
      if (index !== -1) {
        state.users[index] = user;
      }
    },

    deleteUser(state, id) {
      let index = state.users.findIndex((u) => u.id === id);
      console.log("delete user index ", id);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },

    createUserAccount(state, newUser) {
      const result = state.loginUser.filter(
        (user) => user.email === newUser.email
      );
      if (result.length === 0) {
        state.loginUser.push(newUser);
        state.isUserExist = false;
      } else {
        console.log("user exist");
        state.isUserExist = true;
      }
    },

    deleteAuthUser(state, email) {
      let index = state.loginUser.findIndex((user) => user.email === email);
      console.log("delete user index ", email);
      if (index !== -1) {
        state.loginUser.splice(index, 1);
      }
    },
    updateAuthUser(state, updateUser) {
      let index = state.loginUser.findIndex(
        (user) => user.email === updateUser.email
      );
      if (index !== -1) {
        state.loginUser[index] = updateUser;
      }
    },
  },
  actions: {
    login({ commit }, user) {
      commit("login", user);
    },
    logout({ commit }, value) {
      commit("logout", value);
    },

    getUserList({ commit }) {
      loadingStatus({ loading: true });
      userAPI
        .getUserList()
        .then((response) => {
          console.log("user", response.data);
          commit("getUserList", response.data);
        })
        .catch(() => errorStatus({ error: true }))
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
    getUserListById({ commit }, id) {
      loadingStatus({ loading: true });
      userAPI
        .getUserListById(id)
        .then((response) => {
          commit("getUserListById", response.data);
        })
        .catch(() => errorStatus({ error: true }))
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
    createUser({ commit }, user) {
      loadingStatus({ loading: true });
      userAPI
        .createUser(user)
        .then((response) => {
          commit("createUser", response.data);
        })
        .catch(() => errorStatus({ error: true }))
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
    updateUser({ commit }, user) {
      loadingStatus({ loading: true });
      userAPI
        .updateUser(user)
        .then((response) => {
          console.log("user :", response.data);
          commit("updateUser", response.data);
        })
        .catch(() => errorStatus({ error: true }))
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
    deleteUser({ commit }, id) {
      loadingStatus({ loading: true });
      userAPI
        .deleteUser(id)
        .then((response) => {
          console.log("users :", response.data);
          commit("deleteUser", id);
        })
        .catch(() => {
          errorStatus({ error: true });
        })
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },

    createUserAccount({ commit }, user) {
      commit("createUserAccount", user);
    },
    deleteAuthUser({ commit }, email) {
      commit("deleteAuthUser", email);
    },

    updateAuthUser({ commit }, user) {
      commit("updateAuthUser", user);
    },
  },
};

export default userModule;
