import React, { Component } from "react";
import Photo from "./photo";

class Header extends Component {
  render() {
    return (
      <div>
        <img className="userpic" src={this.props.detail.pic} />
        <span className="selfname">{this.props.detail.name}</span>
        <span className="selfemail">{this.props.detail.email}</span>
      </div>
    );
  }
}

export default Header;
