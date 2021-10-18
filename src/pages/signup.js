import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import {useMutation,gql,useApolloClient} from '@apollo/client';
import UserForm from '../components/UserForm'

const SIGNUP_USER=gql`
  mutation signUp($email:String!,$username:String!,$password:String!){
      signUp(email:$email,username:$username,password:$password)
  }
`;



const SignUp =props=>{
    // 更新文档标题
    useEffect(()=>{
         document.title= 'Sign up -- Notedly'
    },[])


    // Apollo Client
    const client=useApolloClient();

    // 添加变更操作钩子
    const [signUp,{loading,error}]=useMutation(SIGNUP_USER,{
        onCompleted:data=>{
            //把JWT存储到localStorage中
            localStorage.setItem('token',data.signUp)
            // 更新本地缓存
            client.writeData({data:{isLoggedIn:true}})
            // 把用户重定向到首页
            props.history.push('/')

        }
    })

    return (<React.Fragment>
        <UserForm action={signUp} formType="signup" />
        {loading && <p>loading...</p>}
        {error && <p>Error creating an account!</p>}
    </React.Fragment>)
}
export default SignUp;