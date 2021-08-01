import { URL } from "../const/Constant";
import axios from "axios";

const userAPI = {
  getUserList,
  getUserListById,
  createUser,
  updateUser,
  deleteUser,
};
function getUserList() {
  return axios.get(`${URL.BASE}users`);
}

function getUserListById(id) {
  return axios.get(`${URL.BASE}users/${id}`);
}

function createUser(user) {
  return axios.post(`${URL.BASE}users`, user);
}

function updateUser(user) {
  return axios.put(`${URL.BASE}users/${user.id}`, user);
}

function deleteUser(id) {
  return axios.delete(`${URL.BASE}users/${id}`);
}

export default userAPI;
