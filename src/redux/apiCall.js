import { publicRequest } from "../requestMethods";
import {fetchingStart, fetchingSuccess, fetchingFailure} from './userRedux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const login = async (dispatch, user)=> {
    dispatch(fetchingStart);
    try {
        const res = await publicRequest.post('/auth/login', user)
        dispatch(fetchingSuccess(res.data))
        cookies.set('accessToken', res.data.accessToken)
        
    } catch (error) {
        dispatch(fetchingFailure(error.response.data.error));
    }
}


export { login }