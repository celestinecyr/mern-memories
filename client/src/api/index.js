import axios from 'axios';

//specify the url
const url = "http://localhost:4000/posts";
//const url = "https://memories-mern-project.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);                //call back function where (newPost) is taking in the entire post --> then axios and url, and the data we r sending
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);