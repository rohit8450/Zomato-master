import React from "react";
import './QuickSearch.css';
import {Link} from 'react-router-dom'

const QuickSearch = (props) => {
  const listMeal = ({ quicksearchdata }) => {
    if (quicksearchdata) {
      return quicksearchdata.map((item,index) => {
        return (
          <Link to={`/list/${item.mealtype_id}`} key={index}>
            <div className="common-food-box">
              <div
                className="food-img"
                style={{ backgroundImage: `url(${item.meal_image})` }}
              ></div>
              <div className="food-desc">
                <div className="food-type">{item.mealtype}</div>
                <div className="food-type-desc">{item.content}</div>
              </div>
            </div>
          </Link>
        );
      });
    }
  };

  return (
    <div className="quick-searches-box">
      <div className="quick-searches">Quick Searches</div>
      <div className="discover-text">
        Discover the restaurants by type of meal
      </div>

      <div className="food-box">
        {listMeal(props)}
      </div>
    </div>
  );
};

export default QuickSearch;
