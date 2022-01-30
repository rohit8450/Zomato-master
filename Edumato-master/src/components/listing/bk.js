import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Listing.css";
import Header from "../Header";

class ListingDisplay extends Component {
  constructor(props) {
    super();

    this.state = {
      restaurants: "",
    };
  }

  renderCuisine = (cuisines) => {
    return cuisines.map((item) => {
      return <h4>{item.cuisine_name}</h4>;
    });
  };

  res_info_box = (res_list) => {
    if (res_list) {
      return res_list.map((item) => {
        return (
          <div className="search-result1 search-box" key={item.restaurant_id}>
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
      });
    } else {
      return (
        <div className="loader">
          <img src="/images/loading-13.gif" />
        </div>
      );
    }
  };

  render() {
    return (
    
    <>{this.res_info_box(this.props.res_list)}
    <ReactPaginate
          previousLabel={<i class="fas fa-chevron-left"></i>}
          nextLabel={<i class="fas fa-chevron-right"></i>}
          pageCount={this.state.pageCountNub}
          marginPagesDisplayed={2}
          onPageChange={this.handlePageChange}
          containerClassName={"pagination-sec"}
          previousLinkClassName={"prevBtn"}
          nextLinkClassName={"nextBtn"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          activeClassName={"active"}
          disabledLinkClassName={"disable"}
        />
    </>
    )
  }
}

export default ListingDisplay;
