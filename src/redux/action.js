import {INVOICEAPI} from '../helper/api';
import {invoiceList, tokenset} from './reducer';
import { store } from './store';

export const settoken = dispatch => {

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Cookie', 'JSESSIONID=7E9B5E31548A5E969C73F44A4B697411');

  var urlencoded = new URLSearchParams();

  var details = {
    client_id: 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa',
    client_secret: '0Exp4dwqmpON_ezyhfm0o_Xkowka',
    grant_type: 'password',
    scope: 'openid',
    username: 'dung+octopus4@101digital.io',
    password: 'Abc@123456',
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formBody,
    redirect: 'follow',
  };

  fetch('https://sandbox.101digital.io/token', requestOptions)
    .then(response => response.json())
    .then(result => {
      const token = result?.access_token;
      console.log("%%%%%",token);
      dispatch(tokenset(token));
    })
    .catch(error => console.log('error', error));
};

export const getListdata = ({dispatch , token}) =>{

   // const token = store.getState().invoices.token
    console.log("!!!!!!",token);
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${token}`,
    );
    // myHeaders.append('Cookie', 'JSESSIONID=A7143EDD8610D7BB9F1156FC782443D2');
    myHeaders.append('Cookie', 'JSESSIONID=7125BBF30596EF992955E35B182D1EB5');


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://sandbox.101digital.io/invoice-service/1.0.0/invoices?&dateType=INVOICE_DATE&sortBy=CREATED_DATE&ordering=ASCENDING',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const newres = result?.data;
        dispatch(invoiceList(newres))
      })
      .catch(error => console.log('error2', error , token));
}
