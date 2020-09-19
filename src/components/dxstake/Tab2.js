import React, { Component } from 'react';
import * as FaIcons from "react-icons/fa";


export default class Tab2 extends Component {
  render() {
    return (
        <div className="tab-pane fade active show" id="metrics">
            <div className="container">
                <div className="row"> 
                  
                  <div className="col-md-12 card hover-shadow-2 text-center">
                    <div className="card-body">
                      <h4 className="card-title font-weight-bold header-left center" ><span className="mr-5 font-weight-bolder"><FaIcons.FaHeartbeat style={{color:"#ff4d4d"}}/></span>Wallet Balance: <span className="pl-2" style={{color: "#816af8"}}>21</span></h4>
                    </div>
                  </div>
                  
                  <div className="col-md-12 card hover-shadow-4">
                    <div className="card-body ">
                    <h4 className="card-title font-weight-bold header-left center" ><span className="mr-5 font-weight-bolder"><FaIcons.FaHeartbeat style={{color:"#ff4d4d"}}/></span>Total Staked: <span className="pl-2" style={{color: "#816af8"}}>42</span></h4>
                    </div>
                  </div>
                  
                  <div className="col-md-12 card hover-shadow-4">
                    <div className="card-body">
                    <h4 className="card-title font-weight-bold header-left center" ><span className="mr-5 font-weight-bolder"><FaIcons.FaHeartbeat style={{color:"#ff4d4d"}}/></span>Wallet Holders <span className="pl-2" style={{color: "#816af8"}}>42</span></h4>
                    </div>
                  </div>
                  
                  <div className="col-md-12 card hover-shadow-4">
                    <div className="card-body">
                    <h4 className="card-title font-weight-bold header-left center" ><span className="mr-5 font-weight-bolder"><FaIcons.FaHeartbeat style={{color:"#ff4d4d"}}/></span>Min Amt For Staking <span className="pl-2" style={{color: "#816af8"}}>42</span></h4>
                    </div>
                  </div>
                  <div className="col-md-12 card hover-shadow-4">
                    <div className="card-body">
                    <h4 className="card-title font-weight-bold header-left center" ><span className="mr-5 font-weight-bolder"><FaIcons.FaHeartbeat style={{color:"#ff4d4d"}}/></span>Total Burned From Staking <span className="pl-2" style={{color: "#816af8"}}>42</span></h4>
                    </div>
                  </div>
                  

                </div>
              </div>
        </div>
                   
    );
  }
}
