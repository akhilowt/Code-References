import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import { NavLink } from "react-router-dom";

import logoImage from '../../../assets/images/logo.png';

const AppHeader = ({ auth, onLogout }) => {
    return (
        <Fragment>
            <button type="button" className="mobile-nav-toggle d-lg-none"><i className="fa fa-bars"></i></button>
            <header id="header" className="fixed-top">
                <div className="container">
                    <div className="logo float-left">
                        <h1><NavLink className="nav-link" to={`/`}><img src={logoImage}/></NavLink></h1>
                    </div>

                    <nav className="main-nav float-right d-none d-lg-block">
                        <ul>
                            <li>
                                <NavLink className="nav-link" to={`/`}>
                                    Home
                                </NavLink>
                            </li>
                            {
                                auth.loggedIn &&
                                    (
                                        <li className="drop-down"><a href="">Admin</a>
                                            <ul>
                                            <li><a href="#">Documents</a></li>
                                            <li><a href="#">User Setup</a></li>
                                            {/* <li className="drop-down"><a href="#">Drop Down 2</a>
                                                <ul>
                                                <li><a href="#">Deep Drop Down 1</a></li>
                                                <li><a href="#">Deep Drop Down 2</a></li>
                                                <li><a href="#">Deep Drop Down 3</a></li>
                                                <li><a href="#">Deep Drop Down 4</a></li>
                                                <li><a href="#">Deep Drop Down 5</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Drop Down 3</a></li>
                                            <li><a href="#">Drop Down 4</a></li>
                                            <li><a href="#">Drop Down 5</a></li> */}
                                            </ul>
                                        </li>
                                    )
                            }
                                <li><a href="#contact">Contact Us</a></li>
                            {
                                auth.loggedIn && (
                                    <Fragment>
                                        <li>
                                            {auth.UserName}
                                        </li>

                                        <li>
                                            <a href="Javascript:void(0)" onClick={onLogout}>Log Out</a>
                                        </li>
                                    </Fragment>
                                    )
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </Fragment>
    );
}

export default AppHeader;