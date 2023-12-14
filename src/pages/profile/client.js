import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

// export const BASE_API = process.env.REACT_APP_ROOT;
// export const USERS_API = `${BASE_API}/users`;
const REMOTE_URL = "https://recipepad-server.onrender.com";
const LOCAL_URL = "http://localhost:5000";
const BASE_URL = REMOTE_URL||LOCAL_URL;
export const USERS_API = `${BASE_URL}/users`;

export const deleteUser = async (user) => {
  const response = await request.delete(
    `${USERS_API}/${user._id}`);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await request.get(`${USERS_API}/allUsers`);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};


export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};


export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);
  return response.data;
};

export const findFollowers = async (userId) => {
  const response = await request.get(`${USERS_API}/${userId}/followers`);
  return response.data;
};

export const findFollowings = async (userId) => {
  const response = await request.get(`${USERS_API}/${userId}/followings`);
  return response.data;
};

export const findFavorites = async (userId) => {
  const response = await request.get(`${USERS_API}/${userId}/favorites`);
  return response.data;
};

export const findMealById = async (idMeal) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  const data = await response.json();
  return data.meals[0]; 
};

export const findComments = async (userId) => {
  const response = await request.get(`${BASE_URL}/api/comments/user/${userId}`);
  console.log(response);
  return response.data;
};