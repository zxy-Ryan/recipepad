import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createRecipe = createAsyncThunk(
  "recipe/createRecipe",
  async ({ updatedRecipeData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createRecipe(updatedRecipeData);
      toast.success("Recipe Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRecipes = createAsyncThunk(
  "recipe/getRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getRecipes();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRecipe = createAsyncThunk(
  "recipe/getRecipe",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getRecipe(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipe: {},
    recipes: [],
    userRecipes: [],
    // tagRecipes: [],
    // relatedRecipes: [],
    // currentPage: 1,
    // numberOfPages: null,
    // totalTags: [],
    error: "",
    loading: false,
    // totalRecipesData: [],
    // loadedRecipes: [],
    // totalRecipes: null,
  },
  // reducers: {
  //   setCurrentPage: (state, action) => {
  //     state.currentPage = action.payload;
  //   },
  // },
  extraReducers: {
    [createRecipe.pending]: (state, action) => {
      state.loading = true;
    },
    [createRecipe.fulfilled]: (state, action) => {
      state.loading = false;
      state.recipes = [action.payload];
    },
    [createRecipe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getRecipes.pending]: (state, action) => {
      state.loading = true;
    },
    [getRecipes.fulfilled]: (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
    },
    [getRecipes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getRecipe.pending]: (state, action) => {
      state.loading = true;
    },
    [getRecipe.fulfilled]: (state, action) => {
      state.loading = false;
      state.recipe = action.payload;
    },
    [getRecipe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

// export const { setCurrentPage } = recipeSlice.actions;

export default recipeSlice.reducer;
