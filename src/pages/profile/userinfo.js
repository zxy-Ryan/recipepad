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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [isFollowStatusChecked, setIsFollowStatusChecked] = useState(false);
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

  const followUser = async () => {
    try {
      await client.followUserById(userInfo._id);
      setHasFollowed(true);
    } catch (error) {
      console.error("Follow failed:", error);
    }
  };

  const unFollowUser = async () => {
    try {
      await client.UnFollowUserById(userInfo._id);
      setHasFollowed(false);
    } catch (error) {
      console.error("Follow failed:", error);
    }
  };

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const account = await client.account();
        if (account) {
          setIsLoggedIn(true);
          const followers = await client.findFollowers(user._id);
          const isFollowing = followers.some(
            (follower) => follower.followerId._id === account._id
          );
          setHasFollowed(isFollowing);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      } finally {
        setIsFollowStatusChecked(true);
      }
    };

    // if (type === "guest") {
    //   checkFollowStatus();
    // }
    checkFollowStatus();
  }, [type, user]);

  if (!isFollowStatusChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "80px",
      }}
    >
      <Form onSubmit={save}>
        {isAccount && (
          <>
            <Form.Group className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={userInfo.name}
                onChange={handleInputChange}
              />
            </Form.Group>
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
                name="tel"
                defaultValue={userInfo.tel}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Introduction</Form.Label>
              <Form.Control
                type="text"
                name="introduction"
                defaultValue={userInfo.introduction}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              className="mt-4"
              onClick={save}
            >
              Save Changes
            </Button>
          </>
        )}

        {!isAccount && (
          <>
            <Form.Group className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={userInfo.name}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Introduction</Form.Label>
              <Form.Control
                type="text"
                name="introduction"
                defaultValue={userInfo.introduction}
                readOnly
              />
            </Form.Group>
          </>
        )}

        {!isAccount && isLoggedIn && !hasFollowed && (
          <Button variant="primary" onClick={followUser} className="mt-3">
            Follow
          </Button>
        )}

        {!isAccount && isLoggedIn && hasFollowed && (
          <>
            <p className="text-left mb-3 mt-3">Followed</p>
            <Button variant="secondary" onClick={unFollowUser} className="mt-3">
              Unfollow
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}

export default UserInfoTab;
