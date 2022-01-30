import React, { Component } from "react";
import Header from "../Header/Header";
import CuisineFilter from "./filter/CuisineFilter";
import CostFilter from "./filter/CostFilter";
import SortFilter from "./filter/SortFilter";
import ListingDisplay from "./ListingDisplay";
import "./ListingApi.css";

const filterurl = "https://edumatoapifordev.herokuapp.com/filter/";

class ListingApi extends Component {
  constructor(props) {
    super();

    this.state = {
      restaurantsList: "",
      mealId: "",
      hasData: true,
    };
  }

  hasDatainList = (val) => {
    this.setState({ hasData: val });
  };

  setDataAsPerFilter = (data) => {
    this.setState({ restaurantsList: data });
  };

  render() {
    return (
      <>
        <Header />
        <div className="search-content">
          <div className="search-text">Breakfast Places in Mumbai</div>
          <div className="filters-sort" ref="filtersSort">
            <h2>Filters / Sort</h2>
            <i className="fas fa-chevron-down sub-arrow" ref="subArrow"></i>
          </div>
          <div className="filter-search-sec">
            <div className="filter-sec" ref="filterSec">
              <div className="filter-text">Filters</div>
              <div className="select-loc-text">Select location</div>
              <div className="location-listing">
                <select
                  name="location-listing-box"
                  id="location-listing-search"
                >
                  <option value="" disabled selected hidden>
                    Select location
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
              <div className="cuisine">
                <div className="cuisine-text">Cuisine</div>
                <CuisineFilter
                  mealId={this.state.mealId}
                  resPerCuisine={(data) => {
                    this.setDataAsPerFilter(data);
                  }}
                  checkData={(value) => {
                    this.hasDatainList(value);
                  }}
                />
              </div>

              <div className="cost-for-two">
                <div className="cost-for-two-text">Cost For Two</div>
                <CostFilter
                  mealId={this.state.mealId}
                  resPerCuisine={(data) => {
                    this.setDataAsPerFilter(data);
                  }}
                  checkData={(value) => {
                    this.hasDatainList(value);
                  }}
                />
              </div>

              <div className="sort">
                <div className="sort-text">Sort</div>
                <SortFilter
                  mealId={this.state.mealId}
                  resPerCuisine={(data) => {
                    this.setDataAsPerFilter(data);
                  }}
                  checkData={(value) => {
                    this.hasDatainList(value);
                  }}
                />
              </div>
            </div>
            <div className="search-results">
              <ListingDisplay
                res_list={this.state.restaurantsList}
                mealId={this.props.match.params.mealId}
                hasdata={this.state.hasData}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
    const filter_search = this.refs.filterSec;
    filter_search.classList.remove("filter-active");
  }

  componentDidMount() {
    let mealId = this.props.match.params.mealId;

    this.setState({ mealId: mealId }, () => {
      fetch(`${filterurl}${this.state.mealId}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ restaurantsList: data });
        });
    });

    sessionStorage.setItem("mealId", mealId);

    window.scrollTo(0, 0);
    if (this.props.res_list) {
      this.setState({ restaurants: this.props.res_list });
    }

    const subCategory = this.refs.filtersSort;
    const filter_search = this.refs.filterSec;
    const subArrow = this.refs.subArrow;

    subCategory.addEventListener("click", () => {
      filter_search.classList.toggle("filter-active");
      subArrow.classList.toggle("sub-arrow-active");
    });
  }
}

export default ListingApi;
