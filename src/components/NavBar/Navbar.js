import React, { useState,useEffect } from 'react'
import { AppBar,Avatar,Button,Toolbar,Typography } from '@material-ui/core'
import useStyles from './styles';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { useNavigate,useLocation } from 'react-router-dom';
const Navbar = () => {
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch(); 
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const classes = useStyles();

    const Logout = ()=>{
      console.log("s")
     dispatch({type:'LOGOUT'})
     history('/');
     setUser(null);
    }

    useEffect(()=>{
      console.log(JSON.parse(localStorage.getItem('profile')))
      if(JSON.parse(localStorage.getItem('profile'))){
        setUser(JSON.parse(localStorage.getItem('profile')).result);
      }
      const token=user?.token;
      if(token){
        const decodedToken = decode(token);
        if(decodedToken.exp*1000<new Date().getTime()){
          Logout();
        }
      }
    },[location]); 
    
  return (
      <AppBar position='static' color='inherit' className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography variant='h2' align='center' className={classes.heading}>
         Memories
        </Typography>
        <img src="https://st2.depositphotos.com/6279034/9346/v/380/depositphotos_93462318-stock-illustration-camera-photography-vector.jpg?forcejpeg=true" alt='memories' height="200" className={classes.image}/>
        </div>
        <Toolbar className={classes.toolbar}>
         {user?(
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.name} src = {user.pricure}>{user.name?.charAt[0]}</Avatar>
                <Typography className={classes.userName} variant="h6" >{user.name}</Typography>
                <Button variant='contained' className={classes.logout} 
                onClick={Logout}
                color="secondary">Logout</Button>
              </div>
         ):(
              <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
         )}
        </Toolbar>
      </AppBar>
  )
}

export default Navbar
