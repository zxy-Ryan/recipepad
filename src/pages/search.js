import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa6";
import "./index.css";
function Search() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [results, setResults] = useState(null);
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
    <div className="col-12">
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "1400px",
          alignContent: "center",
          marginTop: "120px",
        }}
      >
        <h1 class="text-secondary mb-4">MenuSearch</h1>
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
            className="btn btn-primary ms-3"
          >
            Search
          </button>
          <FaSearchengin className="ms-3" />
        </span>
      </div>

      {/* <h2 class="text-secondary">Results</h2> */}
      <div
        className="container-fluid  search-menu mt-5"
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "1400px",
          alignContent: "center",
        }}
      >
        <div className="row ">
          {results &&
            results.map((recipe, index) => (
              <div
                className="col col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3 "
                key={index}
              >
                <div class="card">
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                  <Link to={`/Details/${recipe.idMeal}`}>
                    <h3 class="text-center">{recipe.strMeal}</h3>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
