import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
    switch (action.type) {
        case DELETE:
            return posts.filter((post) => post._id !== action.payload );            //filter out the one that we deleted (return all the post, but filter out the one that we deleted)
            //if post._id is not equal to action.payload, we remove it // keep all except the one where _id = action.payload
        case UPDATE:
        //case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
            //action.payload is the updated post
            //if post._id is equal to action.payload._id then we return action.payload else return post w/o updates
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];           //send over an array of posts --> spread all the post, new posts which is stored in action.payload
        default:
            return posts;
    }
};

//state always has to be equal to something hence we set an empty array first.

//By default, all types of anonymous default exports are forbidden, 
//but any types can be selectively allowed by toggling them on in the options