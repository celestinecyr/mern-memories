import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';              //js library that deals with time
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);   //get data from post || callback function w the state, and finally we wanna call the state.posts reducer
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();       //we want to destructure the id 

  //create the data for getting a single post (logic for only fetching a single post based on the id)
  useEffect(() => {           //useEffect is rendered whenever id of the post changes
    dispatch(getPost(id));
  }, [id]);

  // useEffect(() => {
  //   if(post) {      //if post exists
  //     dispatch(getPostsBySearch({ search: 'none', tags: post.post?.tags.join(',') }));
  //   }
  // }, [posts]);

  if(!post) return null;

  if(isLoading) {
    return (
      <Paper className={classes.loadingPaper} elevation={6} >
        <CircularProgress size="7em" />
      </Paper>
    );
  };

  // const recommendedPosts = posts?.filter(({ _id }) => _id !== post?.post?._id);
  // console.log(recommendedPosts);  
  console.log('number of posts: ' + posts.length);       //empty array

  //const openPost = (_id) => history.push(`/posts/${_id}`);

    return (
      // <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}><div> {post.post.title} </div></Paper>
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
           
            <Typography variant="h3" component="h2">{post?.post?.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.post?.tags.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{post?.post?.message}</Typography>
            <Typography variant="h6">Created by: {post?.post?.name}</Typography>
            <Typography variant="body1">{moment(post?.post?.createdAt).fromNow()}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
          </div>
     
          <div className={classes.imageSection}>
            <img className={classes.media} src={post?.post?.selectedFile} alt={post?.title} />
          </div>
 
        </div>

        {/* Recommended Posts  */}
        {/* {recommendedPosts.length} */}

      </Paper>
    )

}

export default PostDetails;