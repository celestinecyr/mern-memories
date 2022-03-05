import React, {useState, useEffect} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import memories from '../../images/memories.png';

const Navbar = () => {
    const classes = useStyles();
    //const user = null;
    //how do we retrieve something from the local storage? - JSON.parse....
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //console.log(user);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
      dispatch({ type: 'LOGOUT' });
      history.push('/');
      //if somebody logout, user is null
      setUser(null);
    }

    //without useEffect, we had to google sign in and refresh before we see our profile icon, etc (basically signed in). so now we use useEffect
    //we want to use useEffect when /auth changes to / 
    useEffect(()=> {                  //callback function, [dependency array]
      const token = user?.token       //does token exist? if yes send it to 'token' variable
      //if using manual sign up... can check JWT

      if(token) {                                               //if token exist,
        const decodedToken = decode(token);                     //decode token

        if(decodedToken.exp * 1000 < new Date().getTime()) logout();     //if decodedToken.exp * 1000 (in milliseconds) is lower than current time in milliseconds --> logout
      }
      
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);   
                        

    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer} >
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
          <img className={classes.image} src={memories} alt="memories" height="60" />
        </div>

        <Toolbar className={classes.toolbar}>               
          {/* In here we're gonna have some logic to show if user logged in then..show logout btn else if not..? */}
          {user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar>
              <Typography className={classes.userName} variant="h6"> {user.result.name} </Typography>
              <Button className={classes.logout} variant="contained" color="secondary" onClick={(logout)}>Logout</Button>
            </div>
            ) : (
              
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )
            /* Here ^ , we direct to /auth and its going to redirect us to the page of authentication */
          }
        </Toolbar>
      </AppBar>
    )
};

export default Navbar;
