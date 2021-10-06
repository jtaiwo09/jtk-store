
import axios from 'axios';

const BASEURL = 'http://localhost:3000/api';
const Token = '';

export const publicRequest = axios.create({
    baseUrl: BASEURL,
})

export const userRequest = axios.create({
    baseUrl: BASEURL,
    headers: { token: 'Bearer '+Token }
});