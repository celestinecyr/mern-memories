import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

//Import actions
import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {                //destructuring the props - {props}
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
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

    const openPost = (e) => {
        history.push(`/posts/${post._id}`);              //push to id of post that is currently selected --> in App.js we see that /posts/:id brings to PostDetails page --> continue in PostDetails and redux actions
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} src='image' image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                    {/* this shows ^ e.g. 5 seconds ago */}
                </div>

                {/* here we have the ... button where we can choose to edit/update post & we have to KEEP TRACK OF CURRENT ID */}
                {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
                    <div className={classes.overlay2} name="edit">
                        <Button style={{color: 'white'}} size="small" 
                            onClick ={(e) => {
                                e.stopPropagation();
                                setCurrentId(post._id);
                            }}> 
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )} 

                <div className={classes.details}>
                    {/* loop the hashtags and for each tag we want to do sth - each string starts with # */}
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>

                <Typography className={classes.title} variant="h5" gutterBottom component="h2">{post.title}</Typography>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick ={() => dispatch(likePost(post._id))}>                
                    {/* if there is no user?.result, then the like button is disabled */}
                    <Likes />
                </Button>

                {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
                    <Button size="small" color="primary" onClick ={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" /> &nbsp; Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;