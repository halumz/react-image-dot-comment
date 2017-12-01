import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Gallary from './containers/gallary';
import SelectedImage from './containers/selectedImage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Gallary />
          <SelectedImage />
        </div>
      </Provider>
    );
  }
}

export default App;
