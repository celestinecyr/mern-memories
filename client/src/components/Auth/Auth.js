import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const Auth = () => {
  const classes = useStyles();
  const [showPassword,setShowPassword] = useState(false);      //set false at the start
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword);
  // arrow function | handleShowPassword toggles the state of the password. 
  // So, we need a prev state here. whenever you're changing the state using old state, you need to have a callback function (prevShowPassword)
  // and then if the prevShowPassword is something, we want to say false of that prev. - i.e. !prevShowPassword
  // essentially just goggling it - off/on

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false)
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;               // optional chaining operator --> ?. -->
    const token = res?.tokenId;

    try{
      dispatch({ type: 'AUTH', data:{ result, token } });
      //after dispatching have to redirect back to the home:
      history.push('/');

    } catch(error) {
      console.log(error);
    }

  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google sign in was unsuccessful. Try again later.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3} >
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* we only need first and last name if signing up, if alr signed in then dont need that */}
            { isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            
            {/* Next we want to have password confirmation: if is sign up, then  have an input field for confirmation */}
            {isSignup && (<Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />) }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>

          <GoogleLogin 
            clientId="279828255680-n08s3vaa41brrmbr64i617a8ht443fn4.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                Google Sign In
              </Button>
            )}  //render - how are we going to show our button, what is it gg to look like? | Callback function
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                {/* if we're on the sign up, isSignup is true. then - alr have acc? Sign in */}
              </Button>
            </Grid>
          </Grid>

        </form>
      </Paper>
      {/* <div color="black">
        AUTH
      </div> */}
    </Container>
    
  );
};

export default Auth;
