import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';

import Home from '../screens/Home/index';
import Invoice from '../screens/Invoice';
import {getListdata, settoken} from '../redux/action';

const Stack = createNativeStackNavigator();
const RouteNavigation = () => {
  const dispatch = useDispatch();

  const token = useSelector(state => state?.invoices?.token);

  useEffect(() => {
    settoken(dispatch);
    getListdata({dispatch , token});
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'Invoice'} component={Invoice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigation;
