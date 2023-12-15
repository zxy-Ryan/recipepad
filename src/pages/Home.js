import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/features/recipeSlice";
import CardRecipe from "../components/CardRecipe";
import * as client from "./client";

const Home = () => {
  // const { recipes, loading } = useSelector((state) => ({ ...state.recipe }));
  // const dispatch = useDispatch();
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
const [selectedArea, setSelectedArea] = useState('');

  const findRandomRecipes = async () => {
    setIsLoading(true);
    const recipes = await client.findRandomRecipes();
    setRecipes(recipes);
    setIsLoading(false);
  };

  const findRecipesByCategory = async (category) => {
    setIsLoading(true);
    const recipes = await client.findRecipesByCategory(category);
    setRecipes(recipes);
    setIsLoading(false);
  }

  const findRecipesByArea = async (area) => {
    setIsLoading(true);
    const recipes = await client.findRecipesByArea(area);
    setRecipes(recipes);
    setIsLoading(false);
  }

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedArea('');
    setSelectedCategory(category);
    console.log(selectedCategory);
    if (category) {
      await findRecipesByCategory(category);
    } else {
      await findRandomRecipes();
    }
  };

  const handleAreaChange = async (e) => {
    const area = e.target.value;
    setSelectedCategory('');
    setSelectedArea(area);
    if (area) {
      await findRecipesByArea(area);
    } else {
      await findRandomRecipes();
    }
  };

  useEffect(() => {
    const loadCategoriesAndAreas = async () => {
      const fetchedCategories = await client.findCategories();
      const fetchedAreas = await client.findArea();
      setCategories(fetchedCategories);
      setAreas(fetchedAreas);
    };

    loadCategoriesAndAreas();
    findRandomRecipes();
  }, []);

  if (isLoading) {
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
      className="mt-5"
    >
      <MDBRow className="mt-5">
        <MDBCol size="6">
          <select className="form-select" onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </MDBCol>
        <MDBCol size="6">
          <select className="form-select" onChange={handleAreaChange} value={selectedArea}>
            <option value="">Select Area</option>
            {areas.map((area, index) => (
              <option key={index} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </select>
        </MDBCol>
      </MDBRow>
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
                recipes.map((recipe, index) => (
                  <CardRecipe key={index} imageFile={recipe.strMealThumb} _id={recipe.idMeal} title={recipe.strMeal} />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
