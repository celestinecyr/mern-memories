import axios from 'axios';

//specify the url
//const url = "http://localhost:4000/posts";
//const url = "https://memories-mern-project.herokuapp.com/posts";

// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url, newPost);                //call back function where (newPost) is taking in the entire post --> then axios and url, and the data we r sending
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

//PART 3
const API = axios.create({ baseURL: 'http://localhost:4000' });             //create axios instance, here we don't use /posts bc we wanna route to other page also


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {              //this is where token is stored
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);                //call back function where (newPost) is taking in the entire post --> then axios and url, and the data we r sending
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);