import React from 'react'
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import { useQuery,gql } from '@apollo/client';
import Layout from '../components/Layout';
import Home from './home';
import MyNotes from './mynote';
import Favorites from './favorites';
import SignUp from './signup';
import SignIn from './signin';
import NotePage from './note';


const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;


const PrivateRoute=({component:Component,...rest})=>{
    const {loading,error,data}=useQuery(IS_LOGGED_IN)
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error!</p>
    return (<Route {...rest} render={props=>data?.isLoggedIn===true?(<Component {...props} />):(<Redirect to={{pathname:'/signin',state:{from:props.location}}} />)}>

    </Route>)
}


const Pages=()=>{
    return (
        <Router>
            <Layout>
            <Route exact path="/" component={Home}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <PrivateRoute path="/mynotes" component={MyNotes}></PrivateRoute>
            <PrivateRoute path="/favorites" component={Favorites}></PrivateRoute>
            <Route path="/note/:id" component={NotePage}></Route>
            </Layout>
        </Router>
    )
}
export default Pages;
