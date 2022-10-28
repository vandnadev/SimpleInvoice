/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux'
import RouteNavigation from './src/navigation';
import { store } from './src/redux/store';
const App = () =>{
  return (
    <Provider store={store}>
   <RouteNavigation />
   </Provider>
  );
}
export default App;
