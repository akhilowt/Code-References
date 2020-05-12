import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "../../helpers/history";
import PrivateRoute from '../components/functional/PrivateRoute';


import * as actions from '../../store/actions';

import AppHeader from './headers/AppHeader';
import AppFooter from './footers/AppFooter';

import appRoutes from '../../routes/app';
import { bindActionCreators } from 'redux';
import { apiService } from '../../services';

class AppLayout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        history.listen((location, action) => {
            this.setState({ showMenu: false });
            window.scrollTo(0, 0);
        });
    }

    handleLogout = (e) => {
        apiService.logout();
        this.props.actions.logout();
    }

    render() {
        const { auth } = this.props;

        return (
            <Fragment>
                <Router history={history}  >
                <AppHeader auth={auth} onLogout={this.handleLogout}/>
                <main id="main">
                    <Switch>
                        {
                            appRoutes.map((prop, key) => {
                                if (prop.redirect)
                                    return <Redirect from={prop.path} to={prop.to} key={key} />;

                                return (
                                    prop.auth ?
                                        <PrivateRoute {...prop} key={key} />
                                        : <Route {...prop} key={key} />
                                );
                            })
                        }
                    </Switch>
                </main>
                <AppFooter />
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
      auth: state.auth
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      actions: {
          logout: bindActionCreators(
              actions.logout,
              dispatch
          )
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);