import postAPI from "../../api/post";
import useLoading from "../../common/useLoading";
const { loadingStatus, errorStatus } = useLoading();

const postModule = {
  namespaced: true,
  state: () => ({
    posts: [],
    post: {},
  }),
  mutations: {
    getPostList(state, posts) {
      state.posts = posts;
    },
    getPostListById(state, post) {
      state.post = post;
    },
    createPost(state, post) {
      state.posts.push(post);
    },
    updatePost(state, post) {
      let index = state.posts.findIndex((p) => {
        p.id === post.id;
      });
      if (index !== -1) {
        state.posts[index] = post;
      }
    },
    deletePost(state, id) {
      let index = state.posts.findIndex((p) => {
        p.id === id;
      });
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },
  },
  actions: {
    getPostList({ commit }) {
      loadingStatus({ loading: true });
      postAPI
        .getPostList()
        .then((response) => {
          commit("getPostList", response.data);
        })
        .catch(() => errorStatus({ error: true }))
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
    getPostListById({ commit }, id) {
      loadingStatus({ loading: true });
      postAPI
        .getPostListById(id)
        .then((response) => {
          commit("getPostListById", response.data);
        })
        .catch(() => errorStatus({ error: true }))
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
    createPost({ commit }, post) {
      loadingStatus({ loading: true });
      postAPI
        .createPost(post)
        .then((response) => {
          commit("createPost", response.data);
        })
        .catch(() => errorStatus({ error: true }))
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
    updatePost({ commit }, post) {
      loadingStatus({ loading: true });
      postAPI
        .updatePost(post)
        .then((response) => {
          console.log("posts", response.data);
          commit("updatePost", response.data);
        })
        .catch(() => errorStatus({ error: true }))
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
    deletePost({ commit }, id) {
      loadingStatus({ loading: true });
      postAPI
        .deletePost(id)
        .then((response) => {
          console.log("delete post:",respone.data)
          commit("deletePost", response.data);
        })
        .catch(() => errorStatus({ error: true }))
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
  },
  getters: {},
};

export default postModule;
