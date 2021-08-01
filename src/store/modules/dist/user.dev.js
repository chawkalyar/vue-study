"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../../api/user"));

var _useLoading2 = _interopRequireDefault(require("../../common/useLoading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _useLoading = (0, _useLoading2["default"])(),
    loadingStatus = _useLoading.loadingStatus,
    errorStatus = _useLoading.errorStatus;

var userModule = {
  namespaced: true,
  state: function state() {
    return {
      users: [],
      user: {},
      loginUser: [{
        name: "User",
        email: "user@gmail.com",
        password: "password",
        role: "user"
      }, {
        name: "Admin",
        email: "admin@gmail.com",
        password: "password",
        role: "admin"
      }],
      isLogin: true,
      loggedUser: {}
    };
  },
  mutations: {
    login: function login(state, user) {
      var index = state.loginUser.findIndex(function (searchUser) {
        return searchUser.email == user.email && searchUser.password == user.password;
      });

      if (index !== -1) {
        state.isLogin = true;
        state.loggedUser = state.loginUser[index];
      }
    },
    logout: function logout(state, value) {
      state.isLogin = value;
    },
    getUserList: function getUserList(state, users) {
      state.users = users;
    },
    getUserListById: function getUserListById(state, user) {
      state.user = user;
    },
    createUser: function createUser(state, user) {
      state.users.push(user);
    },
    updateUser: function updateUser(state, user) {
      var index = state.users.findIndex(function (u) {
        return u.id === user.id;
      });
      console.log("user update index:", user.id);

      if (index !== -1) {
        state.users[index] = user;
      }
    },
    // deleteUser(state, id) {
    //   let index = state.users.findIndex((data) => {
    //     console.log("delete user index ", id);
    //     data.id === id;
    //   });
    //   if (index !== -1) {
    //     state.users.splice(index, 1);
    //   }
    // },
    deleteUser: function deleteUser(state, id) {
      var index = state.users.findIndex(function (u) {
        return u.id === id;
      });
      console.log("delete user index ", id);

      if (index !== -1) {
        state.users.splice(index, 1);
      }
    }
  },
  actions: {
    login: function login(_ref, user) {
      var commit = _ref.commit;
      commit("login", user);
    },
    logout: function logout(_ref2, value) {
      var commit = _ref2.commit;
      commit("logout", value);
    },
    getUserList: function getUserList(_ref3) {
      var commit = _ref3.commit;
      loadingStatus({
        loading: true
      });

      _user["default"].getUserList().then(function (response) {
        console.log("user", response.data);
        commit("getUserList", response.data);
      })["catch"](function () {
        return errorStatus({
          error: true
        });
      })["finally"](function () {
        loadingStatus({
          loading: false
        });
      });
    },
    getUserListById: function getUserListById(_ref4, id) {
      var commit = _ref4.commit;
      loadingStatus({
        loading: true
      });

      _user["default"].getUserListById(id).then(function (response) {
        commit("getUserListById", response.data);
      })["catch"](function () {
        return errorStatus({
          error: true
        });
      })["finally"](function () {
        loadingStatus({
          loading: false
        });
      });
    },
    createUser: function createUser(_ref5, user) {
      var commit = _ref5.commit;
      loadingStatus({
        loading: true
      });

      _user["default"].createUser(user).then(function (response) {
        commit("createUser", response.data);
      })["catch"](function () {
        return errorStatus({
          error: true
        });
      })["finally"](function () {
        loadingStatus({
          loading: false
        });
      });
    },
    updateUser: function updateUser(_ref6, user) {
      var commit = _ref6.commit;
      loadingStatus({
        loading: true
      });

      _user["default"].updateUser(user).then(function (response) {
        console.log("user :", response.data);
        commit("updateUser", response.data);
      })["catch"](function () {
        return errorStatus({
          error: true
        });
      })["finally"](function () {
        loadingStatus({
          loading: false
        });
      });
    },
    deleteUser: function deleteUser(_ref7, id) {
      var commit = _ref7.commit;
      loadingStatus({
        loading: true
      });

      _user["default"].deleteUser(id).then(function (response) {
        console.log("users :", response.data);
        commit("deleteUser", id);
      })["catch"](function () {
        errorStatus({
          error: true
        });
      })["finally"](function () {
        loadingStatus({
          loading: false
        });
      });
    }
  }
};
var _default = userModule;
exports["default"] = _default;