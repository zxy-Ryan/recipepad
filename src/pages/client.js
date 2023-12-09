import axios from "axios";

export const findRecipe = async (searchTerm) => {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
  );

  return response.data.meals;
};
