import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/Color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: COLORS.WHITE[100],
    justifyContent: 'flex-start',
  },
  titletext: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  labletext: {
    fontSize: 20,
    fontWeight:"600",
    marginTop:20
  },
  keytext:{
    fontSize: 16,
    fontWeight:"500",
  },
});
