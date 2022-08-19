import React,{useEffect, useState} from 'react'
import { Avatar, Button,Paper,Typography,Grid,Container} from '@material-ui/core'
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './input';
import Icon from './icon';
import {useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import {signin,signup} from '../../actions/auth';
const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}
const Auth = () => {

  const [formdata,setFormData] = useState(initialState);
  const history = useNavigate();
  const dispatch = useDispatch();
    const [showPassword,setShowPassword] = useState(false);
    const [isSignup,setisSignup] = useState(false);
    const classes = useStyles();
    const handleShowPassword = ()=>setShowPassword((prevShowPassword)=>!prevShowPassword)
    const handleChange = (e)=>{
      setFormData({...formdata,[e.target.name]:e.target.value});
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log(formdata);
      if(isSignup){
        dispatch(signup(formdata,history))
      }else{
        dispatch(signin(formdata,history));
      }
    }
    const switchMode = ()=>{
      setisSignup((prev)=>!prev);
      setShowPassword(false);
    }
      // const handleCallback=(response)=>{
      //   console.log(response.credential);
      //     var userObject = jwt_decode(response.credential);
      //     try {
      //       dispatch({type:'AUTH',data:userObject});
      //       history('/');
      //     } catch (error) {
      //       console.log(error);
      //     }
          
      // }
      // useEffect(()=>{
      //   /* global google*/
      //   google.accounts.id.initialize({
      //     client_id:"104174150437-ql413980pcu1u2b3jfl5bjoe3duv5ea7.apps.googleusercontent.com",
      //     callback:handleCallback
      //   })
      //   google.accounts.id.renderButton(
      //     document.getElementById("signInGoogle"),
      //     {theme:"outlined",size:"large"}
      //   )
      // },[])
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
        </Avatar>
        <Typography variant="h5">{isSignup?'Sign up':'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup&&(
                <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
            {isSignup&& <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{isSignup?"sign up":"sign in"}</Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
            {/* <Button id="signInGoogle" fullWidth>
            <Icon/>
            <span> Login with Google</span> 
            </Button>    */}
              <Button onClick={switchMode}>
                {isSignup?"Already have an account Sign In":"Dont have an account Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
