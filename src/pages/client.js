import axios from "axios";

export const findRecipe = async (searchTerm) => {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
  );

  return response.data.meals;
};


export const findRandomRecipes = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const meals = data.meals;
    const selectedMeals = meals.slice(0, 10);
    return selectedMeals;
  } catch (error) {
    console.error('Fetch meals failed:', error);
  }
};

export const findRecipesByCategory = async (category) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const meals = data.meals;
    return meals;
  } catch (error) {
    console.error('Fetch meals failed:', error);
  }
};

export const findRecipesByArea = async (area) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const meals = data.meals;
    return meals;
  } catch (error) {
    console.error('Fetch meals failed:', error);
  }
};

export const findCategories = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const categories = data.meals;
    return categories;
  } catch (error) {
    console.error('Fetch meals failed:', error);
  }
};

export const findArea = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const categories = data.meals;
    return categories;
  } catch (error) {
    console.error('Fetch meals failed:', error);
  }
};
