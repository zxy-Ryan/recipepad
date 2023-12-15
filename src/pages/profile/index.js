import React from "react";
import { Tab, Tabs, Container } from "react-bootstrap";
import * as client from "./client";
import UserListTab from "./userlist";
import UserInfoTab from "./userinfo";
import CommentsTab from "./comments";
import FavoritesTab from "./favorites";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import FollowingsTab from "./followings";
import FollowersTab from "./followers";
import  "./index.css";

const Profile = () => {
  const params = useParams();
  const userId = params.userId; 

  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const findUserById = async (userId) => {
    try {
      setIsLoading(true);
  
      const fetchedAccount = await fetchAccount();
  
      const user = await client.findUserById(userId);
      setUser(user);
      if (fetchedAccount && fetchedAccount._id === userId) {
        setType("account");
        console.log(type);
      } else {
        setType("guest");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
      setIsDataLoaded(true);
    }
  };

  const fetchAccount = async () => {
    try {
      setIsLoading(true); 
      const account = await client.account();
      console.log(account);
      setAccount(account);
      setType("account");
      return account;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    if (userId) {
      findUserById(userId);
    } else {
      fetchAccount().then(() => setIsDataLoaded(true));
    }
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!isDataLoaded) {
    return <div>Loading user information...</div>; // 在数据加载完毕之前显示
  }

  if (!account && !user) {
    return (
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "1400px",
          alignContent: "center",
          marginTop: "120px",
        }}
      >
        <h1>Can't find the user.</h1>
      </div>
    );
  }

  return (
    <Container
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1400px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <h1 class="text-secondary mb-4">Profile</h1>
      <Tabs defaultActiveKey="userInfo" id="profile-tabs" className="responsive-tabs">
        <Tab eventKey="userList" title="User List">
          <UserListTab />
        </Tab>
        <Tab eventKey="userInfo" title="User Information">
          <UserInfoTab user={user || account} type={type} />
        </Tab>
        <Tab eventKey="followings" title="Followings">
          <FollowingsTab userObject={account || user} />
        </Tab>
        <Tab eventKey="followers" title="Followers">
          <FollowersTab userObject={account || user} />
        </Tab>
        <Tab eventKey="favorites" title="Favorites">
          <FavoritesTab userObject={account || user} />
        </Tab>
        <Tab eventKey="comments" title="Comments">
          <CommentsTab userObject={account || user} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Profile;
