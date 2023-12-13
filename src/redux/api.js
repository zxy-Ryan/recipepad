import axios from "axios";

const REMOTE_URL = "https://recipepad-server.onrender.com";
const LOCAL_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: REMOTE_URL||LOCAL_URL,
  withCredentials: true,
});

export const signIn = (formData) => API.post("/users/signin", formData);

export const signUp = (formData) => API.post("/users/signup", formData);

export const googleSignIn = (result) => API.post("/users/googleSignIn", result);
