import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';                          //* useSelector to help fetch data from the global redux store (55:10)

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);       
    //how do we know its state.posts? (reducers/index.js line 5) --> here we're fetching all the posts
    //previously we have [] array of post, now we have object with property of posts inside it { posts: [] } 
    const classes = useStyles();

    // console.log(posts.data.length)
    if(!posts.length && !isLoading) return "No Posts";                  //if no post in array, and not loading,

    //if not post.length, then show CircularProgress (loading spinner) :else (create grid of our posts)
    return (
        isLoading ? ( <CircularProgress /> ) : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {/* curly braces here to indicate that we're using javascript logic */}
                {posts.map((post) => (                            
                    <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                        {/* we can send the individual value of a post to each post component - line 22 is indiv post */}
                    </Grid>
                ))} 
            </Grid>
        )
    );
}

export default Posts;