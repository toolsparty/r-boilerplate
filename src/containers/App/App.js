// Import stuff
import './App.styl';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions';
import {
  Header,
  Footer
} from '../../components';

class App extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div className="app">
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

// REDUX STUFF
// Which props do we want to inject, given the global state?
const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);
