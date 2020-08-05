import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import ShmidtDecomp from './pages/ShmidtDecomp';
import Index from './pages/Index';

import Header from './components/Header';
import Footer from './components/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//const sections = [
//  { title: 'Technology', url: '#' },
//  { title: 'Design', url: '#' },
//];

const sections = [];

export default function Blog() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <Switch>
          <Route path="/shmidt-decomposition">
            <ShmidtDecomp />
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </Container>
      <Footer title="matthewriabinin.github.io" description="Something here to give the footer a purpose!" />
    </Router>
  );
}
