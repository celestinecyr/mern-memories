import React, {useEffect} from 'react';
import { Pagination, PaginationItem} from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();

    //Fetch the post any time the page changes
    useEffect(() => {
        //if there is a page..
        if(page) dispatch(getPosts(page));          //but not fetch all the post, jst fetch those on that specific page --> refer to actions
    },[page]);                                      //run it every time the page changes

    return(
        <Pagination
            classes={{ul: classes.ul}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )

}

export default Paginate;