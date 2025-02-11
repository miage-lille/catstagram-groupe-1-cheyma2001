import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Counter from './counter';
import Pictures from './pictures';
import Modal from './modal';

const App = () => (
  <Provider store={store}>
    <>
      <Counter />
      <Pictures />
      <Modal />
    </>
  </Provider>
);

export default App;
