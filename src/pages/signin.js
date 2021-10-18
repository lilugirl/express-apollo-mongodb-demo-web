import React,{useEffect} from 'react'
import { useMutation,useApolloClient,gql } from '@apollo/client'
import UserForm from '../components/UserForm'
import { printIntrospectionSchema } from 'graphql'

const SIGNIN_USER=gql`
  mutation signIn($email:String,$password:String!){
      signIn(email:$email,password:$password)
  }
`

const SignIn=props=>{
    useEffect(()=>{
       document.title='Sign In -- Notedly'
    },[]);
    const client=useApolloClient();
    const [signIn,{loading,error}]=useMutation(SIGNIN_USER,{
        onCompleted:data=>{
            // 存储令牌
            localStorage.setItem('token',data.signIn);
            // 更新本地缓存
            client.writeData({data:{isLoggedIn:true}});
            // 把用户重定向到首页
            props.history.push('/');
        }
    })
    return (<React.Fragment>
        <UserForm action={signIn} formType="signIn" />
        {loading && <p>Loading...</p>}
        {error && <p>Error signing in !</p>}
    </React.Fragment>)
}

export default SignIn;