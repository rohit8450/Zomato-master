import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import Header from "../Header/Header";
import ViewOrdersDisplay from "./ViewOrdersDisplay";
import "./ViewOrders.css";

const filterurl = "https://edumatoapifordev.herokuapp.com/viewOrders/";

const limit = 2;
let emailid = "";

class ViewOrders extends Component {
  constructor(props) {
    super();

    this.state = {
      ordersList: "",
      skip: 0,
      pageCountNub: 0,
    };
  }

  handlePageChange = ({ selected }) => {
    this.setState({ skip: selected * limit }, () => {
      fetch(`${filterurl}${emailid}?skip=${this.state.skip}&limit=${limit}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ ordersList: data });
        });
    });
  };

  renderContent = () => {
    if (sessionStorage.getItem("userData")) {
      emailid = sessionStorage.getItem("userData").split(',')[1]
      return (
        <>
          <h1 className="orders-text">Your Orders</h1>

          <div className="orders-box">
            <ViewOrdersDisplay orders_list={this.state.ordersList} />
            <ReactPaginate
              previousLabel={<span>Prev</span>}
              nextLabel={<span>Next</span>}
              pageCount={this.state.pageCountNub}
              marginPagesDisplayed={2}
              onPageChange={this.handlePageChange}
              containerClassName={"pagination-sec-order"}
              previousLinkClassName={"prevBtn-order"}
              nextLinkClassName={"nextBtn-order"}
              pageClassName={"page-item-order"}
              pageLinkClassName={"page-link-order"}
              activeClassName={"active-order"}
              disabledLinkClassName={"disable-order"}
            />
          </div>
        </>
      );
      
      
    }
    else{
      return (
        <div>
          <h1 style={{ margin: "2rem" }}>Login first to see booking</h1>
        </div>
      );
    }

  }

  render() {
    return (
      <>
        <Header />
        {this.renderContent()}
      </>
    );
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }
  componentDidMount() {
    fetch(`${filterurl}${emailid}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ pageCountNub: Math.ceil(data.length / limit) }, () => {
          fetch(`${filterurl}${emailid}?skip=${this.state.skip}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
              this.setState({ ordersList: data });
            });
        });
      });
  }
}

export default ViewOrders;
