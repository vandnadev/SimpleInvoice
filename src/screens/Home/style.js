import {StyleSheet} from "react-native";
import { COLORS } from "../../constant/Color";

export const styles = StyleSheet.create({
  safecontainer :{flex: 1, backgroundColor: COLORS.WHITE[100]},
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor:COLORS.WHITE[100],
    justifyContent:"flex-start"
  },
  titlecontainer:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconImage:{width: 15, height: 15},
  seatchView:{
    height: 40,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#f4f5f7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  hedingtext: {
    marginTop:10,
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  headerview:{
    flexDirection:"row",
 width:"100%",
    justifyContent:"space-between",
    marginTop:10,
    alignItems:"center",

  },
  filterView:{
    position: 'absolute',
    zIndex: 1,
    padding: 5,
    backgroundColor: 'lightgray',
    top: 10,
    right: 35,
  },
  filteritem:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxview:{
    width: 10,
    height: 10,
    borderWidth: 0.25,
  },
  cardContainer:{
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#c3daeb',
    padding: 10,
    marginTop: 15,
  },
  cardtitleview:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titletext:{fontSize: 18, fontWeight: '600'},
});
