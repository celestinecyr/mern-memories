import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';              //import everything from the actions as api

//Action Creators - functions that return actions
export const getPosts = () => async (dispatch) => {                           //* a function that returns another function so that we can use the async await capabilities
    //by doing async (dispatch), we get access to dispatch
    try {
        //fetch all the data from the api
        const { data } = await api.fetchPosts();                            // {data} here is actly const response = await.... { } is for object destructuring

        dispatch( {                                                         //dispatch (action) --> action consists of type and payload
            type: FETCH_ALL,
            payload: data
        });

    } catch (error) {
        console.log(error);
    }
};
// this action gets dispatched -> client/src/App.js - useEffect line 16,17
export const createPost = (post) => async (dispatch) => {
    try{
        //retrieve data
        const { data } = await api.createPost(post);                    //destructure the data from the response; making a post api request to our backend server
        //dispatch an action; the type of action is CREATE
        dispatch({ type: CREATE, payload: data });
    } catch(error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try{
        //here we make api req to update the post --> returns updated memory/post: await api.updatePost(id, post
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data })
    } catch(error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try{
        //since we dont need to get any data we just await api call and pass in id
        await api.deletePost(id);       //here we dont have to type const response infront cuz we dont need the return data
        dispatch({ type: DELETE, payload: id })

    } catch(error) {
        console.log(error.message);
    }
};

export const likePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE, payload: data })

    }catch(error){
        console.log(error.message);
    }
};