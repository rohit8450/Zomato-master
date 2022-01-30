import React, { Component } from "react";
import axios from "axios";
import RestaurantDetailsDisplay from "./RestaurantDetailsDisplay";

const resurl = "https://edumatoapifordev.herokuapp.com/details/";
const resMenu_url = "https://edumatoapifordev.herokuapp.com/restaurantMenu/";

class RestaurantDetails extends Component {
  constructor(props) {
    super();

    this.state = {
      restaurant_detail: "",
      backRes_id: "",
      restaurantMenu: "",
    };
  }

  render() {
    return (
      <>
        <RestaurantDetailsDisplay
          restaurantDetail={this.state.restaurant_detail}
          backResDetails={this.state.backRes_id}
          restaurantMenu={this.state.restaurantMenu}
        />
      </>
    );
  }

  componentDidMount() {
    let res_id = this.props.match.params.res_id;
    axios.get(`${resurl}${res_id}`).then((res) => {
      this.setState({ restaurant_detail: res.data[0] });
    });
    this.setState({ backRes_id: this.props.location.search.split("=")[1] });

    axios.get(`${resMenu_url}${res_id}`).then((res) => {
      this.setState({ restaurantMenu: res.data });
    });
  }
}

export default RestaurantDetails;
