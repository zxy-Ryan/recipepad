import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getRecipe } from "../redux/features/recipeSlice";

const SingleRecipe = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { recipe } = useSelector((state) => ({ ...state.recipe }));

  useEffect(() => {
    if (id) {
      dispatch(getRecipe(id));
    }
  }, [id]);

  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "750px" }}
            src={recipe.imageFile}
            alt={recipe.title}
          />
          <MDBCardBody>
            <h3>{recipe.title}</h3>
            <span>
              <p className="text-start recipeName">Created By: {recipe.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {recipe.tags && recipe.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icom="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(recipe.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {recipe.description}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default SingleRecipe;
