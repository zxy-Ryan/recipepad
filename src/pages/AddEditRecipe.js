import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
//upload image
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../redux/features/recipeSlice.js";

const initialState = {
  title: "",
  description: "",
  category: "",
  tags: [],
};

const categoryOption = [
  "Chinese",
  "Ramen",
  "Vietnamese",
  "Mexican",
  "Indian",
  "Italian",
  "Other",
];

const AddEditRecipe = () => {
  const [recipeData, setRecipeData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const { error, userRecipes } = useSelector((state) => ({
    ...state.recipe,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags, category } = recipeData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleRecipe = userRecipes.find((recipe) => recipe._id === id);
      console.log(singleRecipe);
      setRecipeData({ ...singleRecipe });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("Please select category");
    }
    if (!tags.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && description && tags && category) {
      const updatedRecipeData = { ...recipeData, name: user?.result?.name };

      dispatch(createRecipe({ updatedRecipeData, navigate, toast }));

      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setRecipeData({ ...recipeData, tags: [...recipeData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setRecipeData({
      ...recipeData,
      tags: recipeData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = () => {
    setRecipeData({ title: "", description: "", tags: [] });
  };

  const onCatgoryChange = (e) => {
    setCategoryErrMsg(null);
    setRecipeData({ ...recipeData, category: e.target.value });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <div className="mt-3">
          <h5>{id ? "Update Recipe" : "Add Recipe"}</h5>
        </div>

        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12 mb-4">
              <MDBInput
                placeholder="Enter Title"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12 mb-4">
              <MDBInput
                placeholder="Enter Description"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12 mb-4">
              <select
                className="categoryDropdown"
                onChange={onCatgoryChange}
                value={category}
              >
                <option>Please select category</option>
                {categoryOption.map((option, index) => (
                  <option value={option || ""} key={index}>
                    {option}
                  </option>
                ))}
              </select>
              {categoryErrMsg && (
                <div className="categoryErrorMsg">{categoryErrMsg}</div>
              )}
            </div>
            <div className="col-md-12 mb-4">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
            </div>
            <div className="d-flex justify-content-start mb-4">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setRecipeData({ ...recipeData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditRecipe;
