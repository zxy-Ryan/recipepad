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
        <MDBCardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
          </MDBCardText>
          <Link to={`/Details/${_id}`} className = 'btn btn-small'>Detail</Link>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardRecipe;
