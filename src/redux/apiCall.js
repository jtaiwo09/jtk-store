import { publicRequest } from "../requestMethods";
import {fetchingStart, fetchingSuccess, fetchingFailure} from './userRedux';

const login = async (dispatch, user)=> {
    dispatch(fetchingStart);
    try {
        const res = await publicRequest.post('/auth/login', user)
        dispatch(fetchingSuccess(res.data))
        
    } catch (error) {
        dispatch(fetchingFailure(error.response.data.error));
    }
}

export { login }