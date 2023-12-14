import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function UserListTab() {
  const [users, setUsers] = useState(null);
  const { user } = useSelector((state) => ({ ...state.auth }));

  const findAllUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const deleteUser = async (event, u) => {
    event.preventDefault();
    await client.deleteUser(u);
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
      {users.map((u, index) => (
        <ListGroup.Item
          key={index}
          action
          className="d-flex justify-content-between align-items-center"
          href={`/profile/${u._id}`}
        >
          {u.name}
          {user.result.role === "admin" && (
            <Button variant="danger" onClick={(e) => deleteUser(e, u)}>
              Delete
            </Button>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default UserListTab;
