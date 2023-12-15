import axios from "axios";

const REMOTE_URL = "https://recipepad-server.onrender.com";
const LOCAL_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: REMOTE_URL || LOCAL_URL,
  // baseURL: LOCAL_URL,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) =>  API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createRecipe = (recipeData) => API.post("/recipe", recipeData);
export const getRecipes = () => API.get("/recipe");
export const getRecipe = (id) => API.get(`/recipe/${id}`);

export const signout = async () => {
  const response = await API.post("/signout");
  return response.data;
};