import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa6";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import CardRecipe from "../components/CardRecipe";
import "./index.css";
function Search() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const findRecipe = async (search) => {
    const results = await client.findRecipe(search);
    setResults(results);
    setSearchTerm(search);
  };

  useEffect(() => {
    if (search) {
      findRecipe(search);
    }
  }, [search]);

  return (
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "1000px",
          alignContent: "center",
        }}
        className="mt-5 search-menu"
      >
        <h1 className="text-secondary mb-4">MenuSearch</h1>
        <span>
          <input
            type="text"
            className="form-control w-75 search-bar"
            placeholder="Search the recipe..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <button
            onClick={() => navigate(`/search/${searchTerm}`)}
            className="btn ms-3 search-btn"
          >
            Search
            <FaSearchengin className="ms-3" />
          </button>
         
        </span>
      
      <MDBRow className="mt-5">
        {results.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No recipe found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2">
              {results &&
                results.map((recipe, index) => (
                  <CardRecipe key={index} imageFile={recipe.strMealThumb} _id={recipe.idMeal} title={recipe.strMeal} />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      </div>
  );
}

export default Search;
