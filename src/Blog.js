import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import NewPost from './pages/NewPost';
import Index from './pages/Index';

import Header from './components/Header';
import Footer from './components/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

export default function Blog() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <Switch>
          <Route path="/new-post">
            <NewPost />
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </Router>
  );
}
