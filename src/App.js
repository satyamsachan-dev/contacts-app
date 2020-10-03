import React, { Component } from "react";
import "./App.css";
import Contact from "./components/contacts";
import Header from "./components/header";
import GoogleLogin from "react-google-login";
import Axios from "axios";
import User from "./components/user";
import Button from "react-bootstrap/Button";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      selfuser: {},
      contactlist: []
    };
  }

  contactCall(token, selfpic) {
    Axios.get(
      "https://www.googleapis.com/m8/feeds/contacts/default/thin?alt=json&access_token=" +
        token +
        "&max-results=5000&v=3.0"
    ).then(response => {
      console.log("inside function", selfpic);
      var user = {};
      user["name"] = JSON.stringify(
        response.data.feed.author[0].name.$t
      ).replace(/^"(.*)"$/, "$1");
      user["email"] = JSON.stringify(
        response.data.feed.author[0].email.$t
      ).replace(/^"(.*)"$/, "$1");
      user["pic"] = selfpic;
      var res = response.request.response;
      var a1 = JSON.parse(res);
      var iu = a1.feed.entry;
      // console.log(iu[(10, 20)]);
      var l1 = [];
      var id = 1;
      var cd = 0;
      for (var i = 0; i < iu.length; i++) {
        var person = iu[i];
        if (
          person.gd$name &&
          person.gd$email &&
          person.gd$phoneNumber &&
          person.link[0].href
        ) {
          var cont = {};
          cont["id"] = id;
          cont["name"] = JSON.stringify(person.gd$name.gd$fullName.$t)
            .replace(/^"(.*)"$/, "$1")
            .replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          cont["email"] = JSON.stringify(person.gd$email[0].address).replace(
            /^"(.*)"$/,
            "$1"
          );
          cont["phone"] = JSON.stringify(person.gd$phoneNumber[0].$t).replace(
            /^"(.*)"$/,
            "$1"
          );
          cont["image"] = person.link[0].href + "&access_token=" + token;

          l1.push(cont);
          id = id + 1;
          cd = cd + 1;
        }
      }
      this.setState({
        isLoaded: true,
        contactlist: l1,
        selfuser: user
      });
    });
  }

  logoutcall() {
    window.location.reload(true);
    this.setState({ isLoaded: false });
  }

  render() {
    const { isLoaded, contactlist } = this.state;
    const responseGoogle = response => {
      console.log("accesstoken", response);
      console.log("before function", response.profileObj.imageUrl);
      this.contactCall(response.accessToken, response.profileObj.imageUrl);
    };
    const logout = () => {
      console.log("logout called");
      // isLoaded = false;
    };
    if (isLoaded) {
      return (
        <div className="topbar">
          <User detail={this.state.selfuser}></User>
          <span className="contact">Contacts({contactlist.length})</span>
          <Button
            className="logout"
            variant="danger"
            onClick={() => window.location.reload(false)}
          >
            Logout
          </Button>
          <Header></Header>
          {contactlist.map(c => (
            <Contact
              key={c.id}
              height={c.id}
              name={c.name}
              email={c.email}
              phone={c.phone}
              image={c.image}
            ></Contact>
          ))}
        </div>
      );
    } else {
      return (
        <GoogleLogin
          clientId="606991777411-t8peijh318f51k8qt30k80bsf1p1p69t.apps.googleusercontent.com"
          render={renderProps => (
            <button
              className="signbutton"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign in With Google
            </button>
          )}
          buttonText="Login"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          scope="https://www.googleapis.com/auth/contacts.readonly"
          cookiePolicy={"single_host_origin"}
        />
      );
    }
  }
}

export default App;
