import React,{useEffect} from 'react'
import {Pagination,PaginationItem} from '@material-ui/lab';
import styles from './styles';
import {Link} from 'react-router-dom';
import { getPosts } from '../actions/postss';
import { useDispatch,useSelector } from 'react-redux';
const PAgination = ({page}) => {
  const {numberOfPages} = useSelector((state)=>state.posts)
    const classes = styles();
     const dispatch = useDispatch();
    useEffect(()=>{
       if(page){
        dispatch(getPosts(page));
       }
    },[page])

  return (
    <Pagination classes={{ul:classes.ul}}
     count={numberOfPages}
     page={Number(page)||1}
     variant="outlined"
     color='primary'
     renderItem={(item)=><PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>}
    />
  )
}
export default PAgination
