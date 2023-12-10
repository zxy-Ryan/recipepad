import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

// export const BASE_API = process.env.REACT_APP_ROOT;
// export const USERS_API = `${BASE_API}/users`;
export const BASE_API = "http://localhost:5000";
export const USERS_API = `${BASE_API}/users`;

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
  console.log(BASE_API);
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