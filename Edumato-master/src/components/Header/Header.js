import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const url = "https://loginapiedu.herokuapp.com/api/auth/userInfo";
class Header extends Component {
  constructor(props) {
    super();

    this.state = {
      userData: "",
    };
  }

  handleLogout = () => {
    this.setState({ userData: "" });
    sessionStorage.removeItem("ltk");
    sessionStorage.removeItem("userData");
  };

  conditionalLogin = () => {
    if (this.state.userData.name) {
      let data = this.state.userData;
      let outputArray = [data.name, data.email, data.phone, data.role];
      sessionStorage.setItem("userData", outputArray);
      return (
        <>
          <h4 id="userName">Hi {this.state.userData.name}</h4>
          <Link to="/">
            <button id="logout" onClick={this.handleLogout}>
              Logout
            </button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <div id="login">
            <Link to="/login">Login</Link>
          </div>
          <div id="create-account">
            <Link to="/register" id="acc-btn">
              Create an account
            </Link>
          </div>
        </>
      );
    }
  };

  render() {
    return (
      <div id="header-listing">
        <div className="logo-listing-sec">
          <div className="logo-listing-circle-listing">
            <Link to="/">
              <div className="logo-listing">e!</div>
            </Link>
          </div>
        </div>

        <div className="login-listing-acc">
          {this.conditionalLogin()}

          <Link to="/viewOrder">
            <img
              className="view-order"
              src="https://i.ibb.co/zf3rrJp/cart-73-64.png"
              alt="Orders"
            />
          </Link>
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("ltk"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          userData: data,
        });
      });
  }
}

export default Header;
