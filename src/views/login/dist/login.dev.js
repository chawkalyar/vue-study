"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _vueRouter = require("vue-router");

var _vuex = require("vuex");

var _runtimeCore = require("@vue/runtime-core");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  setup: function setup() {
    var user = (0, _vue.reactive)({
      name: "",
      email: "",
      password: ""
    });
    var store = (0, _vuex.useStore)();
    var router = (0, _vueRouter.useRouter)();
    var loginStatus = (0, _runtimeCore.computed)(function () {
      return store.state.userModule.isLogin;
    });

    var login = function login() {
      store.dispatch("userModule/login", user);

      if (loginStatus.value === true) {
        router.push({
          name: "Weather"
        });
      }
    };

    var createDialog = function createDialog() {
      show.value = true;
    };

    var createUserAccount = function createUserAccount() {
      store.dispatch("userModule/createUserAccount", user);

      if (store.userModule.isUserExist === false) {
        router.push({
          name: "Login"
        });
      }

      show.value = false;
    };

    var show = (0, _vue.ref)(false);
    return _objectSpread({
      password: (0, _vue.ref)(""),
      isPwd: (0, _vue.ref)(true)
    }, (0, _vue.toRefs)(user), {
      loginStatus: loginStatus,
      login: login,
      icon: (0, _vue.ref)(false),
      show: show,
      createDialog: createDialog,
      createUserAccount: createUserAccount
    });
  }
};
exports["default"] = _default;