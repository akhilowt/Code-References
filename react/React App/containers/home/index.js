import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../../shared/components/ui/form/TextValidator';
import { apiService } from '../../services';
import Alert from 'react-bootstrap/Alert';
import * as actions from '../../store/actions'

import ContactUsMap from './ContactUsMap';


class Home extends Component {
   state = {
      showForgetPasswordForm: false,
      user: {
         name: "",
         password: "",
         remember: "",
         loading: false,
         errorMessage: ""
      },
      resetlink: {
         username: "",
         loading: false,
         errorMessage: ""
      }
   }
   handleChange = (e) => {
      const { user } = this.state;
      user[e.target.name] = e.target.value;
      this.setState({ user });
   }
   handleSubmit = (e) => {
      e.preventDefault();
      const { user } = this.state;
      this.setState(prevState => {
         let user = Object.assign({}, prevState.user);   // creating copy of state variable user
         user.loading = true;                            // update the name property, assign a new value                 
         //return { user };  
         this.props.actions.loginSuccess(user);                              // return new object user object
      });
      // apiService.login(user.name, user.password)
      //    .then(response => {
      //       debugger;
      //       if (response.Success) {
      //          this.props.actions.loginSuccess(user);
      //          this.setState({ user: {} });
      //       }
      //       else {
      //          this.setState(prevState => {
      //             let user = Object.assign({}, prevState.user);  // creating copy of state variable user
      //             user.loading = false;
      //             user.errorMessage = response.Message;              // update the name property, assign a new value                 
      //             return { user };                                 // return new object user object
      //          })
      //       }
      //    },
      //       error => this.setState(prevState => {
      //          let user = Object.assign({}, prevState.user);  // creating copy of state variable user
      //          user.loading = false;
      //          user.errorMessage = error;                     // update the name property, assign a new value                 
      //          return { user };                                 // return new object user object
      //       })
      //    );
   }
   handleRestLinkChange = (e) => {
      const { resetlink } = this.state;
      resetlink[e.target.name] = e.target.value;
      this.setState({ resetlink });
   }
   handleRestLinkSubmit = (e) => {
      debugger;
      e.preventDefault();
      const { resetlink } = this.state;
      this.setState(prevState => {
         let resetlink = Object.assign({}, prevState.resetlink);   // creating copy of state variable user
         resetlink.loading = true;                            // update the name property, assign a new value                 
         return { resetlink };                                // return new object user object
      });
      // apiService.sendResetPasswordEmail(resetlink.username)
      //    .then(response => {
      //       debugger;
      //       if (response.Success) {
      //          this.setState({ resetlink: {} });
      //       }
      //       else {
      //          this.setState(prevState => {
      //             let resetlink = Object.assign({}, prevState.user);  // creating copy of state variable user
      //             resetlink.loading = false;
      //             resetlink.errorMessage = response.Message;              // update the name property, assign a new value                 
      //             return { resetlink };                                 // return new object user object
      //          })
      //       }
      //    },
      //       error => this.setState(prevState => {
      //          let resetlink = Object.assign({}, prevState.resetlink);  // creating copy of state variable user
      //          resetlink.loading = false;
      //          resetlink.errorMessage = error;                     // update the name property, assign a new value                 
      //          return { resetlink };                                 // return new object user object
      //       })
      //    );
   }
   componentDidMount() {
   }
   handleToggleForgotPasswordForm = (e) => {
      this.setState({ showForgetPasswordForm: !this.state.showForgetPasswordForm, user: {}, resetlink: {} });
   }
   hadleCloseAlert = (e) => {
      this.setState(prevState => {
         let user = Object.assign({}, prevState.user);  // creating copy of state variable user
         user.errorMessage = null;                     // update the name property, assign a new value                 
         return { user };                                 // return new object user object
      });
   }
   render() {
      const { user, showForgetPasswordForm, resetlink } = this.state;
      const { auth } = this.props;
      return (
         <Fragment>
            <section id="intro" className="clearfix">
               <div className="container">
                  <div className="row">
                     <div className="col-sm-6">
                        <div className="intro-img">
                           <img src={'../../../assets/images/intro-img.svg'} alt="" className="img-fluid" />
                        </div>
                        <div className="intro-info">
                           <h2>Alternatives CourtLink</h2>
                           <p className="text-white">Alternatives CourtLink is a controlled-access system designed to facilitate information sharing between local court systems and referral sources and Alternatives. If you believe you should have access to this site, please click the button below to contact us with your request.</p>
                           <div>
                              <a href="#contact" className="btn-get-started scrollto">Learn More</a>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-5 offset-sm-1">
                        {
                           !auth.loggedIn && (
                              <div className="card card-signin">
                                 <div className="card-body">
                                    {
                                       showForgetPasswordForm ?
                                          (
                                             <section id="section-forget-password">
                                                <h5 className="card-title text-center ">Forgot Password</h5>
                                                <p>
                                                   Enter your user name below. If you are a registered user, an email with a link to reset your password will be sent to the email address on record.
                                                </p>
                                                <ValidatorForm
                                                   onSubmit={this.handleRestLinkSubmit}
                                                   className="form-horizontal"
                                                >
                                                   <div className="signupForm">
                                                      <div className="input-group">
                                                         <input type="text" className="form-control" placeholder="Username" />
                                                      </div>
                                                      <div className="error">The User Name field is required</div>
                                                   </div>
                                                   <button className="btn btn-lg btn-primary btn-block text-uppercase " type="submit">Reset Password</button>
                                                   <hr />
                                                   <div className="text-center">
                                                      <a href="Javascript:void(0)" data-signin="login" onClick={this.handleToggleForgotPasswordForm}>Back to log in</a>
                                                   </div>
                                                </ValidatorForm>
                                             </section>
                                          )
                                          :
                                          (
                                             <section id="section-login">
                                                <h5 className="card-title text-center">Sign In
                                                {user.errorMessage &&
                                                      <Alert variant="danger" onClose={() => this.hadleCloseAlert(false)} dismissible>{user.errorMessage}</Alert>
                                                   }
                                                </h5>
                                                <form
                                                   onSubmit={this.handleSubmit}
                                                   className="form-horizontal">
                                                   <div className="signupForm">
                                                      <div className="input-group">
                                                         <input type="text" className="form-control" placeholder="Username" />
                                                      </div>
                                                      <div className="error">Username field is required</div>
                                                   </div>
                                                   <div className="signupForm">
                                                      <div className="input-group">
                                                         <input type="text" className="form-control" placeholder="Password" />
                                                      </div>
                                                      <div className="error">Password field is required</div>
                                                   </div>
                                                   <div className="signupForm">
                                                      <label className="checkbox">
                                                         <input type="checkbox" /><span className="primary"></span>
                                                      </label>
                                                      <span className="checkActive">Remember Password</span>
                                                   </div>
                                                   <button className="btn btn-lg btn-primary btn-block text-uppercase" disabled={user.loading} type="submit">
                                                      {
                                                         user.loading &&
                                                         <div className="spinner-border btn-loading"></div>
                                                      }
                                                      Sign in
                           </button>
                                                   <hr />
                                                   <div className="text-center">
                                                      <a href="Javascript:void(0)" data-signin="reset" onClick={this.handleToggleForgotPasswordForm}>Forgot your password?</a>
                                                   </div>
                                                </form>
                                             </section>
                                          )
                                    }
                                 </div>
                              </div>
                           )
                        }
                     </div>
                  </div>
               </div>
            </section>
            <section id="about">
               <div className="container">
                  <div className="row"><div className="col-sm-12">
                     <header className="section-header">
                        <h3>About Us</h3>
                        <p>Beta Alternatives offers a wide range of community based correctional programs
                           and misdemeanor probation and pre-trial supervision. We provide services in Yellowstone,
                           Carbon, and Stillwater Counties.
               </p>
                     </header>
                     <div className="about-container">
                        <h4>Beta aids over 5,000 clients annually. We offer supervision and treatment services designed to:</h4>
                        <ul>
                           <li>Reduce jail overcrowding,</li>
                           <li>Teach responsibility,</li>
                           <li>Keep indigent offenders out of jail,</li>
                           <li>Permit non-dangerous offenders to retain employment, and</li>
                           <li>Save the taxpayer money.</li>
                        </ul>
                     </div>
                  </div>
                  </div>
               </div>
            </section>
            <section id="why-us" className="wow fadeIn">
               <div className="container">
                  <div className="row">
                     <div className="col-sm-12">
                        <header className="section-header">
                           <h3>CourtLink Features</h3>
                           <p></p>
                        </header>
                     </div>
                  </div>
                  <div className="row row-eq-height justify-content-center">
                     <div className="col-lg-4 mb-4">
                        <div className="card wow bounceInUp">
                           <i className="fa fa-diamond"></i>
                           <div className="card-body">
                              <h5 className="card-title">Active Referrals</h5>
                              <p className="card-text">See the list of active clients in Alternatives programs referred from your court. Includes a
                                 count by program and a list of clients with current program status and scheduled completion
                                 date.
                     </p>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-4 mb-4">
                        <div className="card wow bounceInUp">
                           <i className="fa fa-language"></i>
                           <div className="card-body">
                              <h5 className="card-title">Shared Documents</h5>
                              <p className="card-text">Documents shared with you from Alternatives staff.</p>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-4 mb-4">
                        <div className="card wow bounceInUp">
                           <i className="fa fa-object-group"></i>
                           <div className="card-body">
                              <h5 className="card-title">Equipment Inventory (coming soon...)</h5>
                              <p className="card-text">See the number of units immediately available for assignment. </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section id="resources" className="wow fadeIn">
               <div className="container">
                  <div className="row">
                     <div className="col-sm-12">
                        <div className="section-header">
                           <h3>Other Resources</h3>
                           <p></p>
                        </div>
                        <div className="resourceListing">
                           <ul>
                              <li><a href="http://www.altcourtlink.net/Home/Download/1010" target="_blank"><i class="fa fa-file-text-o" aria-hidden="true"></i>Beta Alternatives Program Overview</a></li>
                              <li><a href="http://www.altinc.net" target="_blank"><i class="fa fa-file-text-o" aria-hidden="true"></i>Alternatives, Inc. Public Website</a></li>
                              <li><a href="https://www.scramsystems.com/products/scram-gps/" target="_blank"><i class="fa fa-file-text-o" aria-hidden="true"></i>About Active GPS</a></li>
                              <li><a href="http://www.pharmchem.com/default.asp" target="_blank"><i class="fa fa-file-text-o" aria-hidden="true"></i>About PharmChem Drug Patch</a></li>
                              <li><a href="http://www.scramsystems.com/index/scram/continuous-alcohol-monitoring" target="_blank"><i class="fa fa-file-text-o" aria-hidden="true"></i>About SCRAM</a></li>
                              <li><a href="http://www.scramsystems.com/index/scram/scram-remote-breath" target="_blank"><i class="fa fa-file-text-o" aria-hidden="true"></i>About Remote Breathalyzers</a></li>
                              <li><a href="https://youtu.be/KYHRvhE_hqE" target="_blank"><i class="fa fa-file-video-o" aria-hidden="true"></i>Video: How SCRAM Works</a></li>
                              <li><a href="https://youtu.be/4uWESjwTF24" target="_blank"><i class="fa fa-file-video-o" aria-hidden="true"></i>Video: SCRAM Compliance, Accountability, and Assessment</a></li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section id="contact" className="wow fadeIn">
               <div className="container">
                  <div className="row"> <div className="col-sm-12">
                     <div className="section-header">
                        <h3>Contact Us</h3>
                        <p>Alternatives offers the services available on CourtLink to authorized administrators only. If you need support with
                           something on CourtLink or would like to request access to CourtLink, please contact us at the phone number or email
                           address below.
               </p>
                     </div></div>
                     <div className="col-sm-12">
                        <div className="support">
                           <div class="row">
                              <div class="col-sm-4">
                                 <div class="info">
                                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    <p>Alternatives, Inc
                                       17 North 31st Street
                                       Billings, MT 59101
                           </p>
                                 </div>
                              </div>
                              <div class="col-sm-4">
                                 <div class="info">
                                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                    <p><a href="mailto:courtlink@altinc.net">courtlink@altinc.net</a></p>
                                 </div>
                              </div>
                              <div class="col-sm-4">
                                 <div class="info">
                                    <i class="fa fa-phone" aria-hidden="true"></i>
                                    <p>+1(406) 256-3501</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section id="map">
               <ContactUsMap />
            </section>
         </Fragment>
      );
   }
}
const mapStateToProps = state => {
   return {
      auth: state.auth
   }
}
const mapDispatchToProps = dispatch => {
   return {
      actions: {
         loginSuccess: bindActionCreators(
            actions.loginSuccess,
            dispatch
         )
      }
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home); 