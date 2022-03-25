import React, { useState } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Pagination from '../Pagination';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);   //set to null if no id selected
  const query = useQuery();
  const page = query.get(`page`) || 1;                //this is gg to read url and see if there's page parameter in there || or page 1
  const classes = useStyles();                        // call useStyles as a hook

  return(
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>

            <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>

          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
};

export default Home;
