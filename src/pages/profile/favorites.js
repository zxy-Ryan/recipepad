import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";

function Favorites({ userId }) {
  const [favorites, setFavorites] = useState(null);

  const fetchFavorites = async (userId) => {
    try {
      const fetchedFavorites = await client.findFavorites(userId);
      setFavorites(fetchedFavorites);
    } catch (error) {
      console.error("Error fetching followings:", error);
    }
  };

  useEffect(() => {
    fetchFavorites(userId);
  }, []);

  if (!favorites || favorites.length === 0) {
    return <div>No followers found.</div>;
  }

  return (
    <ListGroup>
      {favorites.map((favorite, index) => (
        <ListGroup.Item key={index} action href={`/user/${favorite._id}`}>
          {favorite.likedRecipeId}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Favorites;
