
import axios from 'axios';

const BASEURL = 'https://jtk-store-api.herokuapp.com/api';
const Token = '';

export const publicRequest = axios.create({
    baseUrl: BASEURL,
})

export const userRequest = axios.create({
    baseUrl: BASEURL,
    headers: { token: 'Bearer '+Token }
});