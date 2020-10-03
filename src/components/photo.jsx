import React, { Component } from "react";

class Photo extends Component {
  render() {
    return <img className="image" src={this.props.link} />;
  }
}

export default Photo;
