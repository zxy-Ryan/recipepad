import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";
import { useState, useEffect } from "react";

function UserListTab() {
  const [users, setUsers] = useState(null);

  const findAllUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const deleteUser = async (userId) => {
    await client.deleteUser(userId);
    findAllUsers(); 
  };

  useEffect(() => {
    findAllUsers();
  }, []);

  if (!users || users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <ListGroup>
      {users.map((user, index) => (
        <ListGroup.Item 
          key={index} 
          action 
          className="d-flex justify-content-between align-items-center"
          href={`/project/profile/${user._id}`}
        >
          {user.name}
          <Button 
            variant="danger" 
            onClick={() => deleteUser(user._id)}
          >
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default UserListTab;
