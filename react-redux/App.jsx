import React, { Component } from 'react';

import { history } from './helpers';

import AppLayout from './shared/layouts/AppLayout';

class App extends Component {
  componentDidMount() {
    history.listen((location, action) => {
      this.setState({ showMenu: false });
      window.scrollTo(0, 0);
  });
  }


  render() {
    return (
      <AppLayout />
    );
  }
}



export default App;
