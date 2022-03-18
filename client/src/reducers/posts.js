import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, LIKE, DELETE } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };

        case FETCH_ALL:
            return {
                ...state,                       // spread state first when working w obj    || we have useSelector in src/components/Posts/Posts.js
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };

        case FETCH_POST:
            return { ...state, post: action.payload };

        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };           //send over an array of posts --> spread all the post, new posts which is stored in action.payload
        
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
            //action.payload is the updated post
            //if post._id is equal to action.payload._id then we return action.payload else return post w/o updates
        
        case DELETE:
            return { 
                ...state, 
                posts: state.posts.filter(
                    (post) => post._id !== action.payload 
                ) 
            };            //filter out the one that we deleted (return all the post, but filter out the one that we deleted)
            //if post._id is not equal to action.payload, we remove it // keep all except the one where _id = action.payload
        
        default:
            return state;
    }
};

//state always has to be equal to something hence we set an empty array first.

//By default, all types of anonymous default exports are forbidden, 
//but any types can be selectively allowed by toggling them on in the options


// TypeError: State not iterable
//https://stackoverflow.com/questions/63546752/typeerror-state-is-not-iterable-on-react-and-redux