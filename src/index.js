import React, { Fragment } from 'react';
import { render } from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import GlobalStyle from './theme/GlobalStyle';

render(
  <Fragment>
    <GlobalStyle />
    <App />
  </Fragment>,
  document.getElementById('root')
);
registerServiceWorker();
