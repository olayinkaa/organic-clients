import React from 'react';
import './App.css';
import DashBoard from './views/DashBoard'
import 'toasted-notes/src/styles.css';
// import store from './store'
// import {Provider} from 'react-redux'

function App() {
  return (
      // <Provider store={store}>
      <div className='member'>
            <DashBoard />
        </div>
      // </Provider>
  );
}

export default App;
