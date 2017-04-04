import './NotFoundPage.styl';

import React, {Component, PropTypes} from 'react';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="error-page">
        <h1>404 Not Found</h1>
        <p>Page not found</p>
      </div>
    );
  }
}