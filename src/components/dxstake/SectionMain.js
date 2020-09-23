import React, { Component } from 'react';
import Toast from 'light-toast';
import styled from 'styled-components';
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { STAKE_ADDRESS, SALE_TOKEN_ADDRESS, DXSTAKEABI, SALETOKENABI } from '../../config'


var WalletConnectProvider = require('@walletconnect/web3-provider');

export default class SectionMain extends Component {

  constructor(){
    super();
    this.state = { 
      account: '',
      saleBalance: 0,
      minStakeAmount: 0,
      totalSaleStaked: 0,
      yourSaleStaked: 0,
      totalBurned: 0,
      userRewards: 0,
      approvalAmount: 0,
      stakeContract: null,
      tokenContract: null,
      stakeAmount: 0,
      unstakeAmount: 0,
      web3: null,
      loading: true,
      showLoading: false,
      approved: false,
      name: "React",
      showTab1: true,
      showTab2: false,
      showTransaction: false,
      transactionHash: '0x0',
      showError: false,
      transactionError: 'Error',
      errorNotify: false,
      successNotify: false,
      //Bind functions to state
      disableNotifications: this.disableNotifications.bind(this),
      handleStakeUpdate: this.handleStakeUpdate.bind(this),
      handleUnStakeUpdate: this.handleUnStakeUpdate.bind(this),
      setStake: this.setStake.bind(this),
      removeStake: this.removeStake.bind(this),
      claimRewards: this.claimRewards.bind(this),
      reinvestRewards: this.reinvestRewards.bind(this),
      unstakeAll: this.unstakeAll.bind(this),
      approveContract: this.approveContract.bind(this),
    };

  }

