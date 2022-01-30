import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

class ListingDisplay extends Component {
  constructor(props) {
    super();

    this.state = {
      restaurants: "",
      Indexes: "",
    };
  }

  setDataInterval = (findex, lindex) => {
    const indexArray = [];
    indexArray.push(findex);
    indexArray.push(lindex - 1);
    this.setState({ Indexes: indexArray }, () => {});
  };

  renderCuisine = (cuisines) => {
    return cuisines.map((item, index) => {
      return <h4 key={index}>{item.cuisine_name}</h4>;
    });
  };

  res_info_box = (res_list) => {
    if (this.props.hasdata) {
      if (res_list) {
        return res_list.map((item, index) => {
          if (this.state.Indexes.indexOf(index) > -1) {
            return (
              <div className="search-result1 search-box" key={index}>
                <div className="search-main-box">
                  <div
                    className="food-img-listing"
                    style={{
                      backgroundImage: `url(${item.restaurant_thumb})`,
                    }}
                  ></div>
                  <div className="food-hotel">
                    <Link
                      to={`/details/${item.restaurant_id}?mealId=${this.props.mealId}`}
                    >
                      <div className="hotel-name">{item.restaurant_name}</div>
                    </Link>
                    <div className="hotel-add">
                      <div className="fort">Fort</div>
                      <div className="address">{item.address}</div>
                    </div>
                  </div>
                </div>

                <div className="search-food-desc">
                  <div className="cuisines">
                    <div className="cuisines-text">Cuisines</div>
                    <div className="cuisines-val">
                      {this.renderCuisine(item.cuisines)}
                    </div>
                  </div>
                  <div className="cost-for-two-per">
                    <div className="cost-for-two-per-text">Cost For Two</div>
                    <div className="cost-val">₹{item.cost}</div>
                  </div>
                </div>
              </div>
            );
          }
        });
      } else {
        return (
          <div className="loader">
            <img src="/images/loading-13.gif" alt="Loading..." />
          </div>
        );
      }
    } else {
      return (
        <div className="search-box-no">
          <h1 style={{ color: "var(--dark-blue)" }}>No results found</h1>
        </div>
      );
    }
  };

  render() {
    return (
      <>
        {this.res_info_box(this.props.res_list)}
        {this.props.hasdata ? (
          <Pagination
            dataLen={this.props.res_list.length}
            setResIndexes={(findex, lindex) => {
              this.setDataInterval(findex, lindex);
            }}
          />
        ) : (
          ""
        )}
      </>
    );
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.setDataInterval(0, 2);
  }
}

export default ListingDisplay;
