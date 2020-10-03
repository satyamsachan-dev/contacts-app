import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <p className="header">
        {" "}
        <span
          style={{
            position: "absolute",
            width: "36px",
            height: "18px",
            left: "235px",
            top: "165px"
          }}
        >
          NAME{" "}
        </span>
        <span
          style={{
            position: "absolute",
            width: "37px",
            height: "18px",
            left: "535px",
            top: "165px"
          }}
        >
          EMAIL{" "}
        </span>
        <span
          style={{
            position: "absolute",
            width: "110px",
            height: "18px",
            left: "856px",
            top: "165px"
          }}
        >
          PHONE NUMBER
        </span>
      </p>
    );
  }
}

export default Header;
