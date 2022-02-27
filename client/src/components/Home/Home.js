import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';

import Form from '../Form/Form';
import Posts from '../Posts/Posts';

const Home = () => {

  const [currentId, setCurrentId] = useState(null);   //set to null if no id selected
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())                  //use dispatch to dispatch an action
    }, [currentId, dispatch]);

  return(
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
        </Grid>
      </Container>
    </Grow>
  )
};

export default Home;
