import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Fork from './components/fork';
import Gallary from './containers/gallary';
import SelectedImage from './containers/selectedImage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Fork />
          <Gallary />
          <SelectedImage />
        </div>
      </Provider>
    );
  }
}

export default App;
