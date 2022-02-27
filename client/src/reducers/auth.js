import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer= (state = { authData: null}, action)=> {
    switch(action.type) {
        case AUTH:
            //console.log(action?.data);
            //we want to save token in local storage so that when we refresh the page the browser is still going to know that we're logged in
            localStorage.setItem('profile', JSON.stringify( {...action?.data} ));           //setting all of data available, all the data for the login-->to local storage
            return { ...state , authData: action?.data};

        case LOGOUT:
            localStorage.clear();
            return { ...state , authData: null };
            
        default:
            return state;
    }
};

export default authReducer;