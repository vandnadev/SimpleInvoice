import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView, TextInput, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Image} from 'react-native';
import {findIndex} from 'lodash';
import SIText from '../../components/SIText';
import {COLORS} from '../../constant/Color';
import {IMAGES} from '../../constant/Image';

import {STRING} from '../../constant/String';
import {styles} from './style';
import SITouchable from '../../components/SITouchable';
import SIImage from '../../components/SIImage';

const Home = () => {
  const navigation = useNavigation();
  const [Filter, setFilter] = useState([]);
  const [Filterdata, setFilterdata] = useState([]);
  const [openfilter, setOpenFilter] = useState(false);
  const [oprationdata, setOprationdata] = useState([]);

  //Invoice data list get from redux
  const invoicelist = useSelector(state => state?.invoices?.invoicelist);

  useEffect(() => {
    setOprationdata(invoicelist); // set redux data into state variable
  }, [invoicelist]);

  // Add filter property of type from invoice list data
  for (i = 0; i < invoicelist.length; i++) {
    const status = invoicelist[i]?.status[0]?.key;

    const index = findIndex(Filter, function (o) {
      return o == status;
    });

    if (index == -1) {
      setFilter([...Filter, status]);
    }
  }

  // Search functionality by search bar
  const search = text => {
    if (text) {
      const newdata = invoicelist.filter(function (item) {
        const itemData = item.invoiceNumber
          ? item.invoiceNumber.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setOprationdata(newdata);
    } else {
      setOprationdata(invoicelist);
    }
  };

  // Search functionality by filter search
  const searchbystatus = Filetenew => {
    const length = Filetenew.length;

    console.log('%%%%%%', length);
    let newarr = [];
    for (i = 0; i < length; i++) {
      const text = Filetenew[i];
      if (text) {
        const newdata = invoicelist.filter(function (item) {
          const status = item.status[0].key;

          const itemData = status ? status.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();

          if (itemData.indexOf(textData) > -1) {
            newarr = [...newarr, item];
          }
        });
      }
    }

    if (length === 0) {
      setOprationdata(invoicelist);
    } else {
      setOprationdata(newarr);
    }
  };

  // Filter functionality
  const applyfilter = item => {
    const index = findIndex(Filterdata, function (o) {
      return o == item;
    });

    if (index == -1) {
      setFilterdata([...Filterdata, item]);

      const newfilterarr = Filterdata.push(item);

      searchbystatus(Filterdata);
    } else {
      const arr = Filterdata;
      const newarr = Filterdata.splice(index, 1);

      setFilterdata(Filterdata);
      searchbystatus(Filterdata);
    }
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <SIText label={STRING.Home.INVOICE} labelStyle={styles.hedingtext} />

          <SITouchable
            handlepress={() => {
              navigation.navigate('Invoice');
            }}
            viewStyle={{marginRight: 25}}>
            <SIImage src={IMAGES.PLUS} imageStyle={styles.iconImage} />
          </SITouchable>
        </View>
        <View style={styles.headerview}>
          <View style={styles.seatchView}>
            <SIImage src={IMAGES.SEARCH} imageStyle={styles.iconImage} />
            <TextInput
              placeholder="Search for invoice"
              style={{marginLeft: 5}}
              onChangeText={text => search(text)}
            />
          </View>
          {openfilter && (
            <View style={styles.filterView}>
              {Filter.map((item, i) => {
                const index = findIndex(Filterdata, function (o) {
                  return o == item;
                });

                return (
                  <View style={styles.filteritem}>
                    <SIText label={item} labelStyle={{marginRight: 5}} />
                    <SITouchable
                      viewStyle={styles.checkboxview}
                      handlepress={() => applyfilter(item)}>
                      {index > -1 && (
                        <SIImage
                          src={IMAGES.RIGHT}
                          imageStyle={{width: 15, height: 12, top: -2}}
                        />
                      )}
                    </SITouchable>
                  </View>
                );
              })}
            </View>
          )}
          <SITouchable handlepress={() => setOpenFilter(!openfilter)}>
            <SIImage src={IMAGES.FILTER} imageStyle={styles.iconImage} />
          </SITouchable>
        </View>
        <View style={{marginTop: 15, flex: 1, zIndex: -1}}>
          <FlatList
            data={oprationdata}
            renderItem={({item}) => {
              const totaltax = item.totalTax;
              const totalamount = item.totalAmount;
              const balanceamount = item.balanceAmount;
              const totalpaid = item.totalPaid;
              const totalinvoice = item.invoiceSubTotal;

              return (
                <View style={styles.cardContainer}>
                  <View style={styles.cardtitleview}>
                    <SIText label={item.type} labelStyle={styles.titletext} />
                    <SIText label={item.invoiceNumber} labelStyle={{fontSize: 18}} />
      
                  </View>
                  <Text style={{fontSize: 15, color: '#1b0f30'}}>
                    TotalTax :{' '}
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#4f347d',
                      }}>
                      {totaltax.toFixed(5)}
                    </Text>
                  </Text>
                  <Text style={{fontSize: 15, color: '#1b0f30', marginTop: 2}}>
                    TotalAmount :{' '}
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#4f347d',
                      }}>
                      {totalamount.toFixed(5)}
                    </Text>{' '}
                  </Text>
                  <Text style={{fontSize: 15, color: '#1b0f30', marginTop: 2}}>
                    balanceAmount :{' '}
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#4f347d',
                      }}>
                      {balanceamount.toFixed(5)}
                    </Text>
                  </Text>
                  <Text style={{fontSize: 15, color: '#1b0f30', marginTop: 2}}>
                    totalPaid :
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#4f347d',
                      }}>
                      {totalpaid.toFixed(5)}
                    </Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{fontSize: 15, color: '#1b0f30', marginTop: 2}}>
                      invoiceSubTotal :{' '}
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: '#4f347d',
                        }}>
                        {totalinvoice.toFixed(5)}
                      </Text>
                    </Text>
                    <Text>{item.status[0].key}</Text>
                  </View>
                  <Text>{item.description}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
