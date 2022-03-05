import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

//Import actions
import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {                //destructuring the props - {props}
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {                                    //a sub component Post --> Likes
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))                              //does the like contain id of the person
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                {/* this shows ^ e.g. 5 seconds ago */}
            </div>

            {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
            <div className={classes.overlay2}>
                {/* here we have the ... button where we can choose to edit/update post & we have to KEEP TRACK OF CURRENT ID */}
                <Button style={{color: 'white'}} size="small" onClick ={() => setCurrentId(post._id) }> 
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            )}

            <div className={classes.details}>
                {/* loop the hashtags and for each tag we want to do sth - each string starts with # */}
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>

            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>

                <Button size="small" color="primary" disabled={!user?.result} onClick ={() => dispatch(likePost(post._id))}>                
                    {/* if there is no user?.result, then the like button is disabled */}
                    <Likes />
                </Button>
                
                {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
                    <Button size="small" color="primary" onClick ={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}


            </CardActions>

        </Card>
    )
}

export default Post;