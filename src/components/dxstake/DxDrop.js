import React, { Component } from 'react';


export default class DxDrop extends Component {

  render() {
    return (
      <div className="tab-pane fade active show" id="dxstake">
        <div className="container">
          <div id="showStaking">
            <form className="input-round">
                <h6><span style={{ color: '#8A61F8' }}>To those that were rugged by Hatch DAO:</span><br/><span style={{ fontSize: '80%' }}>We know how painful it is when you experience a scam or rug pull. DxSale is here to try and reduce this! Press the button below to claim an Aidrop of $SALE. Note if you were not holding any tokens at the time of the snapshot, the transaction will fail.</span><br/><br/><span style={{ color: '#8A61F8' }}>To our DxSale community:</span><br/><span style={{ fontSize: '80%' }}>Airdrops from all participating token sales will be claimable by our stakers in this tab in the future.</span></h6>
                <br/><div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                  { this.props.airdropEligibility
                    ? <button className="btn btn-primary" type="button" onClick={this.props.claimAirdrop} style={{fontSize: '80%', width:"150px"}}>
                        Claim
                      </button>
                    : <div>Sorry you are not eligible for this airdrop.</div>
                  }
                  </div>
                </div>
                    
            </form>
          </div>
        </div>
      </div>
    );
  }
}
