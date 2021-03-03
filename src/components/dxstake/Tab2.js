import React, { Component } from 'react';

export default class Tab2 extends Component {
  render() {
    return (
      <div className="tab-pane fade active show" id="metrics">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 vertical-center" style={{ backgroundColor: "#f0eaff" }}>
                <h6 style={{ color: "#000", fontSize: "80%", marginTop: "5px" }}>
                Minimum Stake Amount
                <br/><span style={{color: "#1e30ed"}}>{this.props.minStakeAmount}</span>
                </h6>
            </div>
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-12">
              <br className="d-block d-sm-none"/>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 vertical-center" style={{ backgroundColor: "#f0eaff" }}>
                <h6 style={{ color: "#000", fontSize: "80%", marginTop: "5px" }}>
                Total SALE Staked in Contract
                <br/><span style={{color: "#1e30ed"}}>{this.props.totalSaleStaked}</span>
                </h6>
            </div>
          </div>
          <br/>
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 vertical-center" style={{ backgroundColor: "#f0eaff" }}>
                <h6 style={{ color: "#000", fontSize: "80%", marginTop: "5px" }}>
                SALE Burned by DxStake
                <br/><span style={{color: "#1e30ed"}}>{this.props.totalBurned}</span>
                </h6>
            </div>
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-12">
              <br className="d-block d-sm-none"/>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 vertical-center" style={{ backgroundColor: "#f0eaff" }}>
                <h6 style={{ color: "#000", fontSize: "80%", marginTop: "5px" }}>
                SALE Price (Coingecko)
                <br/><span style={{color: "#1e30ed"}}>{this.props.salePrice}</span>
                </h6>
            </div>
          </div>
          <br/>
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 vertical-center" style={{ backgroundColor: "#f0eaff" }}>
                <h6 style={{ color: "#000", fontSize: "80%", marginTop: "5px" }}>
                Effective Circulating Supply
                <br/><span style={{color: "#1e30ed"}}>{Math.floor((26633690 - this.props.totalSaleStaked - this.props.totalBurned)*100)/100}</span>
                </h6>
            </div>
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-12">
              <br className="d-block d-sm-none"/>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 vertical-center" style={{ backgroundColor: "#f0eaff" }}>
                <h6 style={{ color: "#000", fontSize: "80%", marginTop: "5px" }}>
                Effective Market Cap
                <br/><span style={{color: "#1e30ed"}}>{Math.floor(((26633690 - this.props.totalSaleStaked - this.props.totalBurned)*this.props.salePrice)*100)/100}</span>
                </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
