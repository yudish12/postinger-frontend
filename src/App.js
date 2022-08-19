import React,{useState} from 'react'
import {Container} from '@material-ui/core';
// import useStyles from './styles';
import Home from './components/home/Home';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import PostDetails from './components/postDetails/PostDetails';
import Navbar from './components/NavBar/Navbar';
import Auth from './components/auth/Auth';

const NavFunc = ()=><Navigate to="/posts"/>
const AuthFunc = ()=>{
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  return !user?<Auth/>:<NavFunc/>
}
const App = () => {
  

  return (
    <BrowserRouter>
      <Container maxWidth='xl' >
      <Navbar/>
      <Routes>
        <Route path="/" element={<NavFunc/>} /> 
        <Route path='/posts' element={<Home/>}/>
        <Route path='/posts/search' element={<Home/>}/>
        <Route path='/posts/:id' element={<PostDetails/>}/>
        <Route path="/auth" element={<AuthFunc/>}></Route>
      </Routes>
    </Container>
    </BrowserRouter>
    
  )
}

export default App
