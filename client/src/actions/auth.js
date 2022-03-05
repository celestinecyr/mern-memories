import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {                           
    //by doing async (dispatch), we get access to dispatch
    try {
        const { data } = await api.signIn(formData);
        //once we have the data, we want to dispatch the action with a type.... & also pass on data to reducer
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, history) => async (dispatch) => {    
    // console.log("signing up")                       
    try {
        console.log(formData);
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error)
        console.log("there is an error");
    }
};
