import todoAPI from "../../api/todo";
import useLoading from "../../common/useLoading";
const { loadingStatus, errorStatus } = useLoading();

const todoModule = {
  namespaced: true,
  state: () => ({
    todos: [],
    todo: {},
  }),
  mutations: {
    getTodoList(state, todos) {
      state.todos = todos;
    },
    getTodoListById(state, todo) {
      state.todo = todo;
    },
    createTodo(state, todo) {
      state.todos.push(todo);
    },

    updateTodo(state, todo) {
      let index = state.todos.findIndex((t) => t.id === todo.id);
      console.log("todo update index:", todo.id);
      if (index !== -1) {
        state.todos[index] = todo;
      }
    },
    deleteTodo(state, id) {
      let index = state.todos.findIndex((todo) => todo.id === id);
      console.log("delete todo index ", id);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
  },
  actions: {
    getTodoList({ commit }) {
      loadingStatus({ loading: true });
      todoAPI.getTodoList().then((response) => {
        console.log("todo", response);
        commit("getTodoList", response.data);
      });
    },
    getTodoListById({ commit }, id) {
      loadingStatus({ loading: true });
      todoAPI.getTodoListById(id).then((response) => {
        commit("getTodoListById", response.data);
      });
    },
    createTodo({ commit }, todo) {
      loadingStatus({ loading: true });
      todoAPI
        .createTodo(todo)
        .then((response) => {
          commit("createTodo", response.data);
        })
        .catch(() => {
          errorStatus({ error: true });
        })
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
    updateTodo({ commit }, todo) {
      loadingStatus({ loading: true });
      todoAPI
        .updateTodo(todo)
        .then((response) => {
          console.log("Todos res :: ", response.data);
          commit("updateTodo", response.data);
        })
        .catch(() => {
          errorStatus({ error: true });
        })
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },

    deleteTodo({ commit }, id) {
      loadingStatus({ loading: true });
      todoAPI
        .deleteTodo(id)
        .then((response) => {
          console.log("Todos res :: ", response.data);
          commit("deleteTodo", id);
        })
        .catch(() => {
          errorStatus({ error: true });
        })
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },

    addTodo({ commit }, todo) {
      commit("addTodo", todo);
    },
  },
  getters: {},
};

export default todoModule;
