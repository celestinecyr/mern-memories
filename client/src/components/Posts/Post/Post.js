import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
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

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                {/* this shows ^ e.g. 5 seconds ago */}
            </div>

            <div className={classes.overlay2}>
            {/* here we have the ... button where we can choose to edit/update post & we have to KEEP TRACK OF CURRENT ID */}
                <Button style={{color: 'white'}} size="small" onClick ={() => setCurrentId(post._id) }> 
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>

            <div className={classes.details}>
                {/* loop the hashtags and for each tag we want to do sth - each string starts with # */}
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>

            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>

                <Button size="small" color="primary" onClick ={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>

                <Button size="small" color="primary" onClick ={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>

            </CardActions>

        </Card>
    )
}

export default Post;