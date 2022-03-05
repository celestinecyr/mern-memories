import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ( {currentId, setCurrentId} ) => {
    const [postData, setPostData] = useState({title:'', message:'', tags:'', selectedFile:''})  // properties that the object is going to start with
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);          //if currentId not null, then we loop over state.post and call
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));       //to obtain the current user's name

    //after useSelector to obtain data of particular post, we now use useEffect to populate the values of the form
    useEffect(() => {                   //useEffect has 2 argu, 1st accepts callback function, 2nd accepts dependency array
        if(post) setPostData(post);
    }, [post]);                             

    const clear = () => {
        setCurrentId(0);                                                             //setting currentId to null - reset --> as soon as we change the current id, in the app is gg to dispatch the getpost action (App.js line 18)
        setPostData({title:'', message:'', tags:'', selectedFile:''});                  //save everything as empty string
    };

    const handleSubmit = async (e) => {
        e.preventDefault();                             //not to get refresh in the browser
        
        if(currentId === 0) {                           //if id is not null, we wont create another post, we will update
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else{
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));         //dispatch an action
            clear();             
        }
    }; 

    if (!user?.result?.name) {                  //if you're not loggedin
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>         
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? 'Editing' : 'Creating' } a memory </Typography>
                {/* Since we have login function, we no longer need a "creater" anymore 
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/> */}
                {/* how are we going to change the state field using onChange? It's harder since in here we have an object that's in a state and we want to update just one of the object's properties - hence we use this syntax 
                setPostData() is the setter method for that state
                take note of ...postData here - it means when we have other posts coming up. everything is persistent and the only thing changing is the property of that specific textfield, creator. */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" label="Tags (Splitting by coma)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>            
                
                {/* splitting tags by comma, into an array so that we can filter posts by tags */}

                <div className={classes.fileInput}> <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}/></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )

}

export default Form;