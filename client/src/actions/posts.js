import { FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, LIKE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';              //import everything from the actions as api

//Action Creators - functions that return actions
export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: { post: data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
};

export const getPosts = (page) => async (dispatch) => {                                         //* a function that returns another function so that we can use the async await capabilities
    //by doing async (dispatch), we get access to dispatch
    try {
        dispatch({ type: START_LOADING });
        //fetch all the data from the api
        const { data: {data, currentPage, numberOfPages} } = await api.fetchPosts(page);         // {data} here is actly const response = await.... { } is for object destructuring
        //go to api and make some use of fetching specific pages
        console.log(data);
        
        dispatch({ type: FETCH_ALL, payload: {data, currentPage, numberOfPages} });              //dispatch (action) --> action consists of type and payload
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data : {data} } = await api.fetchPostsBySearch(searchQuery);             //now we create the API called fetchPostsBySearch in api/index.js
        //we have to deconstruct data twice here - 1st time bc we're making an axios request & 2nd time bc we put in a new object where it  has the data property
        dispatch({ type: FETCH_BY_SEARCH, payload: {data} });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);             
    }
}
// this action gets dispatched -> client/src/App.js - useEffect line 16,17
export const createPost = (post, history) => async (dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        //retrieve data
        const { data } = await api.createPost(post);                    //destructure the data from the response; making a post api request to our backend server
        history.push(`/posts/${data._id}`);
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

        dispatch({ type: LIKE, payload: data })

    }catch(error){
        console.log(error.message);
    }
};