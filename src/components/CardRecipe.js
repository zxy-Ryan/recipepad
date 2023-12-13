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

const excerpt = (str) => {
  if (str.length > 100) {
    str = str.substring(0, 100) + "...";
  }
  return str;
};

const CardRecipe = ({ imageFile, description, _id, title, tags, name }) => {
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
        <div className="top-left">{name}</div>
        <span className="text-start tag-card">
          {tags.map((item) => `#${item} `)}
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/recipe/${_id}`}>Read More</Link>
            {/* {excerpt(description).length > 100 && (
              <Link to={`/recipe/${_id}`}>Read More</Link>
            )} */}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardRecipe;
