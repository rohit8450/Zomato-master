import React, { Component } from "react";
import "./GetInfo.css";

const Posturl = "https://edumatoapifordev.herokuapp.com/placeOrder";
class GetInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: Math.floor(Math.random() * 100000),
      details: "",
      name: sessionStorage.getItem("userData")
        ? sessionStorage.getItem("userData").split(",")[0]
        : "",
      email: sessionStorage.getItem("userData")
        ? sessionStorage.getItem("userData").split(",")[1]
        : "",
      phone: sessionStorage.getItem("userData")
        ? sessionStorage.getItem("userData").split(",")[2]
        : "",
      address: "",
      status: "Pending",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const myOrderInfo = {};
    const item = this.state;
    myOrderInfo.id = Math.floor(Math.random() * 100000);
    myOrderInfo.name = item.name;
    myOrderInfo.email = item.email;
    myOrderInfo.phone = item.phone;
    myOrderInfo.restaurantName = this.props.resName;
    myOrderInfo.amount = this.props.totalPrice;
    myOrderInfo.address = item.address;
    myOrderInfo.status = item.status;
    myOrderInfo.ordersList = this.props.orders;
    myOrderInfo.status = item.status;

    console.log(myOrderInfo);

    fetch(Posturl, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(myOrderInfo),
    }).then(console.log("payment gateway"));
  };


  payCross = () => {
      this.props.paynow("");
  }

  renderContent = () => {
    if (sessionStorage.getItem("userData")) {
      return (
        <>
          <form
            method="POST"
            action="https://edupayment.herokuapp.com/paynow"
          >
            <div className="info-inner-box">
              <h1 className="res-name">{this.props.resName}</h1>
              <img
                src="https://i.ibb.co/vzTPcc1/rounded-stencil-x.jpg"
                alt="x-mark"
                onClick={this.payCross}
                className="pay-cross"
              />
              <div className="input-field">
                <label htmlFor="name" className="field">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={this.state.name}
                  placeholder="Enter your name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="email" className="field">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  required
                  name="email"
                  value={this.state.email}
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="phone" className="field">
                  Mobile number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  placeholder="Enter your mobile number"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="address" className="field">
                  Address
                </label>
                <textarea
                  type="text"
                  id="address"
                  required
                  name="address"
                  value={this.state.address}
                  placeholder="Enter your address"
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <input
                type="hidden"
                name="amount"
                value={this.props.totalPrice}
              />
              <input type="hidden" name="id" value={this.state.id} />
            </div>
            <div className="total-box">
              <div className="total-price">
                <h1 className="total-text">Total</h1>
                <h1 className="total-val">₹{this.props.totalPrice}</h1>
              </div>
              <button
                className="proceed-btn"
                type="submit"
                onClick={this.handleSubmit}
              >
                Proceed
              </button>
            </div>
          </form>
        </>
      );
    } else {
      return (
        <div>
          <img
            src="https://i.ibb.co/vzTPcc1/rounded-stencil-x.jpg"
            alt="x-mark"
            onClick={this.payCross}
            className="pay-cross"
          />
          <h1 style={{ margin: "2rem" }}>Login first to see booking</h1>
        </div>
      );
    }
  }

  render() {
    return (
      <>
        <div className={`info-section ${this.props.payClassName}`}>
          <div className="info-sec-box">
            {this.renderContent()}
          </div>

          <div className="pay-overlay"></div>
        </div>
      </>
    );
  }

}

export default GetInfo;
