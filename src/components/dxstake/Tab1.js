import React, { Component } from 'react';




export default class Tab1 extends Component {
  render() {
    return (
        <div class="tab-pane fade active show" id="dxstake">
        <div class="container">


          <hr class="w-2"></hr>
          <h4>Address Balance: <span>0.0</span> </h4>
          <hr class="w-2"></hr>
          <form class="input-round">

            <div class="form-group input-group">
              <input type="number" class="form-control" placeholder="SALE AMOUNT"></input>
              <div class="input-group-prepend">
                <button class="btn btn-primary overlay opacity-95 " type="button" style={{borderColor: "white", backgroundColor: "#816af8"}}>Stake</button>
              </div>
            </div>


            <div class="form-group input-group">
              <input type="number" class="form-control" placeholder="SALE AMOUNT"></input>
              <div class="input-group-prepend">
                <button class="btn btn-primary overlay opacity-95 stake_btn" type="button"style={{borderColor: "white", backgrounColor: "#816af8"}}>Unstk</button>
              </div>
            </div>

            <br></br>
            <h4>Your Available Staking Re: <span>0.0</span> </h4>
            <br></br>



            <div class="form-group input-group">
              <div class="input-group-append">
                <button class="btn btn-primary overlay opacity-95" type="button" style={{borderColor: "#ffffff", backgroundColor: "#816af8"}}>Reinvest</button>
              </div>
              <input type="number" class="form-control" placeholder="SALE AMOUNT"></input>

              <div class="input-group-prepend">
                <button class="btn btn-primary overlay opacity-95" type="button">Withdraw</button>
              </div>
            </div>


          </form>
        </div>
      </div>
      
    );
  }
}
