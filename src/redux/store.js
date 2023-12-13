import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import RecipeReducer from "./features/recipeSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    recipe: RecipeReducer,
  },
});
