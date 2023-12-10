import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../redux/features/recipeSlice";

const Home = () => {
  const { recipes, loading } = useSelector((state) => ({ ...state.recipe }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1400px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5"></MDBRow>
    </div>
  );
};

export default Home;
