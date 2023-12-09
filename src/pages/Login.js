import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, googleSignIn } from "../redux/features/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect is triggered whenever the error state in your Redux store changes.
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    //prevent page reload by HTML
    e.preventDefault();
    if (email && password) {
      //navigate to home page
      //toast shows success message
      dispatch(login({ formValue, navigate, toast }));
    } else {
      toast.error("Please fill in all fields");
    }
  };
  //handle input change
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const googleSuccess = (credentialResp) => {
    const decode = jwtDecode(credentialResp.credential);
    console.log(decode);
    const email = decode?.email;
    const name = decode?.name;
    const result = { email, name };
    dispatch(googleSignIn({ result, navigate, toast }));
  };
  const googleFailure = (error) => {
    toast.error(error);
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
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x mt-3" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            {/*Input: email*/}
            <div className="col-md-12">
              <MDBInput
                value={email}
                name="email"
                type="email"
                label="Email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide a valid email"
              />
            </div>
            {/*Input: password*/}
            <div className="col-md-12">
              <MDBInput
                value={password}
                name="password"
                type="password"
                label="Password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide a valid password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          {/*When a user attempts to sign in using their Google credentials on your website,
          your client-side code initiates an authentication request to Google.
          The client ID is included in this request to identify your application.*/}
          <GoogleLogin onSuccess={googleSuccess} onFailure={googleFailure} />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">Don't have an account? Sign Up</Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
