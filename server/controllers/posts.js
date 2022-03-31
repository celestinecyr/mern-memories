//here we create all the handlers for our routes
//we dw all the logic inside routes folder, so we leave them in the controller folder
import express from 'express';
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";
const router = express.Router();

export const getPosts = async (req,res) => {
    const { page } = req.query;
    try{
        const LIMIT = 8;                                                //max no. of posts per page
        const startIndex = (Number(page)-1) * LIMIT;                    //starting index of post on every page     
        //#1 convert our page into number using the Number constructor (page no. becomes string when we pass it thru req.query)
        const totalPages = await PostMessage.countDocuments({});        //we need to know how many posts we have - bc depending on that, we're gonna have a specific number of pages

        //retrieve all the posts that we have in the database
        //finding something inside of the model takes time, which means it is an asynchronous action. hence we need to add 'await' and 'async'
        //const posts = await PostMessage.find(); 
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);     //sort from latest to oldest || skip to start index bc u dw to fetch ALL POSTS for page 3.       
        //console.log(posts);
        res.status(200).json({ 
            data: posts, 
            currentPage: Number(page), 
            numberOfPages: Math.ceil(totalPages / LIMIT) 
        });                        //need to return something
    } catch(error) {
        //if there's error
        res.status(404).json({ message: error.message });
    }
}
/*
req.params and req.query is different
QUERY --> the route looks like /post?page=1 --> whereby we have page variable = 1
however in the case of PARAMS --> /post/123 --> id = 123 (params for more specific data)
*/
export const getPostsBySearch = async (req,res) => {
    const { searchQuery, tags } = req.query;        

    try {
        const title = new RegExp(searchQuery, "i");         // i means ignore case --> TEST, Test, and test are all the same || convert into regexp to make it easier for mongodb & mongoose to search the db

        const posts = await PostMessage.find({ 
            $or: [ { title }, { tags: { $in: tags.split(',') } } ]          //$or - find title or tags
        });

        res.json({ data: posts });              //data = posts --> and send back to front end (res)
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req,res) => {
    console.log("inside createpost method");
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);         //201 = successful creation
        console.log("Created Post!")
    } catch (error) {
        console.log("Unable to create post");
        res.status(409).json( { message: error.message });
    }
}

export const updatePost = async(req, res) => {
    //extract the id from req.params so. also, while using object destructuring we can also rename our id to _id
    const { id: _id } = req.params;
    const post = req.body;                              //we're rcving data for updates in req.body

    //check if _id is really a mongoose object id:
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id: ${_id}');

    //else, if is valid then can update post - call model which is PostMessage
    // const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new:true });                  
    //2nd param we need to pass the whole updated post - line 36
    //new - true so that we can actually receive the updated version of that post
    //async action (line 42) so we add const updatedPost = await in front.
    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');      //make sure id is valid

    await PostMessage.findByIdAndRemove(id);           //passing in the id we rcvd from params
    console.log('DELETE!');
    
    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async(req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });             //over here, the req has user id property because we did req.userId = decodedData?.id in our middleware |!req.userId means not authenticated

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);                     //*find the post we are looking for
    //check whether user has already liked the post
    const index = post.likes.findIndex((id) => id === String(req.userId));

    //if user alr like, then it shld be un-like button
    if(index === -1) {                          //only if his id is not included on line 69, then index = -1
        //like the post
        post.likes.push(req.userId);
    } else {
        //un-like the post; removing his id from the likes array
        post.likes = post.likes.filter((id) => id != String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new:true });                  
    //* in the 2nd param we wanna pass in our updates. so thats gg to be an object & in there we increment the like count || 3rd param, new = true 
    //--> since we've added like function within post then now no more increment (part3)

    res.json(updatedPost);
}
export default router;