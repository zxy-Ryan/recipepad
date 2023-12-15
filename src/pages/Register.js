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
import { register } from "../redux/features/authSlice";
import "./index.css"

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  tel: "",
  introduction: "",
  role: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const {
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
    tel,
    introduction,
    role,
  } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect is triggered whenever the error state in your Redux store changes.
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    //prevent page reload by HTML
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password do not match");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      //toast shows success message
      dispatch(register({ formValue, navigate, toast }));
    } else {
      toast.error("Please fill in all fields");
    }
  };
  //handle input change
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
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
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            {/*Input: firstName*/}
            <div className="col-md-6">
              <MDBInput
                value={firstName}
                name="firstName"
                type="text"
                label="First Name"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide first name"
              />
            </div>
            {/*Input: lastName*/}
            <div className="col-md-6">
              <MDBInput
                value={lastName}
                name="lastName"
                type="text"
                label="Last Name"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide last name"
              />
            </div>
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
            {/*Input: confirmPassword*/}
            <div className="col-md-12">
              <MDBInput
                value={confirmPassword}
                name="confirmPassword"
                type="password"
                label="Password Confirm"
                onChange={onInputChange}
                required
                invalid
                validation="Please confirm your password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                value={tel}
                name="tel"
                type="text"
                label="Phone Number"
                onChange={onInputChange}
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                value={introduction}
                name="introduction"
                textarea
                rows="4"
                label="Introduct yourself"
                onChange={onInputChange}
              />
            </div>
            <div className="col-md-12">
              <select
                className="form-select"
                id="roleSelect"
                name="role"
                value={role}
                onChange={onInputChange}
                required
              >
                <option value="">Select a role</option>
                <option value="regular">user</option>
                <option value="vip">VIP user</option>
              </select>
            </div>
            <div className="col-12 register-btn">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter className="login-navigate">
          <Link to="/login">Already have an account? Sign In</Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
