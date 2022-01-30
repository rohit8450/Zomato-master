import axios from "axios";
import React, { Component } from "react";

const url = "https://edumatoapifordev.herokuapp.com/filter/1?sortkey=";
class SortFilter extends Component {
  constructor(props) {
    super();

    this.state = {
      costFilterList: "",
    };
  }

  setData = (event) => {
    let sortkey = Number(event.target.value);
    axios.get(`${url}${sortkey}`).then((res) => {
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
        <div className="sort-radio">
          <input
            type="radio"
            name="price"
            value="1"
            id="low-to-high"
            onClick={this.setData}
          />
          <label htmlFor="low-to-high">Price low to high</label>
        </div>
        <div className="sort-radio">
          <input
            type="radio"
            name="price"
            value="-1"
            id="high-to-low"
            onClick={this.setData}
          />
          <label htmlFor="high-to-low">Price high to low</label>
        </div>
      </>
    );
  }
}

export default SortFilter;
