import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './post/post';
import useStyles from './style';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const isLoading = useSelector((state)=>state.isLoading);
  const classes = useStyles();
  console.log(posts.posts)
  if(!posts.posts?.length && !isLoading) return <CircularProgress/>;
  
  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={5}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;