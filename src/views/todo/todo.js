import { reactive, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import useLoading from "../../common/useLoading";

export default {
  setup() {
    const store = useStore();
    store.dispatch("todoModule/getTodoList");

    let todo = reactive({
      id: -1,
      title: "",
      completed: "",
    });

    const todos = computed(() => {
      return store.state.todoModule.todos;
    });

    const deleteTodo = () => {
      store.dispatch("todoModule/deleteTodo", deleteTodoID.value);
      console.log(deleteTodoID);
      showDelete.value = false;
    };

    const deleteTodoID = ref(-1);

    const deleteDialog = (index) => {
      showDelete.value = true;
      deleteTodoID.value = index;
    };

    const editDialog = (editTodo) => {
      show.value = true;
      todo.id = editTodo.id;
      todo.title = editTodo.title;
      todo.completed = editTodo.completed;
      isEdit.value = true;
      console.log("todo", editTodo);
    };

    const createDialog = () => {
      show.value = true;
      isEdit.value = false;
      todo.title = "";
      todo.completed = "";
      console.log("todo", isEdit.value);
    };

    const updateTodo = () => {
      todo.completed = todo.completed === "true" ? true : false;
      store.dispatch("todoModule/updateTodo", todo);
      show.value = false;
    };

    const createTodo = () => {
      //change todo.completed to boolean
      //done
      if (todo.title !== "" && todo.completed !== "" ) {     
      todo.completed = todo.completed === "true" ? true : false;
      store.dispatch("todoModule/createTodo", todo);
      show.value = false;
      }
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
      ...toRefs(todo),
      todos,
      deleteTodo,
      deleteDialog,
      showDelete,
      show,
      commonState,
      updateTodo,
      isEdit,
      editDialog,
      createTodo,
      createDialog,
    };
  },
};
