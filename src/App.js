import React, { Component } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import PropTypes from 'prop-types';

export default class App extends Component {

  componentWillMount() {
      console.log("heelo com App");
      console.log(this.context);
  }

  render() {
    return (
      <div id="root">
        <div className="main">
          <Header />
          <Timeline />
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  store : PropTypes.object.isRequired
}
