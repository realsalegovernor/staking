import React, { Component } from 'react';
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default class StakeLayout extends Component {
  render() {
    return (
    <Router>
      <> 
        <div class="row">

                  <div class="col-md-8 col-xl-8 mx-auto">

                    <div class=" shadow-lg section-dialog bg-white text-black text-center">
                      <p><img src="assets/img/dxstake-logo.png" alt="logo"></img></p>
                      <br></br>

                    <div class="row">
                      <div class="col-md-12 col-xl-12 mx-auto">
                        <ul class="nav nav-tabs-outline nav-center nav-separated" role="tablist">
                          <Link to="/dxstake" >
                          <li class="nav-item">
                            <div id="dxstake-tab">
                              <a class="nav-link " data-toggle="tab" href="dxstake">DxStake</a>
                            </div>
                          </li>
                          </Link>
                          <Link to="/metrics"  >
                          <li class="nav-item">
                            <div id ="metrics-tab">
                              <a class="nav-link" data-toggle="tab" href="metrics">Metrics</a>
                            </div>
                          </li>
                          </Link>
                        </ul>
                      </div>
                    </div>

                      <div class="tab-content p-4">
                        <Switch>

                        <Route path="/" exact component={Tab1}/>
                        <Route path="/dxstake" component={Tab1}/>
                        
                        <Route path="/metrics" component={Tab2}/>
                        </Switch>
                        
                      </div>
                    </div>
                  </div>
                </div>
      </>
    </Router>
    );
  }
}
