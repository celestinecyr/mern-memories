import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  //we only want to do col-reverse if its mobile phone. and material ui has something called breakpoints (media queries)
  [theme.breakpoints.down('sm')]: {       //run css after this only for devices that are sm
    mainContainer: {
      flexDirection: 'column-reverse'
    }
  },
  root: {       
    '& .MuiContainer-maxWidthLg' : {
         maxwidth: '100%'
    }
  },
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    },
  heading: {
    color: 'rgba(0,183,255, 1)',      //color: "red"
  },
  image: {
    marginLeft: '15px',
  }
}));