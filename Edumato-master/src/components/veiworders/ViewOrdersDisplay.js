import React, { Component } from "react";
import "./ViewOrdersDisplay.css";

class ViewOrdersDisplay extends Component {
  constructor(props) {
    super(props);
  }
  renderOrder = (orders) => {
    return orders.map((item,index) => {
      return (
        <div key={index}>
            <div
              className="item-img"
              style={{ backgroundImage: "url(" + item.menu_image + ")" }}
            ></div>
          <span className="menu-name">
            <h4>{item.menu_name}</h4>
            <h4>₹{item.menu_price}</h4>
          </span>
        </div>
      );
    });
  };
  renderOrderItems = () => {
    if (this.props.orders_list) {
      return this.props.orders_list.map((item,index) => {
        return (
          <tr key={index}>
            <td>{item.restaurantName}</td>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.address}</td>
            <td>{this.renderOrder(item.ordersList)}</td>
            <td>₹{item.amount}</td>
            <td>{item.status}</td>
          </tr>
        );
      });
    }
  };

  render() {
    
    return (
      <>
        <table>
          <tr>
            <th>Restaurant Name</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email Id</th>
            <th>Address</th>
            <th>Order Items</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
          {this.renderOrderItems()}
        </table>
      </>
    )
  }
}
export default ViewOrdersDisplay;
