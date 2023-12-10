import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { clearCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

function UserInfoTab({ user, type }) {
  const [userInfo, setUserInfo] = useState(user);
  const isAccount = type === "account" ? true : false;
  //   const { name, password, email, phoneNumber, introduction } = user;

  const save = async () => {
    try {
      await client.updateUser(userInfo);
      alert("Save successful");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Save failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>UserInfo</h1>
      <Form onSubmit={save}>
        <Form.Group className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={userInfo.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        {isAccount && (
          <>
            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                defaultValue={userInfo.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                defaultValue={userInfo.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                defaultValue={userInfo.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </>
        )}
        <Form.Group className="mt-3">
          <Form.Label>Introduction</Form.Label>
          <Form.Control
            type="text"
            name="introduction"
            defaultValue={userInfo.introduction}
            onChange={handleInputChange}
          />
        </Form.Group>
        {isAccount && (
          <Button variant="primary" type="button" className="mt-2" onClick={save}>
            Save Changes
          </Button>
        )}
      </Form>
    </div>
  );
}

export default UserInfoTab;
