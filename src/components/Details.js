import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useSelector } from "react-redux";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/components`;

const RecipeDetails = ({ match }) => {
  const { recipeId } = useParams();
  // const recipeId='52772'
  const [recipe, setRecipe] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const REMOTE_URL = "https://recipepad-server.onrender.com";
  const LOCAL_URL = "http://localhost:5000";
  const BASE_URL = REMOTE_URL || LOCAL_URL;
  const URL = `${BASE_URL}/api/comments`;
  const URLSaved = `${BASE_URL}/api/comments/saved`;
  // const [user, setUser] = useState({
  //   id: '656707bb65aba2b8a9f430f8',
  //   // username: 'example_user',
  //   // email: 'user@example.com',
  // });
  const [isSaved, setIsSaved] = useState(false);
  // const [userName, setUserName] = useState('');
  // const user = useSelector(state => state.auth.user);
  const { user } = useSelector((state) => ({ ...state.auth }));

  const userId = user?.result?._id
  const userName = user?.result?.name
  


  const getCommentsForRecipe = async (recipeId) => {
    const response = await axios.get(`${URL}/${recipeId}`);
    return response.data;
  };

  const getSavedRecipe = async (userId) => {
    const response = await axios.get(`${URLSaved}/${userId}`);
    return response.data;
  };

  //   const createComment = async (commentData) => {
  //     const response = await axios.post(URL, commentData);
  //     // return response.data;
  //     return response.status;
  // };
  const createComment = async (commentData) => {
    try {
      const response = await axios.post(URL, commentData);
      return response.status === 200;
    } catch (error) {
      console.error("Failed to post comment:", error);
      return false;
    }
  };

  const formatDate = (dateString) => {
    return dateString.substring(0, 10);
  };

  // const updateSavedRecipe = async (userId, newRecipe) => {
  //   try {
  //     const updateSavedRecipe = await axios.post(`${URL}/update/${userId}`, userId, newRecipe);
  //     // return response.status === 200;
  //     return updateSavedRecipe
  //   } catch (error) {
  //     console.error('Failed to update savedRecipe:', error);
  //     return false;
  //   }
  // };

  const updateSavedRecipe = async (newRecipe, userId) => {
    try {
      const response = await axios.post(`${URL}/update/${userId}`, newRecipe);
      return response;
    } catch (error) {
      console.error("Failed to update savedRecipe:", error);
    }
  };

  useEffect(() => {
    const fetchRecipeAndComments = async () => {
      try {
        // 获取菜谱信息
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const data = await response.json();
        setRecipe(data.meals[0]);

        const recipeSaved = isRecipeSaved();
        // const userId = user.id
        // const savedRecipe = await getSavedRecipe(userId);
        // const isRecipeSaved = savedRecipe.includes(recipeId);
        // console.log(savedRecipe)
        // console.log(isRecipeSaved);

        setIsSaved(recipeSaved);
        // 获取评论信息
        console.log(recipeId);
        const commentsData = await getCommentsForRecipe(recipeId);
        console.log("fetch1");
        console.log(commentsData.comments);
        setComments(commentsData.comments);
        // console.log(comments)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRecipeAndComments();
  }, [recipeId]);

  const handlePostComment = async () => {
    // const userId = user.id;
    // const userId = userId;
    // const commentId = uuidv4();
    const commentData = {
      // commentId: commentId,
      userId: userId,
      recipeId: recipeId,
      commentContent: commentContent,
      time: new Date().toISOString(),
    };
    try {
      const response = await createComment(commentData);
      console.log("this is response" + response);
      if (response) {
        setCommentContent("");

        setComments([...comments, commentData]);
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(`${URL}/getUserName/${user.Id}`);
  //       // setUserName(response.data.name); // 假设响应中有用户的名字属性
  //       console.log("fetchUserData")
  //       console.log(response)
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   if (user.Id) {
  //     fetchUserData();
  //   }
  // }, [user.Id]);

  const isRecipeSaved = async () => {
    try {
      // const userId = user.id;

      // console.log(userId)
      const savedRecipe = await getSavedRecipe(userId);
      console.log("isRecipeSaved");
      console.log(savedRecipe);
      const isRecipeSaved = savedRecipe.user.saveRecipe.includes(recipeId);

      console.log(isRecipeSaved);
      return isRecipeSaved;
    } catch (error) {
      console.error("Error fetching savedRecipe:", error);
    }
  };

  const handleSave = async () => {
    if (user) {
      if (isSaved) {
        console.log("Unsave recipe");

        // const savedRecipe = await getSavedRecipe(user.id);
        const savedRecipe = await getSavedRecipe(userId);

        const updatedSaveRecipe = savedRecipe.user.saveRecipe.filter(
          (id) => id !== recipeId
        );
        savedRecipe.user.saveRecipe = updatedSaveRecipe;
        console.log(savedRecipe.user.saveRecipe);
        // const response = await updateSavedRecipe(savedRecipe.user.saveRecipe, user.id)
        const response = await updateSavedRecipe(
          savedRecipe.user.saveRecipe,
          userId
        );

        console.log(isSaved);

        setIsSaved(!isSaved);
      } else {
        // const savedRecipe = await getSavedRecipe(user.id);
        const savedRecipe = await getSavedRecipe(userId);
        const updatedSaveRecipe = savedRecipe.user.saveRecipe.filter(
          (id) => id !== recipeId
        );

        savedRecipe.user.saveRecipe = [...updatedSaveRecipe, recipeId];
        // const response = await updateSavedRecipe(savedRecipe.user.saveRecipe, user.id);
        const response = await updateSavedRecipe(
          savedRecipe.user.saveRecipe,
          userId
        );

        console.log(savedRecipe.user.saveRecipe);
        setIsSaved(!isSaved);
      }
    } else {
      console.log("User is not logged in");
    }
  };
  // console.log("t1")
  // console.log(Object.values(comments))

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1400px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <div className="container mt-4" style={{ textAlign: "left" }}>
        {recipe ? (
          <div className="row">
            <div className="col-md-6 mb-4">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <h2>{recipe.strMeal}</h2>
              <p>
                {recipe.strArea} | {recipe.strTags}
              </p>
              <h4>Ingredients</h4>
              <ul>
                {Object.keys(recipe)
                  .filter((key) => key.includes("strIngredient") && recipe[key])
                  .map((ingredientKey, index) => (
                    <li key={index}>
                      {recipe[ingredientKey]} -{" "}
                      {recipe[`strMeasure${ingredientKey.slice(13)}`]}
                    </li>
                  ))}
              </ul>
              <h4>Instructions</h4>
              <p>{recipe.strInstructions}</p>
            </div>
          </div>
        ) : (
          <p>Loading recipe...</p>
        )}
        {/* 保存或取消保存按钮 */}
        {user && (
          <div className="mb-4">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              style={{ backgroundColor: "black" }}
            >
              {isSaved ? "Unsave" : "Save"}
            </button>
          </div>
        )}

        {user && (
          <div className="mb-4">
            <h4>Comments</h4>
            <textarea
              rows="4"
              className="form-control mb-2"
              placeholder="Write your comment here..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary"
              onClick={handlePostComment}
              style={{ backgroundColor: "black" }}
            >
              Post
            </button>
          </div>
        )}

        {/* 显示已有的评论 */}
        <div className="mb-4">
          <ul style={{ listStyle: "none" }}>
            {/* {Object.entries(comments).map(([key, value], index) => (
  <li key={index}>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {key === 'userId' && (
              <Link to={`/Profile/${value}`}>
                <span style={{ marginRight: '10px' }}>{value}</span>
              </Link>
            )}
            {key === 'time' && (
              <span>{value}</span>
            )}
          </div>
          {key === 'commentContent' && (
            <div>{value}</div>
          )}
        </div>
      </li>
))} */}
            {user &&
              comments.map((comment, index) => (
                <li key={index}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Link to={`/Profile/${comment.userId}`}>
                        {/* <span style={{ marginRight: '10px' }}>{comment.userId}</span> */}
                        <span style={{ marginRight: "10px" }}>{userName}</span>
                      </Link>
                      <span>{formatDate(comment.time)}</span>
                    </div>
                    <p>{comment.commentContent}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
