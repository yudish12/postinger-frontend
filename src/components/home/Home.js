import React,{useState,useEffect} from 'react'
import { getPosts,getPostsBySearch } from '../../actions/postss';
import { useDispatch } from 'react-redux';
import {Container,Grow,Grid, Paper,AppBar,TextField,Button} from '@material-ui/core';
import { useNavigate,useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import styles from './styles';
import Posts from '../posts/posts';
import Form from '../form/form';
import Pagination from '../pagination';


function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [search,setSearch] = useState('');
    const [tags,setTags] = useState([]);
    const classes = styles();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const history = useNavigate();
    const query = useQuery();
    const page = query.get('page')||1;
    const searchQuery = query.get('searchQuery');
    // useEffect(() => {
    //   dispatch(getPosts());
    // }, [currentId, dispatch]);

    const searchPost = ()=>{
      if(search.trim()||tags){
        dispatch(getPostsBySearch({search,tags:tags.join(',')}));
      }else{
        history('/');
      }
    }

  const handleKeypress = (e)=>{
    if(e.keyCode===13){
      searchPost();
    }
  }
  const handleAdd = (tag)=>setTags([...tags,tag]);
  const handleDelte = (tagToDelte)=>setTags(tags.filter((tag)=>tag!==tagToDelte));
  return (
    <Grow in>
          <Container maxWidth="xl">
            <Grid container justify="space-between" alignItems='stretch' spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name='search'
                variant='outlined'
                label='search memories'
                fullWidth
                value={search}
                onChange = {(e)=>setSearch(e.target.value)}
                onKeyPress={handleKeypress}
              />
              <ChipInput
                style={{margin:'10px 0'}}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelte}
                label="search tags"
                variant='outlined'
              />
              <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'
              >Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
             
            {(!searchQuery && !tags.length) &&(
              <Paper className={classes.pagination}elevation={6}>
              <Pagination page={page} className={classes.pagination}/>
              </Paper>
            )}
            </Grid>
            </Grid>
          </Container>
      </Grow>
  )
}

export default Home
