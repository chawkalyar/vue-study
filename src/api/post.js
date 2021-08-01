import { URL } from "../const/Constant";
import axios from "axios";

const postAPI = {
  getPostList,
  getPostListById,
  createPost,
  updatePost,
  deletePost,
};
function getPostList() {
  return axios.get(`${URL.BASE}posts`);
}

function getPostListById(id) {
  return axios.get(`${URL.BASE}posts/${id}`);
}

function createPost(post) {
  return axios.post(`${URL.BASE}posts`, post);
}

function updatePost(post) {
  return axios.put(`${URL.BASE}posts/${post.id}`, post);
}

function deletePost(id) {
  return axios.delete(`${URL.BASE}posts/${id}`);
}

export default postAPI;
