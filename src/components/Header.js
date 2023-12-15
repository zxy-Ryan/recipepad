import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  // MDBBadge,
  // MDBBtn,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import {useNavigate} from "react-router-dom";
import * as client from "../redux/api.js"

const Header = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
    signout();
    toast.success("Logout successfully");
    // navigate("/");
  };
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const signout = async () => {
    await client.signout();
    navigate("/project/signin");
};

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{
            color: "#606080",
            fontWeight: "600",
            fontSize: "22px",
          }}
        >
          Menu
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
          style={{
            color: "#606080",
          }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={show}>
          <MDBNavbarNav
            right
            fullWidth={false}
            className="mr-auto mb-2 mb-lg-0"
          >
            {user?.result?._id && (
              <>
                <h5 style={{ marginRight: "30px", marginTop: "17px" }}>
                  Logged in as: {user?.result?.name}
                </h5>
              </>
            )}

            {/*Home*/}
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>

            {user?.result?._id && (
              <>
                {/*Add Recipe*/}
                {/* <MDBNavbarItem>
                  <MDBNavbarLink href="/addRecipe">
                    <p className="header-text">Add Recipe</p>
                  </MDBNavbarLink>
                </MDBNavbarItem> */}
                {/*Profile*/}
                <MDBNavbarItem>
                  <MDBNavbarLink href="/profile">
                    <p className="header-text">Profile</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}

            {user?.result?._id ? (
              <>
                {/*Logout*/}
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">
                    <p className="header-text" onClick={handleLogout}>
                      Logout
                    </p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <>
                {/*Login*/}
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">
                    <p className="header-text">Login</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {/*Search Recipe*/}
            <MDBNavbarItem>
              <MDBNavbarLink href="/search">
                <p className="header-text">Search</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
