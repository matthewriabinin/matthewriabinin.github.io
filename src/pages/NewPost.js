import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Markdown from '../components/Markdown';
import postPath from '../posts/grad-opt/grad-opt.md';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Index() {
  const classes = useStyles();
  const [post, setPost] = useState('')

  useEffect(() => {
    async function fetchPost() {
      const data = await fetch(postPath).then((response) => response.text())
      setPost(data);
    }
    fetchPost();
  }, []);

  return (
    <main>
      <Grid container spacing={4}>
        <Grid item>
          <Markdown className={classes.markdown} key={post.substring(0, 40)}>
            {post}
          </Markdown>
        </Grid>
      </Grid>
    </main>
  );
}
