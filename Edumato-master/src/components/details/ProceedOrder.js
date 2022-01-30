import React, { Component } from "react";
import GetInfo from "./GetInfo";
import "./ProceedOrder.css";

class ProceedOrtder extends Component {
  constructor(props) {
    super();

    this.state = {
      myOrders: "",
      totalPrice: 0,
      payClassName: "",
    };
  }

  menuList = [];

  addMenu = (menu) => {
    let isPresent = false;
    this.menuList.forEach((item, index) => {
      if (menu.menu_id === item.menu_id) {
        isPresent = true;
        this.menuList[index].quantity++;
        this.setState({ myOrders: this.menuList }, () => {
          this.getTotal();
        });
      }
    });

    if (!isPresent) {
      const myObj = {};
      myObj.menu_id = menu.menu_id;
      myObj.menu_image = menu.menu_image;
      myObj.menu_price = menu.menu_price;
      myObj.quantity = 1;
      myObj.menu_name = menu.menu_name;
      this.menuList.push(myObj);
      this.setState({ myOrders: this.menuList }, () => {
        this.getTotal();
      });
    }
  };

  removeMenu = (id) => {
    if (this.state.myOrders) {
      this.menuList.forEach((item, index) => {
        if (item.menu_id === id) {
          if (item.quantity > 1) {
            this.menuList[index].quantity--;
          } else {
            this.menuList.splice(index, 1);
          }
        }
      });
      this.setState({ myOrders: this.menuList }, () => {
        this.getTotal();
      });
    }
  };

  renderMenu = () => {
    if (this.props.restaurantMenu) {
      return this.props.restaurantMenu.map((item) => {
        return (
          <div className="menu-box" key={item.id}>
            <div className="menu-info">
              <div className="green-box">
                <div className="green-inner-box"></div>
              </div>
              <h3 className="menu-name">{item.menu_name}</h3>
              <h3 className="menu-price">₹{item.menu_price}</h3>
              <h4 className="menu-desc">{item.description}</h4>
            </div>
            <div
              className="menu-img"
              style={{ backgroundImage: "url(" + item.menu_image + ")" }}
            >
              <button
                className="add"
                onClick={() => {
                  this.addMenu(item);
                }}
              >
                +
              </button>
              <button
                className="remove"
                onClick={() => {
                  this.removeMenu(item.menu_id);
                }}
              >
                -
              </button>
            </div>
          </div>
        );
      });
    }
  };

  renderMenuList = (orders) => {
    if (orders) {
      return orders.map((item,index) => {
        return (
          <div className="order-box" key={index}>
            <div
              className="order-box-img"
              style={{ backgroundImage: "url(" + item.menu_image + ")" }}
            ></div>
            <h3 style={{ color: "black" }}>x {item.quantity}</h3>
          </div>
        );
      });
    }
  };

  getTotal = () => {
    let total = 0;
    this.state.myOrders.forEach((item) => {
      total += item.menu_price * item.quantity;
    });

    this.setState({ totalPrice: total });
  };

  paynow = (pclassname) => {
    this.setState({ payClassName: pclassname });
  };

  render() {
    
      return (
        <>
          <div className={`proceed-section ${this.props.proceedClassName}`}>
            <div className="proceed-sec-box">
              <div className="proceed-inner-box">
                <h1 className="res_name">{this.props.resName}</h1>
                <img
                  src="https://i.ibb.co/vzTPcc1/rounded-stencil-x.jpg"
                  alt="x-mark"
                  ref="cross"
                  className="cross"
                />
                <div className="order-list">
                  {this.renderMenuList(this.state.myOrders)}
                </div>
                {this.renderMenu()}
              </div>
              <div className="total-box">
                <div className="total-price">
                  <h1 className="total-text">Total</h1>
                  <h1 className="total-val">₹{this.state.totalPrice}</h1>
                </div>
                <button
                  className="pay-now"
                  onClick={() => {
                    this.paynow("show-pay");
                    this.props.proceed("");
                  }}
                >
                  Pay Now
                </button>
              </div>
            </div>
            <div className="proceed-overlay"></div>
          </div>
          <GetInfo
            payClassName={this.state.payClassName}
            paynow={(pclassname) => {
              this.paynow(pclassname);
            }}
            resName={this.props.resName}
            totalPrice={this.state.totalPrice}
            orders={this.state.myOrders}
          />
        </>
      );
    
  }

  componentDidMount() {
    const cross = this.refs.cross;
    cross.addEventListener("click", () => {
      this.props.proceed("");
    });
  }
}

export default ProceedOrtder;
