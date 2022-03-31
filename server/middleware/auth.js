import jwt from 'jsonwebtoken';

const secret = 'test';

const auth = async (req, res, next) => {
    try {
        //after user is signed up or signed in he gets token (from controllers/user.js line 23)
        //to get token from frontend, we do
        const token = req.headers.authorization.split(" ")[1];              //token is on the first position of array after we split it
        
        //2 types of token - 1 from google OAuth, 1 from our own
        const isCustomAuth = token.length < 500;                            //<500 is our own; >500 is google Auth
    
        let decodedData;                    //data from token itself

        if(token && isCustomAuth) {                      //if token is our own,
            decodedData = jwt.verify(token, secret);
            //now that we have the decodedData, we know which user is logged in, liking the post.. etc
            req.userId = decodedData?.id;
      
        } else {                                    //if working with google auth token,
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;          //sub = google's name for a specific id that we can differentiate uses with
        }    
        
        next();             
        //now, we pass on the action to the next middleware function - e.g. after logging in the user wants to like a post 
        //user clicks like button => auth middleware (next) => like controller
        //where do we use that auth middleware? --> routes
    } catch (error) {
        console.log(error);
    }
};
export default auth;