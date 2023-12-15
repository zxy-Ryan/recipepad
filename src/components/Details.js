
import React, { useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useSelector } from 'react-redux';
import { FaRegUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/components`;


const RecipeDetails = ({ match }) => {
  const { recipeId } = useParams();
  // const recipeId='52772'
  const [recipe, setRecipe] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const REMOTE_URL = "https://recipepad-server.onrender.com";
  const LOCAL_URL = "http://localhost:5000";
  const BASE_URL = REMOTE_URL||LOCAL_URL;
  // const BASE_URL = LOCAL_URL;
  const URL = `${BASE_URL}/api/comments`;
  const URLSaved =  `${BASE_URL}/api/comments/saved`;
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
  const role = user?.result?.role


  const getCommentsForRecipe = async (recipeId) => {
    const response = await axios.get(`${URL}/${recipeId}`);
    return response.data;
  };

  const getSavedRecipe = async (userId) => {
    console.log(`${URLSaved}/${userId}`);
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
      console.error('Failed to post comment:', error);
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
    const response = await axios.put(`${REMOTE_URL}/update/${userId}`, newRecipe);
    return response
  } catch (error) {
    console.error('Failed to update savedRecipe:', error);
  }

}

  
  useEffect(() => {
    const fetchRecipeAndComments = async () => {
      try {
        // 获取菜谱信息
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data = await response.json();
        setRecipe(data.meals[0]);
        const recipeSaved = await isRecipeSaved();
        setIsSaved(recipeSaved); 
        // 获取评论信息
        const commentsData = await getCommentsForRecipe(recipeId);
        setComments(commentsData.comments);
        scrollToComment();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const scrollToComment = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView();
          }
        }, 0);
      }
    };

    fetchRecipeAndComments();
  },  [recipeId,userId]);

  

  
  const handlePostComment = async () =>{
    if(user){
       // const userId = user.id;
    // const userId = userId;
    // const commentId = uuidv4(); 
    const commentData = {
      // commentId: commentId,
      userId: userId,
      userName: userName,
      recipeId: recipeId, 
      commentContent: commentContent,
      time: new Date().toISOString(), 
  };
  try {
      const response = await createComment(commentData)
      if (response) {
      
      setCommentContent(''); 
      
      setComments([...comments,commentData])
      } else {

        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
    }else{
      alert('User is not logged in'); 
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

  const isRecipeSaved = async () =>{
    try {
      // const userId = user.id;
      
      // console.log(userId)
      console.log(userId);
      const savedRecipe = await getSavedRecipe(userId);
      console.log("isRecipeSaved");
      console.log(savedRecipe);
      if (savedRecipe) {
        const isRecipeSaved = savedRecipe.user.saveRecipe.includes(recipeId);
        return isRecipeSaved;
      }
      else{
        const isRecipeSaved = false;
        return isRecipeSaved;
      }
      
    } catch (error) {
      console.error('Error fetching savedRecipe:', error);
    }

  };



  const handleSave = async () =>{
    if (user) {
      if (isSaved) {
       
        

        // const savedRecipe = await getSavedRecipe(user.id);
        const savedRecipe = await getSavedRecipe(userId);
        
        const updatedSaveRecipe = savedRecipe.user.saveRecipe.filter(id => id !== recipeId);
        savedRecipe.user.saveRecipe = updatedSaveRecipe
        // const response = await updateSavedRecipe(savedRecipe.user.saveRecipe, user.id)
        const response = await updateSavedRecipe(savedRecipe.user.saveRecipe, userId)
        
        
        
        setIsSaved(!isSaved);
        
      } else {
       
        // const savedRecipe = await getSavedRecipe(user.id);
        const savedRecipe = await getSavedRecipe(userId);
        console.log(userId);
        const updatedSaveRecipe = savedRecipe.user.saveRecipe.filter(id => id !== recipeId);
        
        savedRecipe.user.saveRecipe = [...updatedSaveRecipe, recipeId];
        // const response = await updateSavedRecipe(savedRecipe.user.saveRecipe, user.id);
        const response = await updateSavedRecipe(savedRecipe.user.saveRecipe, userId)
                setIsSaved(!isSaved);
      }
    } else {
      console.log('User is not logged in');
  
    }
  };
  // console.log("t1")
  // console.log(Object.values(comments))

  return (
    <div >
    <div className="container mt-4" style={{ textAlign: 'left' }}>
      {recipe ? (
        <div className="row">
          <div className="col-md-6 mb-4">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>{recipe.strMeal}</h2>
            <p>{recipe.strArea} | {recipe.strTags}</p>
            <h4>Ingredients</h4>
            <ul>
              {Object.keys(recipe)
                .filter(key => key.includes('strIngredient') && recipe[key])
                .map((ingredientKey, index) => (
                  <li key={index}>{recipe[ingredientKey]} - {recipe[`strMeasure${ingredientKey.slice(13)}`]}</li>
                ))}
            </ul>
            <h4>Instructions</h4>
            <p>{recipe.strInstructions}</p>
          </div>
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
       {(role === 'admin' || role==='vip') && (
        <div className="mb-4">
          <button className="btn btn-primary" onClick={handleSave} style={{ backgroundColor:'black'}}>
            {isSaved ? 'Unsave' : 'Save'}
          </button>
        </div>
      )}


      {(
        <div className="mb-4">
          <h4>Comments</h4>
          <textarea
            rows="4"
            className="form-control mb-2"
            placeholder="Write your comment here..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <button className="btn btn-primary" onClick={handlePostComment} style={{ backgroundColor:'black'}}>
            Post
          </button>
        </div>
      )}
      

      {/* 显示已有的评论 */}
      <div class="container my-5 py-5">
          <div class="row d-flex">
            <div class="col-md-12 col-lg-10">
              <div class="card text-dark">
                {user &&
                  comments.map((comment, index) => (
                    <>
                      <div class="card-body p-4">
                        {index === 0 && (
                          <>
                            <h4 className="mb-0">Recent comments</h4>
                            <p className="fw-light mb-4 pb-2">
                              Latest Comments section by users
                            </p>
                          </>
                        )}
                        <div class="d-flex flex-start">
                          <div>
                            <div className="d-flex align-items-center">
                              <FaRegUser className="me-2" />
                              <Link className="fw-bold mb-1" to={`/Profile/${comment.userId}`}>
                                {comment.userName}
                              </Link>
                            </div>
          
                            <div class="d-flex align-items-center mb-3">
                            <MdDateRange className="me-2"/>
                              <p class="mb-0">{formatDate(comment.time)}</p>
                            </div>
                            <div className="d-flex align-items-center">
                            <FaRegCommentDots className="me-2" />
                            <p class="mb-0">{comment.commentContent}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr class="my-0" />
                    </>
                  ))}
              </div>
            </div>
          </div>

    </div>
    </div>
    </div>
  );
};

export default RecipeDetails;
