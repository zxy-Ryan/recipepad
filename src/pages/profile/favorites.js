import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";
// import { getSavedRecipe } from "../../components/Details"
import axios from "axios";

function Favorites({ userObject }) {
  const [favorites, setFavorites] = useState(null);
 
  const userId = userObject._id;
  console.log(userId);
  const REMOTE_URL = "https://recipepad-server.onrender.com";
  const LOCAL_URL = "http://localhost:5000";
  const BASE_URL = REMOTE_URL||LOCAL_URL;
  // const BASE_URL = LOCAL_URL;
  const URL = `${BASE_URL}/api/comments`;
  const URLSaved =  `${BASE_URL}/api/comments/saved`;
  const [mealName, setMealName] = useState(null);

 

  const getSavedRecipe = async (userId) => {
    console.log(`${URLSaved}/${userId}`);
    const response = await axios.get(`${URLSaved}/${userId}`);
    return response.data;
  };
  const fetchFavorites = async (userId) => {
    try {
      // const fetchedFavorites = await client.findFavorites(userId);
      console.log("try");
      const fetchedFavorites = await getSavedRecipe(userId);
      console.log(fetchedFavorites);
      const recipes=fetchedFavorites.user.saveRecipe;
      const favoriteRecipes = await Promise.all(
        recipes.filter(favorite => favorite !== '').map(async (favorite) => {
          // const recipeDetails = await client.findMealById(favorite.likedRecipeId);
          const recipeDetails = await client.findMealById(favorite);
          return recipeDetails;
        })
      );
      console.log("saved receipe");
      console.log(recipes);
      // setFavorites(recipes);
      setFavorites(favoriteRecipes);
    } catch (error) {
      console.error("Error fetching followings:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect")
    fetchFavorites(userId);
  }, []);

  if (!favorites || favorites.length === 0) {
    return <div>No favorites found.</div>;
  }

  return (
    <ListGroup style={{ textAlign: 'left' }}>
    {favorites.map((favorite, index) => (
        <ListGroup.Item key={index} action href={`/Details/${favorite.idMeal}`}>
          {favorite.strMeal}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Favorites;
