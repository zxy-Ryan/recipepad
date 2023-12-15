import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import "./index.css";

const excerpt = (str) => {
  if (str.length > 100) {
    str = str.substring(0, 100) + "...";
  }
  return str;
};

const CardRecipe = ({ imageFile, _id, title }) => {
  return (
    <MDBCardGroup>
      <MDBCard
        className="
      h-100 mt-2 d-sm-flex"
        style={{ maxWidth: "20rem" }}
      >
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            <Link to={`/Details/${_id}`}>Detail</Link>
            {/* {excerpt(description).length > 100 && (
              <Link to={`/recipe/${_id}`}>Read More</Link>
            )} */}
          </MDBCardText>
          <Link to={`/recipe/${_id}`} className = 'btn btn-small'>Read More</Link>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardRecipe;
