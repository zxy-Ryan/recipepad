import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";

function Favorites({ userObject }) {
  const [favorites, setFavorites] = useState(null);
  const userId = userObject._id;

  const fetchFavorites = async (userId) => {
    try {
      const fetchedFavorites = await client.findFavorites(userId);
      const favoriteRecipes = await Promise.all(
        fetchedFavorites.map(async (favorite) => {
          const recipeDetails = await client.findMealById(favorite.likedRecipeId);
          return recipeDetails;
        })
      );
      setFavorites(favoriteRecipes);
    } catch (error) {
      console.error("Error fetching followings:", error);
    }
  };

  useEffect(() => {
    fetchFavorites(userId);
  }, []);

  if (!favorites || favorites.length === 0) {
    return <div>No favorites found.</div>;
  }

  return (
    <ListGroup>
      {favorites.map((favorite, index) => (
        <ListGroup.Item key={index} action href={`/Details/${favorite.idMeal}`}>
          {favorite.strMeal}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Favorites;
