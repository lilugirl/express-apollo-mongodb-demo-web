import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Layout from '../components/Layout';
import Home from './home';
import MyNotes from './mynote';
import Favorites from './favorites';
import SignUp from './signup';

const Pages=()=>{
    return (
        <Router>
            <Layout>
            <Route exact path="/" component={Home}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/mynotes" component={MyNotes}></Route>
            <Route path="/favorites" component={Favorites}></Route>
            </Layout>
        </Router>
    )
}
export default Pages;
