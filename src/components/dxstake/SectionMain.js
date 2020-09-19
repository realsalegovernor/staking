import React, { Component } from 'react';
import StakeLayout from './StakeLayout'
import Web3 from 'web3';

export default class SectionMain extends Component {

  constructor(){
    super();
    this.account = ''
  }

  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider);
    const network = await web3.eth.net.getNetworkType();
    console.log("network: ", network);
    const accounts = await web3.eth.getAccounts();
    this.account = accounts[0];
    console.log("My Address: ", this.account);
  }

  async tokenBalance(){

  }

  render() {
    return (
        <div> 
          
          <main class="main-content">
          <section  class="section bg-fixed py-10 overlay opacity-95" style= {{backgroundColor: "#816af8"}}>
            <div class="container">
                <StakeLayout/>
            </div>
          </section>
          </main>
        
        </div>
    );
  }
}
