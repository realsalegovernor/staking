import React, { Component } from 'react';


export default class Tab1 extends Component {

  render() {
    return (
      <div className="tab-pane fade active show" id="dxstake">
        <div className="container">
            <br/>
            <h6>Wallet Balance: <span>{this.props.saleBalance}</span> </h6>
            <h6>Staked SALE: <span>{this.props.yourSaleStaked}</span> </h6>
            <br/>
            { !this.props.approved
            ? 
            <div id="approvalRequired">
              <button className="btn btn-danger" onClick={this.props.approveContract}>
              Approve Contract to Spend SALE
              </button>
            </div>
            : 
            <div id="showStaking">
              <form className="input-round">
                  <div className="form-group input-group">
                    <input type="number" className="form-control" placeholder="SALE AMOUNT" value={this.props.stakeAmount} onChange={this.props.handleStakeUpdate}></input>
                    <div className="input-group-prepend">
                        <button className="btn btn-primary overlay opacity-95 " onClick={this.props.setStake} type="button" style={{borderColor: "#8A61F8", backgroundColor: "#8A61F8",  marginRight:"3px", width:"150px" }}>
                        Stake
                        </button>
                    </div>
                  </div>
                  <div className="form-group input-group">
                    <input type="number" className="form-control" placeholder="SALE AMOUNT" value={this.props.unstakeAmount} onChange={this.props.handleUnStakeUpdate}></input>
                    <div className="input-group-prepend">
                        <button className="btn btn-primary overlay opacity-95" onClick={this.props.removeStake} type="button" style={{borderColor: "#8A61F8", backgroundColor: "#8A61F8",  marginRight:"3px", width:"150px" }}>
                        Unstake
                        </button>
                    </div>
                  </div>
                  <br/>
                  <h6>Staking Rewards: <span>{this.props.userRewards}</span> </h6>
                  <br/>

                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                    <button className="btn btn-primary" type="button" onClick={this.props.reinvestRewards} style={{width:"200px"}}>
                    Reinvest
                    </button>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                    <button className="btn btn-secondary" type="button" onClick={this.props.unstakeAll} style={{width:"200px"}}>
                    Unstake and Claim
                    </button>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                    <button className="btn btn-primary" type="button" onClick={this.props.claimRewards} style={{width:"200px"}}>
                    Claim
                    </button>
                    </div>
                  </div>
                  {this.props.showError && 
                  <div>
                    <br/>
                    <p>{this.props.transactionError}</p>
                  </div>
                  }
                  {this.props.showTransaction && 
                  <div>
                    <br/>
                    <p>Transaction Hash: {this.props.transactionHash}</p>
                  </div>
                  }
              </form>
            </div>
            }
        </div>
      </div>
    );
  }
}
