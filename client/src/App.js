import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  return(
    <BrowserRouter>
      <Container maxWidth={false}>
        <Navbar/>
        <Switch>
          {/* Now that we've pagination in place we replace this: <Route path="/" exact component={Home} /> with the following 3 lines:*/}
          <Route path="/" exact component={ () => <Redirect to="/posts"/> } />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />

          {/* <Route path="/auth" exact component={Auth} />       --> this isnt very accurate, if user logged in, they can still view signin form at this url so we have to check whether user is logged in:*/}
          <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/posts"/> )} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
