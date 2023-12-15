import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";
import "./index.css";

function Followings({ userObject, activeKey }) {
  const [followings, setFollowings] = useState(null);
  const userId = userObject._id;

  const fetchFollowings = async (userId) => {
    try {
      const fetchedFollowings = await client.findFollowings(userId);
      setFollowings(fetchedFollowings);
      console.log(fetchedFollowings);
    } catch (error) {
      console.error("Error fetching followings:", error);
    }
  };

  useEffect(() => {
    if (activeKey === "followings") {
      fetchFollowings(userId);
    }
  }, [activeKey, userId]);

  if (!followings || followings.length === 0) {
    return <div>No followings found.</div>;
  }

  return (
    <ListGroup className="following-list mt-3 ms-3">
      {followings.filter(following => following.followingId) 
      .map((following, index) => (
        <ListGroup.Item key={index} action href={`/profile/${following.followingId._id}`}>
          {following.followingId.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Followings;
