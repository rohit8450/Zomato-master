import React from "react";
import { Link } from "react-router-dom";
import "./Search.css";

const FilteredRestaurants = (props) => {
  const listRes = ({ resdata }) => {
    if (resdata) {
      return resdata.map((item) => {
        return (
          <div className="resbox" key={item.restaurant_id}>
            <div
              className="img-box"
              style={{
                backgroundImage: "url(" + item.image_gallery[1] + ")",
              }}
            ></div>
            <div className="res-info">
              <Link
                to={`/details/${item.restaurant_id}?mealId=${item.mealTypes[0].mealtype_id}`}
              >
                <h2 className="resname">{item.restaurant_name}</h2>
              </Link>
              <h4 className="resadd">{item.address}</h4>
            </div>
          </div>
        );
      });
    }
  };

  let resclass = props.filterResClass? "showres": "hideres";

  return( 
  <div className={`restaurant-div ${resclass}`}>
    {listRes(props)}
    </div>
    )
};

export default FilteredRestaurants;