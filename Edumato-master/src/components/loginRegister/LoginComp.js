import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./RegisterComp.css";

const Posturl = "https://loginapiedu.herokuapp.com/api/auth/login  ";
class LoginComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message : ""
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    fetch(Posturl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
    .then((res) => res.json())
    .then((data) => {
        if(!data.auth){
            this.setState({message : data.token})
        }
        else{
            sessionStorage.setItem("ltk", data.token)
            this.props.history.push('/')
        }
    })
  };

  render() {
    return (
      <>
        <div className="form_wrapper">
            <h2 className={this.state.message ? 'msg' : ''}>{this.state.message}</h2>
          <div className="login-form_container">
            <h2 className="title_container">Login</h2>
            <div className="form-feilds">
              <div className="input-field">
                <label htmlFor="email" className="field">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="password" className="field">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Enter Password"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="btns">
              <button
                className="register"
                type="submit"
                onClick={this.handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginComp;
