import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";
import "./index.css";

function Followers({ userObject }) {
  const [followers, setFollowers] = useState([]);
  const userId = userObject._id;

  const fetchFollowers = async (userId) => {
    try {
      const fetchedFollowers = await client.findFollowers(userId);
      setFollowers(fetchedFollowers);
    } catch (error) {
      console.error("Error fetching followings:", error);
    }
  };

  useEffect(() => {
    fetchFollowers(userId);
  }, []);

  if (!followers || followers.length === 0) {
    return <div>No followers found.</div>;
  }

  return (
    <ListGroup className="follower-list mt-3 ms-3">
      {followers
        .filter(follower => follower.followerId) 
        .map((follower, index) => (
          <ListGroup.Item key={index} action href={`/profile/${follower.followerId._id}`}>
            {follower.followerId.name}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}

export default Followers;
