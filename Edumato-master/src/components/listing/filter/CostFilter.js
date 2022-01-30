import axios from "axios";
import React, { Component } from "react";

const url = "https://edumatoapifordev.herokuapp.com/filter/";
class CostFilter extends Component {
  constructor(props) {
    super();

    this.state = {
      costFilterList: "",
    };
  }

  setData = (event) => {
    let filterURL;
    let lcost = 0;
    let hcost = 0;
    if (event.target.value === "0") {
      filterURL = `${url}${this.props.mealId}`;
    } else if (event.target.value === "500") {
      lcost = 0;
      hcost = Number(event.target.value);
      filterURL = `${url}${this.props.mealId}?lcost=${lcost}&hcost=${hcost}`;
    } else {
      let myArray = event.target.value.split("-");
      lcost = Number(myArray[0]);
      hcost = Number(myArray[1]);
      filterURL = `${url}${this.props.mealId}?lcost=${lcost}&hcost=${hcost}`;
    }
    axios.get(filterURL).then((res) => {
      if (res.data.length > 0) {
        this.props.resPerCuisine(res.data);
        this.props.checkData(true);

      } else {
        this.props.checkData(false)
      }
    });
  };
  render() {
    return (
      <>
        <div className="cost-radio-box">
          <div className="cost">
            <input
              type="radio"
              name="cost-for-two-per"
              value="0"
              id="allcost"
              onClick={this.setData}
            />
            <label htmlFor="allcost">All</label>
          </div>
          <div className="cost">
            <input
              type="radio"
              name="cost-for-two-per"
              value="500"
              id="less-than-500"
              onClick={this.setData}
            />
            <label htmlFor="less-than-500">Less than ₹ 500</label>
          </div>

          <div className="cost">
            <input
              type="radio"
              name="cost-for-two-per"
              value="500-1000"
              id="500-1000"
              onClick={this.setData}
            />
            <label htmlFor="500-1000">₹ 500 to ₹ 1000</label>
          </div>

          <div className="cost">
            <input
              type="radio"
              name="cost-for-two-per"
              value="1000-1500"
              id="1000-1500"
              onClick={this.setData}
            />
            <label htmlFor="1000-1500">₹ 1000 to ₹ 1500</label>
          </div>

          <div className="cost">
            <input
              type="radio"
              name="cost-for-two-per"
              value="1500-2000"
              id="1500-2000"
              onClick={this.setData}
            />
            <label htmlFor="1500-2000">₹ 1500 to ₹ 2000</label>
          </div>
        </div>
      </>
    );
  }
}

export default CostFilter;
