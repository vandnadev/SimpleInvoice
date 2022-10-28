import React from "react";
import { View, Image } from "react-native";
import StyleSIImage from "./style";

const SIImage = ({ src, imageStyle, viewStyle }) => {
  return (
    <View style={[StyleSIImage.viewContainer, viewStyle]}>
      <Image source={src} style={[StyleSIImage.imageContainer, imageStyle]} />
    </View>
  );
};

export default SIImage;
