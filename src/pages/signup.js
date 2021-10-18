import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import {useMutation,gql} from '@apollo/client';

import Button from '../components/Button';
const SIGNUP_USER=gql`
  mutation signUp($email:String!,$username:String!,$password:String!){
      signUp(email:$email,username:$username,password:$password)
  }
`;

const Wrapper=styled.div`
  border:1px solid #f5f4f0;
  max-width:500px;
  padding:1em;
  margin:0 auto;
`

const Form=styled.form`
  label,
  input{
      display:block;
      line-height:2em;
  }

  input{
      width:100%;
      margin-bottom:1em;
  }
`

const SignUp =props=>{
    // 更新文档标题
    useEffect(()=>{
         document.title= 'Sign up -- Notedly'
    },[])

    // 设置表单默认状态
    const [values,setValues]=useState();

    // 当用户在表单中输入内容时更新状态
    const onChange=event=>{
        setValues({
            ...values,
            [event.target.name]:event.target.value
        })
    }

    // 添加变更操作钩子
    const [signUp]=useMutation(SIGNUP_USER,{
        onCompleted:data=>{
            // 变更操作执行完毕把JSON Web Token输出到控制台中
            console.log(data.signUp)
        }
    })

    return (<Wrapper>
        <h2>Sign Up</h2>
       <Form onSubmit={event=>{
           event.preventDefault();
           console.log(values)
           signUp({
               variables:{
                   ...values
               }
           })
       }}>
           <label htmlFor="username">Username:</label>
           <input required type="text" id="username" name="username" placeholder="username" onChange={onChange} />
           <label htmlFor="email">Email</label>
           <input id="email" name="email" placeholder="email" onChange={onChange} />
           <label htmlFor="password">Password:</label>
           <input required type="password" id="password" name="password" placeholder="Password" onChange={onChange} />
           <Button type="submit">Submit</Button>
       </Form>
    </Wrapper>)
}
export default SignUp;