import React, { Component } from 'react';
import * as RiIcons from "react-icons/ri";

export default class Tab2 extends Component {
  render() {
    return (
      <div className="tab-pane fade active show" id="metrics">
        <div className="container">
          <div className="row">
              <div className="col-md-12 card hover-shadow-2 text-center">
                <div className="card-body">
                    <h5 className="card-title font-weight-bold" >
                      Minimum Stake Amount   -   <span style={{color: "#816af8"}}>{this.props.minStakeAmount}</span>
                    </h5>
                </div>
              </div>
              <div className="col-md-12 card hover-shadow-4">
                <div className="card-body ">
                    <h5 className="card-title font-weight-bold" >
                      Total SALE Staked in Contract   -   <span style={{color: "#816af8"}}>{this.props.totalSaleStaked}</span>
                    </h5>
                </div>
              </div>
              <div className="col-md-12 card hover-shadow-4">
                <div className="card-body">
                    <h5 className="card-title font-weight-bold" >
                      Your SALE Staked   -   <span style={{color: "#816af8"}}>{this.props.yourSaleStaked}</span>
                    </h5>
                </div>
              </div>
              <div className="col-md-12 card hover-shadow-4">
                <div className="card-body">
                    <h5 className="card-title font-weight-bold" >
                      Sale Burned by DxStake   -   <span style={{color: "#816af8"}}>{this.props.totalBurned}</span>
                    </h5>
                </div>
              </div>
          </div>
        </div>
      </div>   
    );
  }
}
