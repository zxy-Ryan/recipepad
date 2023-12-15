import React from "react";
import { ListGroup, Button, Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./profile/client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.css";

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
    <Container className="my-5 pt-5"> 
      <Card className="shadow-sm"> 
        <Card.Header>
          <h4>User List</h4> 
        </Card.Header>
        <ListGroup variant="flush delete-user"> 
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
      </Card>
    </Container>
  );
}

export default UserListTab;
