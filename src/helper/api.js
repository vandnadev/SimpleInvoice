// import axios from "axios"
// import { store } from "./store"
// const api = axios.create({
//     baseURL: 'https://sandbox.101digital.io/',
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Cookie": "JSESSIONID=97AA37A6222FCA3F8EFD3445873AB003"
//     },
//   })
//   api.interceptors.request.use(
//     config => {
//       const token = store.getState().user.token
// console.log("TTTTT",token);
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`
//       }
//       return config
//     },
//     error => Promise.reject(error)
//   )
//   export default api

export const INVOICEAPI = () =>{
    BASE_URL = "https://sandbox.101digital.io/",
    TOKEN = "/token"
}