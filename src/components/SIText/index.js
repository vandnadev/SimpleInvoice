import React from "react";
import {View , Text} from "react-native";

import SIextStyle from "./style";

const SIText = ({label, labelStyle, viewStyle, children}) => {
  return (
    <View style={[SIextStyle.viewContainer, viewStyle]}>
      <Text style={[SIextStyle.labelText, labelStyle]}>
        {label}
        {children}
      </Text>
    </View>
  );
};

export default SIText;
