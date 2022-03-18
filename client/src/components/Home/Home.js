import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import ChipInput from 'material-ui-chip-input';

import Pagination from '../Pagination';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);   //set to null if no id selected
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get(`page`) || 1;                //this is gg to read url and see if there's page parameter in there || or page 1
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();                        // call useStyles as a hook
  
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);               //empty array, not string becos we wanna have multiple tags

  // WE STOP FETCHING POST FROM HERE --> pass our page straight  to pagination as a prop --> pagination.jsx !!
  // useEffect(() => {
  //   dispatch(getPosts())                              //use dispatch to dispatch an action - create an action for searching the post
  //   }, [currentId, dispatch]);

  const searchPost = () => {
    if(search.trim() || tags) {                                 //to check if we have anyth in search field/term & we trim it to make sure there's no empty spaces
      //dispatch logic to fetch search posts
      console.log(tags)
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));        //this action takes in the searchQuery object --> inside that searchQuery we provide search which is cmg from state & also provide tags which we will render into a string bc we cant pass an array thru the url parameters
      history.push(`/posts/search?searchQuery=${ search || "none"}&tags=${tags.join(",")}`);
    } else {                                                              //if no search term
      history.push('/');                                                  //redirect back
    }
  };

  const handleKeyPress = (e) => {
    if(e.keyCode  === 13) {               //keyCode = 13 ; Enter key
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));       //keep everything except the tagToDelete

  return(
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyPress={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
 
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              {/* Add a button to search post: */}
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>

            <Form currentId={currentId} setCurrentId={setCurrentId} />

            {/* if we dont currently have a search query && tags then we render pagination - Assumption here is that if u r searching fr sth in partcular, its not so many that we need pages */}
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}        

          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
};

export default Home;
