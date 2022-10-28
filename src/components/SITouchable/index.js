import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import StyleSiTouchable from './style';

const SITouchable = ({children, viewStyle, handlepress, props}) => {
  return (
    <TouchableOpacity
      style={[StyleSiTouchable.viewContainer, viewStyle]}
      onPress={handlepress}>
      {children}
    </TouchableOpacity>
  );
};

export default SITouchable;
