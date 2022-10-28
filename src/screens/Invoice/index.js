import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {TextInput} from 'react-native';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {findIndex} from 'lodash';
import SIText from '../../components/SIText';
import {styles} from './style';

const Invoice = () => {
  const [user, setUser] = useState();
  const [customefields, setCustomefields] = useState([]);
  const [accountname, setAccountname] = useState('');
  const [accountnumber, setAccountnumber] = useState('');
  const [currency, setCurrency] = useState('');
  const [desc, setDesc] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer 29ba14a6-424a-3014-805e-59b7520082b7',
    );
    myHeaders.append('Cookie', 'JSESSIONID=51F7A1C8183256445900EA90B6236853');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://sandbox.101digital.io/membership-service/1.2.0/users/me',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const newres = result?.data;
        setUser(newres);
      })
      .catch(error => console.log('error', error));
  };
 
  var today = new Date();

  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();


  const usercustomFields = user?.listCustomFields;


  const submitinvoice = () =>{
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer 026c8481-e4f8-3e6d-8b92-ced37794c850',
    );
    myHeaders.append('Cookie', 'JSESSIONID=7125BBF30596EF992955E35B182D1EB5');

    var raw = JSON.stringify({
      listOfInvoices: [
        {
          bankAccount: {
            bankId: '',
            sortCode: '09-01-01',
            accountNumber: accountnumber,
            accountName: accountname,
          },
          customer: {
            firstName: 'Nguyen',
            lastName: 'Dung 2',
            contact: {
              email: 'nguyendung2@101digital.io',
              mobileNumber: '+6597594971',
            },
            addresses: [
              {
                premise: 'CT11',
                countryCode: 'VN',
                postcode: '1000',
                county: 'hoangmai',
                city: 'hanoi',
              },
            ],
          },
          documents: [
            {
              documentId: '96ea7d60-89ed-4c3b-811c-d2c61f5feab2',
              documentName: 'Bill',
              documentUrl: 'http://url.com/#123',
            },
          ],
          invoiceReference: '#123456',
          invoiceNumber: 'INV123456701',
          currency: currency,
          invoiceDate: '2021-05-27',
          dueDate: '2021-06-04',
          description: desc,
          customFields: customefields,
          extensions: [
            {
              addDeduct: 'ADD',
              value: 10,
              type: 'PERCENTAGE',
              name: 'tax',
            },
            {
              addDeduct: 'DEDUCT',
              type: 'FIXED_VALUE',
              value: 10,
              name: 'discount',
            },
          ],
          items: [
            {
              itemReference: 'itemRef',
              description: 'Honda RC150',
              quantity: 1,
              rate: 1000,
              itemName: 'Honda Motor',
              itemUOM: 'KG',
              customFields: customefields,
              extensions: [
                {
                  addDeduct: 'ADD',
                  value: 10,
                  type: 'FIXED_VALUE',
                  name: 'tax',
                },
                {
                  addDeduct: 'DEDUCT',
                  value: 10,
                  type: 'PERCENTAGE',
                  name: 'tax',
                },
              ],
            },
          ],
        },
      ],
    });


    console.log("************",raw);



    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://sandbox.101digital.io/invoice-service/2.0.0/invoices',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        navigation.navigate("Home")
      })
      .catch(error => console.log('error', error));
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <SIText label={'Create Invoice'} labelStyle={styles.titletext} />
        <View style={{marginTop: 15}}>
          <View>
            <SIText label={'User detail'} labelStyle={styles.labletext} />

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <SIText label={'UserName :'} labelStyle={styles.keytext} />
              <SIText label={user?.firstName} />
              <SIText label={user?.lastName} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginTop: 2,
                alignItems: 'center',
              }}>
              <SIText label={'email : '} labelStyle={styles.keytext} />
              <SIText label={user?.email} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginTop: 2,
                alignItems: 'center',
              }}>
              <SIText label={'mobileNumber :'} labelStyle={styles.keytext} />
              <SIText label={':+6597594971'} />
            </View>

            <SIText label={'Bank account'} labelStyle={styles.labletext} />

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <SIText
                label={'Enter Account name : '}
                labelStyle={styles.keytext}
              />
              <TextInput
                placeholder="Enter Account name "
                style={{borderBottomWidth: 0.25}}
                value={accountname}
                onChangeText={text => setAccountname(text)}
              />
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <SIText label={'Account number : '} labelStyle={styles.keytext} />
              <TextInput
                placeholder="Enter Account number "
                style={{borderBottomWidth: 0.25}}
                value={accountnumber}
                onChangeText={text => setAccountnumber(text)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 2,
                alignItems: 'center',
              }}>
              <SIText
                label={'invoiceReference :'}
                labelStyle={styles.keytext}
              />
              <SIText label={':#123456'} />
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <SIText label={'currency : '} labelStyle={styles.keytext} />
              <TextInput
                placeholder="Enter Currency"
                style={{borderBottomWidth: 0.25}}
                value={currency}
                onChangeText={text => setCurrency(text)}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 2,
                alignItems: 'center',
              }}>
              <SIText label={'InvoiceDate : '} labelStyle={styles.keytext} />
              <SIText label={`${yyyy}-${mm}-${dd}`} />
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <SIText label={'description :'} labelStyle={styles.keytext} />
              <TextInput
                placeholder="Enter description"
                style={{borderBottomWidth: 0.25}}
                value={desc}
                onChangeText={text => setDesc(text)}
              />
            </View>

            <Text style={{marginTop: 5}}>customFields</Text>

            <View style={{width: '50%'}}>
              <View style={{flexDirection: 'row'}}>
                {customefields?.map((item, i) => {
         
                  return (
                    <View style={{marginHorizontal: 5}}>
                      <Text>{item.key},</Text>
                    </View>
                  );
                })}
              </View>

              <ScrollView style={{maxHeight: 75}}>
                <View>
                  {usercustomFields &&
                    usercustomFields.map((item, i) => {
                      const index = findIndex(customefields, function (o) {
                        return o.key == item.customKey;
                      });
                      if (index == -1)
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              const newjson = {
                                key: item.customKey,
                                value: item.customValue,
                              };
                              setCustomefields([...customefields, newjson]);
                            }}>
                            <Text>{item.customKey}</Text>
                          </TouchableOpacity>
                        );
                    })}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => submitinvoice()} >
            <Text>Create invoice</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Invoice;
