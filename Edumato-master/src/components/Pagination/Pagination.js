import React, { Component } from "react";
import "./Pagination.css";

const limit = 2;

class Pagination extends Component {
  constructor(props) {
    super();
    this.state = {
      activeNum: 1,
    };
  }
  changeInterval = (index) => {
    this.props.setResIndexes(index * limit - limit, index * limit);
    this.setState({ activeNum: index }, () => {
      if (this.state.activeNum === 1) {
        this.setState({ restrictedPrev: true }, () => {
          this.setState({ restrictedNext: false });
        });
      } else if (this.state.activeNum === this.props.dataLen / limit) {
        this.setState({ restrictedNext: true }, () => {
          this.setState({ restrictedPrev: false });
        });
      }
    });
  };

  previousInterval = () => {
    if (this.state.activeNum > 1) {
      this.setState({ activeNum: this.state.activeNum - 1 }, () => {
        this.props.setResIndexes(
          this.state.activeNum * limit - limit,
          this.state.activeNum * limit
        );
        if (this.state.activeNum === 1) {
          this.setState({ restrictedPrev: true }, () => {
            this.setState({ restrictedNext: false });
          });
        }
      });
    }
  };

  nextInterval = () => {
    if (this.state.activeNum < this.props.dataLen / limit) {
      this.setState({ activeNum: this.state.activeNum + 1 }, () => {
        this.props.setResIndexes(
          this.state.activeNum * limit - limit,
          this.state.activeNum * limit
        );
        if (this.state.activeNum === this.props.dataLen / limit) {
          this.setState({ restrictedNext: true }, () => {
            this.setState({ restrictedPrev: false });
          });
        }
      });
    }
  };

  renderPageNumbers = (dataLen) => {
    const numbers = [];
    const Len = Math.ceil(dataLen / limit);
    for (let i = 1; i <= Len; i++) {
      numbers.push(i);
    }

    return numbers.map((number) => {
      let ActiveClass = number === this.state.activeNum ? "active" : "";
      return (
        <li
          key={number}
          className={`${ActiveClass}`}
          onClick={() => {
            this.changeInterval(number);
          }}
        >
          <h4>{number}</h4>
        </li>
      );
    });
  };

  render() {
    return (
      <>
        <ul className="pagination-sec">
          <li onClick={this.previousInterval}>
            <i className="fas fa-chevron-left"></i>
          </li>
          {this.renderPageNumbers(this.props.dataLen)}
          <li onClick={this.nextInterval}>
            <i className="fas fa-chevron-right"></i>
          </li>
        </ul>
      </>
    );
  }
}

export default Pagination;
