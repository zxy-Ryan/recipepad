import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/features/recipeSlice";
import CardRecipe from "../components/CardRecipe";

const Home = () => {
  const { recipes, loading } = useSelector((state) => ({ ...state.recipe }));
  console.log(recipes);
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
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {recipes.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No recipe found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {recipes &&
                recipes.map((item, index) => (
                  <CardRecipe key={index} {...item} />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
