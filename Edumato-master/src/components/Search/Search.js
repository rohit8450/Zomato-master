import React, { Component } from "react";
import {Link} from 'react-router-dom'
import FilteredRestaurants from "./FilteredRestaurants";
import "./Search.css";

const locationurl = "https://edumatoapifordev.herokuapp.com/location";
const restauranturl =
  "https://edumatoapifordev.herokuapp.com/restaurants?stateId=";
const url = "https://loginapiedu.herokuapp.com/api/auth/userinfo";
class Search extends Component {
  constructor(props) {
    super();

    this.state = {
      locationData: "",
      keyword: "",
      restaurantData: "",
      filteredResList: "",
      filterResClass: false,
      userData: "",
    };
  }

  renderCity = (data) => {
    if (data) {
      return data.map((item,index) => {
        return <option value={item.state_id} key={index}>{item.state}</option>;
      });
    }
  };

  handleCity = (event) => {
    const stateId = event.target.value;
    fetch(`${restauranturl}${stateId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ restaurantData: data, filteredResList: data });
      });
  };

  getResList = (event) => {
    this.setState({ keyword: event.target.value }, () => {
      const output = this.state.restaurantData.filter((item) => {
        return (
          item.restaurant_name
            .toLowerCase()
            .indexOf(this.state.keyword.toLowerCase()) > -1
        );
      });
      this.setState({ filteredResList: output });
    });
  };

  ResListClass = () => {
    this.setState({ filterResClass: !this.state.filterResClass });
  };

  handleLogout= () => {
      this.setState({ userData: "" });
      sessionStorage.removeItem("ltk");
      sessionStorage.removeItem("userData");
    
  }

  conditionalLogin = () => {
    if (this.state.userData.name) {
      let data = this.state.userData;
      let outputArray = [data.name, data.email, data.phone, data.role];
      sessionStorage.setItem("useData", outputArray);
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
      <div id="header">
        <div className="login-acc">{this.conditionalLogin()}</div>
        <div className="logo-circle">
          <div className="logo">e!</div>
        </div>

        <div className="header-heading">
          Find the best restaurants, cafés, and bars
        </div>
        <div className="loc-res-box">
          <div className="location" onChange={this.handleCity}>
            <select name="location-box" id="location-search" className="box">
              <option value="" disabled selected hidden>
                Please type a location
              </option>
              {this.renderCity(this.state.locationData)}
            </select>
          </div>
          <div className="restaurants">
            <input
              name="restaurants-box"
              id="restaurants-search"
              className="box"
              placeholder="Search for restaurants"
              onInput={this.getResList}
              onFocus={this.ResListClass}
              // onBlur={this.ResListClass}
            />

            <FilteredRestaurants
              resdata={this.state.filteredResList}
              filterResClass={this.state.filterResClass}
            />

            {/* {this.render_restaurant(this.state.restaurantData)} */}
          </div>
        </div>
      </div>
    );
  }

  //on page load we have to call api
  componentDidMount() {
    fetch(locationurl, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ locationData: data });
      });

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

export default Search;
