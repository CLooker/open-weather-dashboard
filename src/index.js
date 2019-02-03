import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import GlobalStyle from './theme/GlobalStyle';

render(
  <Provider store={store}>
    <Fragment>
      <GlobalStyle />
      <App />
    </Fragment>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
