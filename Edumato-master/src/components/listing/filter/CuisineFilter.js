import axios from "axios";
import React, { Component } from "react";

const url = "https://edumatoapifordev.herokuapp.com/filter/";
class CuisineFilter extends Component {
  constructor(props) {
    super();

    this.state = {
      cuisinList: "",
    };
  }
  cuisineArray = "";

  handleChange = (event) => {
    let index = this.cuisineArray.indexOf(event.target.value);
    if (index > -1) {
      this.cuisineArray = this.cuisineArray.split("");

      this.cuisineArray.splice(index, 1);
      this.cuisineArray = this.cuisineArray.join("");
      this.setState({ cuisinList: this.cuisineArray }, () => {
        this.setData();
      });
    } else {
      this.cuisineArray = this.cuisineArray.concat(event.target.value);
      this.setState({ cuisinList: this.cuisineArray }, () => {
        this.setData();
      });
    }
  };

  setData = () => {
    let filterURL;
    if (this.cuisineArray.indexOf(0) > -1) {
      filterURL = `${url}${this.props.mealId}`;
    } else {
      filterURL = `${url}${this.props.mealId}?cuisine=${this.cuisineArray}`;
    }
    axios.get(filterURL).then((res) => {
      if (res.data.length > 0) {
        this.props.resPerCuisine(res.data);
        this.props.checkData(true);
      } else {
        this.props.checkData(false);
      }
    });
  };
  render() {
    return (
      <>
        <div className="cuisine-checkbox">
          <div className="food-con-type">
            <input
              type="checkbox"
              name="all"
              value="0"
              id="all"
              onClick={this.handleChange}
            />
            <label htmlFor="all">All</label>
          </div>
          <div className="food-con-type">
            <input
              type="checkbox"
              name="north-indian"
              value="1"
              id="north-indian"
              onClick={this.handleChange}
            />
            <label htmlFor="north-indian">North Indian</label>
          </div>
          <div className="food-con-type">
            <input
              type="checkbox"
              name="south-indian"
              value="2"
              id="south-indian"
              onClick={this.handleChange}
            />
            <label htmlFor="south-indian">South Indian</label>
          </div>

          <div className="food-con-type">
            <input
              type="checkbox"
              name="chinese"
              value="3"
              id="chinese"
              onClick={this.handleChange}
            />
            <label htmlFor="chinese">Chinese</label>
          </div>

          <div className="food-con-type">
            <input
              type="checkbox"
              name="fast-food"
              value="4"
              id="fast-food"
              onClick={this.handleChange}
            />
            <label htmlFor="fast-food">Fast Food</label>
          </div>

          <div className="food-con-type">
            <input
              type="checkbox"
              name="street-food"
              value="5"
              id="street-food"
              onClick={this.handleChange}
            />
            <label htmlFor="street-food">Street Food</label>
          </div>
        </div>
      </>
    );
  }
}

export default CuisineFilter;