  //Connect to web3
  async connectWeb3(){
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
        }
      }
    }
    
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });
    
    const provider = await web3Modal.connect();

    const newWeb3 = new Web3(provider);
    this.setState({ web3: newWeb3 });
    this.connectAndLoad();

  }

  //Disable toast notifications
  disableNotifications(event){
    this.setState({successNotify: false});
    this.setState({errorNotify: false})
    this.setState({loading7: false})
  }

  async showLoading(){
    this.state.showLoading && Toast.loading("Loading");
  }

  //Update stake amount -> functions for child component
  handleStakeUpdate(event){
    this.setState({ stakeAmount: event.target.value });
  }

  //Update unstake amount -> functions for child component
  handleUnStakeUpdate(event){
    this.setState({ unstakeAmount: event.target.value });
  }

  // Connect and load contracts and data as needed 
  async connectAndLoad(){
    if (this.state.web3 != null){
      const accounts = await this.state.web3.eth.getAccounts();
      this.setState({ account: accounts });
      console.log("My Address: ", this.state.account);
      const stkContract = new this.state.web3.eth.Contract(DXSTAKEABI, STAKE_ADDRESS);
      this.setState({ stakeContract: stkContract });
      const tknContract = new this.state.web3.eth.Contract(SALETOKENABI, SALE_TOKEN_ADDRESS);
      this.setState({ tokenContract: tknContract });
      this.setState({ loading: false })
      this.reloadData();
    }
  }

  reloadData(){
    this.minStkAmount();
    this.getTokenBalance();
    this.getContractAllowance();
    this.getUserRewards();
    this.getUserStake();
    this.getTotalStake();
    this.getTotalBurned();
    console.log("Current State: ", this.state)
  }

  // Get minimum staking amount
  async minStkAmount(){
    if (this.state.web3 !== null && this.state.stakeContract !== null){
      const minAmount = await this.state.stakeContract.methods.getMinimumStakeAmount().call();
      this.setState({minStakeAmount: minAmount/1000000000000000000});
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get user token balance
  async getTokenBalance(){
    if (this.state.web3 !== null && this.state.tokenContract !== null && this.state.account !== ''){
      const amount = await this.state.tokenContract.methods.balanceOf(this.state.account[0]).call();
      this.setState({saleBalance: Math.floor((amount/1000000000000000000)*100)/100});
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get contract allowance
  async getContractAllowance(){
    if (this.state.web3 !== null && this.state.tokenContract !== null && this.state.account !== ''){
      const amount = await this.state.tokenContract.methods.allowance(this.state.account[0], STAKE_ADDRESS).call();
      this.setState({approvalAmount: amount/1000000000000000000});
      const approvalCheck = amount/1000000000000000000;
      if (approvalCheck >= 40000000){
        this.setState({approved: true});
      }
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get user rewards
  async getUserRewards(){
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      const amount = await this.state.stakeContract.methods.CHECKREWARD().call({ from: this.state.account[0] });
      if (amount >= 50000000){
        this.setState({userRewards: 0});
      }
      else{
        this.setState({userRewards: Math.floor(amount*100)/100});
      }
      
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get user staked tokens
  async getUserStake(){
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      const amount = await this.state.stakeContract.methods.CHECKSTAKE().call({ from: this.state.account[0] });
      console.log("Users Staked amount: ", amount)
      if (amount >= 1000000000){
        this.setState({yourSaleStaked: 0});
      }
      else{
        this.setState({yourSaleStaked: Math.floor(amount*100)/100});
      }
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get total staked tokens
  async getTotalStake(){
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      const amount = await this.state.stakeContract.methods.totalStaked().call();
      this.setState({totalSaleStaked: Math.ceil(((amount/1000000000000000000)*100)/100)});
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Get burned tokens
  async getTotalBurned(){
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      const amount = await this.state.stakeContract.methods.totalBurned().call();
      this.setState({totalBurned: Math.ceil(((amount/1000000000000000000)*100)/100)});
    }
    else{
      console.log('Web3 connection issue');
    }
  }

  // Set stake function
  async setStake() {
    Toast.loading("Transaction in Process!");
    this.setState({ showError: false });
    this.setState({ showTransaction: false});
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      console.log(this.state.stakeAmount);
      const stakeAmount = String(Math.floor(this.state.stakeAmount)) + "000000000000000000";
      console.log(stakeAmount)
      this.state.stakeContract.methods.createStake(stakeAmount).send({ from: this.state.account[0] })
      .on('transactionHash', (receipt) => {
        this.setState({ showTransaction: true });
        this.setState({ transactionHash: receipt });
      })
      .on('error', (error) => {
        this.setState({ transactionError: error.message });
        this.setState({ showError: true });
        Toast.fail('Failed', 1500)
      })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.reloadData();
        Toast.success('Success', 1500)
      });
    }
    
  };

  // Remove stake function 
  async removeStake() {
    Toast.loading("Transaction in Process!");
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      const stakeAmount = String(Math.floor(this.state.unstakeAmount)) + "000000000000000000";
      this.state.stakeContract.methods.finishStake(stakeAmount).send({ from: this.state.account[0] })
      .on('transactionHash', (receipt) => {
        this.setState({ showTransaction: true });
        this.setState({ transactionHash: receipt });
      })
      .on('error', (error) => {
        this.setState({ transactionError: error.message });
        this.setState({ showError: true });
        Toast.fail('Failed', 1500)
      })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.reloadData();
        Toast.success('Success', 1500)
      });
    }
  };

  // Claim rewards function
  async claimRewards() {
    Toast.loading("Transaction in Process!");
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      this.state.stakeContract.methods.CLAIMREWARD().send({ from: this.state.account[0] })
      .on('transactionHash', (receipt) => {
        this.setState({ showTransaction: true });
        this.setState({ transactionHash: receipt });
      })
      .on('error', (error) => {
        this.setState({ transactionError: error.message });
        this.setState({ showError: true });
        Toast.fail('Failed', 1500)
      })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.reloadData();
        Toast.success('Success', 1500)
      });
    }
  };

  // Reinvest rewards function
  async reinvestRewards() {
    Toast.loading("Transaction in Process!");
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      this.state.stakeContract.methods.REINVESTREWARD().send({ from: this.state.account[0] })
      .on('transactionHash', (receipt) => {
        this.setState({ showTransaction: true });
        this.setState({ transactionHash: receipt });
      })
      .on('error', (error) => {
        this.setState({ transactionError: error.message });
        this.setState({ showError: true });
        Toast.fail('Failed', 1500)
      })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.reloadData();
        Toast.success('Success', 1500)
      });
    }
  };

  // Unstake all and claim rewards function
  async unstakeAll() {
    Toast.loading("Transaction in Process!");
    if (this.state.web3 !== null && this.state.stakeContract !== null && this.state.account !== ''){
      this.state.stakeContract.methods.UnStake().send({ from: this.state.account[0] })
      .on('transactionHash', (receipt) => {
        this.setState({ showTransaction: true });
        this.setState({ transactionHash: receipt });
      })
      .on('error', (error) => {
        this.setState({ transactionError: error.message });
        this.setState({ showError: true });
        Toast.fail('Failed', 1500)
      })
      .once('receipt', (receipt) => {
        console.log(receipt);
        this.reloadData();
        Toast.success('Success', 1500)
      });
    }
  };

  // Approve contract to spend tokens
  async approveContract(){
    Toast.loading("Approving");
    if (this.state.web3 !== null && this.state.tokenContract !== null && this.state.account !== ''){
      this.state.tokenContract.methods.approve(STAKE_ADDRESS, "5000000000000000000000000000").send({ from: this.state.account[0] })
      .on('transactionHash', (receipt) => {
        this.setState({ showTransaction: true });
        this.setState({ transactionHash: receipt });
      })
      .on('error', (error) => {
        this.setState({ transactionError: error.message });
        this.setState({ showError: true });
        Toast.fail('Failed', 1500)
      })
      .once('receipt', (receipt) => {
        console.log(receipt);
        const status = this.isItApproved();
        if (status){
          this.setState({ approved: true });
          Toast.success('Success', 1500)
        }
      });
    }
  }

  async isItApproved(){
    const amount = await this.state.tokenContract.methods.allowance(this.state.account[0], STAKE_ADDRESS).call();
    if (amount >= 40000000){
      this.setState({ approvalAmount: amount });
      return true;
    }
    else{
      return false;
    }
  }

  // Show tab 1 or 2
  showTab(name) {
    console.log(name);
    switch (name) {
      case "showTab1":
        if (!this.state.showTab1){
          this.setState({ showTab1: true })
          this.setState({ showTab2: false })
        }
        break;
      case "showTab2":
        if (!this.state.showTab2){
          this.setState({ showTab1: false })
          this.setState({ showTab2: true })
        }
        break;
    }
  }

  //{color: this.state.showTab2 ? "#A933ff" : "#000", borderColor: "#fff", backgroundColor: "#fff",  }

  render() {
    const { showTab1, showTab2 } = this.state;
    const HoverText = styled.button`
      color: #fff;
      :hover {
        color: #A933ff;
        backgroundColor: "#fff";
        cursor: pointer;
      }

    `
    return (
        <> 
          <nav className="navbar navbar-expand-lg navbar-dark navbar-stick-dark" data-navbar="static">
            <div className="container">

              <div className="navbar-left">
                <button className="navbar-toggler" type="button"></button>
                    <a className="navbar-brand" href="#">
                    <img className="logo-dark" src="assets/img/logo-dark.png" alt="logo"></img>
                    <img className="logo-light" src="assets/img  /logo-light.png" alt="logo"></img>
                    </a>
              </div>
              { this.state.loading 
                ? <button className="btn btn-warning btn-round" onClick={() => this.connectWeb3()}>Connect</button>
                    
              : <div><img className="img-rounded img-address"src="assets/img/address_icon.png"></img>{" " + this.state.account[0].substring(0, 6) +  "..." + this.state.account[0].substr(this.state.account[0].length - 4)}</div>
              }
            </div>
        </nav>
        { this.state.loading 
          ? <div id="test" className="text-center"><br/><br/><br/><br/><h1 className="text-center">Connect your wallet to start!</h1></div> 
          : <main className="main-content">
              <section className="section bg-fixed py-10 overlay opacity-95" style= {{backgroundColor: "#6650B1"}}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 col-xl-8 mx-auto">
                        <div className=" shadow-lg section-dialog bg-white text-black text-center">
                            <p><img src="assets/img/dxstake-logo.png" alt="logo"></img></p>
                            <br></br>
                            <div className="row">
                                <div className="col-md-12 col-xl-12 mx-auto">
                                    <ul className="nav nav-tabs-outline nav-center nav-separated" role="tablist">
                                        <li className="nav-item">
                                            <div id="dxstake-tab">
                                                <button className="btn btn-light btn-round" data-toggle="tab" onClick={() => this.showTab("showTab1")} style={{color: this.state.showTab1 ? "#6F0AB4" : "#C9C6C9"}}>DxStake</button>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div id="metrics-tab">
                                                <button className="btn btn-light btn-round" data-toggle="tab" onClick={() => this.showTab("showTab2")} style={{color: this.state.showTab2 ? "#6F0AB4" : "#C9C6C9"}}>Metrics</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tab-content p-4">
                              {showTab1 && <Tab1 {...this.state}/>}
                              {showTab2 && <Tab2 {...this.state}/>}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
              </section>
            </main> 
        }
      </>
    );
  }
}
