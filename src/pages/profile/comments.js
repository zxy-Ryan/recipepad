import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";

function CommentsTab({ userObject }) {
  const [comments, setComments] = useState([]);
  const userId = userObject._id;

  const fetchComments = async (userId) => {
    try {
      const fetchedComments = await client.findComments(userId);
      setComments(fetchedComments.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments(userId);
  }, []);

  if (!comments || comments.length === 0) {
    return <div>No comments found.</div>;
  }

  return (
    <ListGroup>
      {comments.map((comment, index) => (
        <ListGroup.Item key={index} action href={`/Details/${comment.recipeId}#comment-${comment._id}`}>
          {comment.commentContent}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CommentsTab;
