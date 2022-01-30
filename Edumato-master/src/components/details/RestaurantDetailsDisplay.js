import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header/Header";
import ProceedOrder from "./ProceedOrder";
import "./RestaurantDetailsDisplay.css";

const NextArrowBtn = (props) => {
  const { onClick } = props;
  return (
    <div className="className next-gal">
      <i
        className="fas fa-chevron-right"
        style={{ color: "white" }}
        onClick={onClick}
      ></i>
    </div>
  );
};

const PrevArrowBtn = (props) => {
  const { onClick } = props;
  return (
    <div className="className prev-gal">
      <i
        className="fas fa-chevron-left"
        style={{ color: "white" }}
        onClick={onClick}
      ></i>
    </div>
  );
};

class RestaurantDetails extends Component {
  constructor(props) {
    super();

    this.state = {
      restaurant_detail: null,
      proceedClassName: "",
      showImageClass: "image-gallery-hide",
    };
  }

  render_restaurant_detail = () => {
    if (this.props.restaurantDetail) {
      return (
        <div className="restaurant-details">
          <div
            className="restaurant-img"
            style={{
              backgroundImage: `url(${this.props.restaurantDetail.restaurant_thumb})`,
            }}
          ></div>
          <h1 className="restaurant-name">
            {this.props.restaurantDetail.restaurant_name}
          </h1>
          <div className="navigation">
            <Tabs defaultTab="one">
              <TabList>
                <Tab tabFor="one">
                  <h3 className="nav-name">Overview</h3>
                </Tab>
                <Tab tabFor="two">
                  <h3 className="nav-name">Contact</h3>
                </Tab>
              </TabList>
              <TabPanel tabId="one">
                <div className="overview-box">
                  <div className="about">
                    <h3 className="about-name">About this place</h3>
                  </div>
                  <div className="cuisine-box">
                    <h3 className="cuisine-text">Cuisine</h3>
                    <div className="cuisine-info">
                      <h4>
                        <span>
                          {this.props.restaurantDetail.cuisines[0].cuisine_name}
                          ,
                        </span>
                        <span>
                          {this.props.restaurantDetail.cuisines[1].cuisine_name}
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className="avg-box">
                    <h3 className="avg-text">Average Cost</h3>
                    <div className="avg-info">
                      <h4>
                        ₹{this.props.restaurantDetail.cost} for two people
                        (approx.)
                      </h4>
                    </div>
                  </div>
                  <div className="avg-box">
                    <h3 className="avg-text">Rating</h3>
                    <div className="avg-info">
                      <h4>{this.props.restaurantDetail.rating_text}</h4>
                      <h4>
                        Avg. Rating:{" "}
                        {this.props.restaurantDetail.average_rating}
                      </h4>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel tabId="two">
                <div className="contact-box">
                  <div className="phone-nub">
                    <h2 className="phone-nob-text">Phone Number</h2>
                    <h2 className="act-phone-no">
                      +91 {this.props.restaurantDetail.contact_number}
                    </h2>
                  </div>
                  <div className="res-address">
                    <h3 className="rest-name">
                      {this.props.restaurantDetail.restaurant_name}
                    </h3>
                    <h3 className="rest-address">
                      {this.props.restaurantDetail.address}
                    </h3>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
            <button
              className="place-order-btn"
              onClick={() => {
                this.proceed("show-proceed");
              }}
            >
              Place Online Order
            </button>
          </div>
        </div>
      );
    }
  };

  renderGallery = () => {
    if (this.props.restaurantDetail) {
      return this.props.restaurantDetail.image_gallery.map(
        (res_image, index) => {
          return (
            <div className="img-gal" key={index}>
              <img src={res_image} alt="menuImage" />
            </div>
          );
        }
      );
    }
  };

  proceed = (pclassname) => {
    this.setState({ proceedClassName: pclassname });
  };

  showImageGallery = (galleryClass) => {
    this.setState({ showImageClass: galleryClass });
  };

  render() {
    const settings = {
      adaptiveHeight: false,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrowBtn />,
      prevArrow: <PrevArrowBtn />,
    };
    return (
      <>
        <Header />
        <Link to={`/list/${this.props.backResDetails}`}>
          <button className="back">Go Back</button>
        </Link>
        {this.render_restaurant_detail()}
        <button
          className="img-gallery-btn"
          ref="imgGalleryBtn"
          onClick={() => {
            this.showImageGallery("image-gallery-active");
          }}
        >
          Click to see Image Gallery
        </button>
        <ProceedOrder
          proceedClassName={this.state.proceedClassName}
          proceed={(pclassname) => {
            this.proceed(pclassname);
          }}
          restaurantMenu={this.props.restaurantMenu}
          resName={this.props.restaurantDetail.restaurant_name}
        />

        <div className={this.state.showImageClass}>
          <i
            className="far fa-times-circle image-cross"
            onClick={() => {
              this.showImageGallery("image-gallery-hide");
            }}
          ></i>
          <div className="images-box">
            <Slider {...settings}>{this.renderGallery()}</Slider>
          </div>
          <div className="image-overlay"></div>
        </div>
      </>
    );
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }
}

export default RestaurantDetails;
