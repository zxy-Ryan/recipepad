import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <div className="mt-5">
      <MDBFooter className="fixed-bottom">
        <div
          className="text-center p-2"
          style={{ backgroundColor: "#f0e6ea", color: "#606080" }}
        >
          © 2023 Copyright:
          <a className="text-reset fw-bold">&nbsp;Menu</a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default Footer;
