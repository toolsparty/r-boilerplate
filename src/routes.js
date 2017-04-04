import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Import the containers used as pages
import {
  App,
  StartPage,
  NotFoundPage
} from './containers';

export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={StartPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
