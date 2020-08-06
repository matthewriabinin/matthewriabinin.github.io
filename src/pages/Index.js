import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import MainFeaturedPost from '../components/MainFeaturedPost';
import FeaturedPost from '../components/FeaturedPost';
import Markdown from '../components/Markdown';
import Sidebar from '../components/Sidebar';

import post1 from '../posts/shmidt-decomp/shmidt-decomp.md';
import post2 from '../posts/wigner/wigner.md';
import post3 from '../posts/grad-opt/grad-opt.md';
import post4 from '../posts/new/new.md';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));


const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [

    {
    title: 'Shmidt decomposition algorithm. Implementation with examples.',
    date: 'Sept 1',
    description:
      'Decomposition of the function into some basis gives a clear view on its properties. Common examples are\n' +
        'Fourier series decomposition or Wavelet transform. Here we will explore less known Shmidt decomposition that finds application in quantum physics.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'shmidt-decomposition'
  },


  {
    title: 'Gradient descent optimization with TensorFlow 2',
    date: 'Sept 1',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'grad-optimization'
  },

//      {
//    title: 'Wigner',
//    date: 'Sept 1',
//    description:
//      'This is a wider card with supporting text below as a natural lead-in to additional content.',
//    image: 'https://source.unsplash.com/random',
//    imageText: 'Image Text',
//    link: 'new-post'
//  },

];

const postsPaths = [post1, post2, post3, post4];

const sidebar = {
  title: 'About',
  description:
    'Introduction here...',
  archives: [
    { title: 'March 2020', url: '#' },
//    { title: 'February 2020', url: '#' },
//    { title: 'January 2020', url: '#' },
//    { title: 'November 1999', url: '#' },
//    { title: 'October 1999', url: '#' },
//    { title: 'September 1999', url: '#' },
//    { title: 'August 1999', url: '#' },
//    { title: 'July 1999', url: '#' },
//    { title: 'June 1999', url: '#' },
//    { title: 'May 1999', url: '#' },
//    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'LinkedIn', icon: LinkedInIcon },
//    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Index() {
  const classes = useStyles();
  const [posts, setPosts] = useState([])
  useEffect(() => {
    async function fetchData() {
      const data = await Promise.all(postsPaths.map(pastPath => fetch(pastPath).then((response) => response.text())))
      setPosts(data);
    }
    fetchData();
  }, []);

  return (
    <main>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
      <Grid container spacing={5} className={classes.mainGrid}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            From the firehose
          </Typography>
          <Divider />
          {posts.map((post) => (
            <Markdown className={classes.markdown} key={post.substring(0, 40)}>
              {post}
            </Markdown>
          ))}
        </Grid>
        <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          archives={sidebar.archives}
          social={sidebar.social}
        />
      </Grid>
    </main>
  );
}
