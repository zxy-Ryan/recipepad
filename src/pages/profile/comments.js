import React from 'react';
import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CommentsTab({ comments }) {
    return (
        <ListGroup>
            {comments.map((comment, index) => (
                <ListGroup.Item key={index} action href={`/recipe/${comment.recipeId}#comment-${comment.id}`}>
                    {comment.text}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default CommentsTab;
