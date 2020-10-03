import React, { Component } from "react";
import Photo from "./photo";

class Contact extends Component {
  render() {
    var val = { top: 123 + 70 * this.props.height + "px" };

    return (
      <div className="contac1" style={val}>
        <span className="name">{this.props.name} </span>
        <span className="email">{this.props.email}</span>
        <span className="phone"> {this.props.phone}</span>
        <span>
          <Photo link={this.props.image}></Photo>
        </span>
      </div>
    );
  }
}
export default Contact;
