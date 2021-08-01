import { reactive, readonly } from "vue";

const initialState = {
  loading: false,
  error: false,
};

const commonState = reactive(initialState);

const actions = {
  loadingStatus: ({ loading }) => {
    commonState.loading = loading;
  },

  errorStatus: ({ error }) => {
    commonState.error = error;
  },
};

export default () => ({
  commonState: readonly(commonState),
  ...actions,
});
