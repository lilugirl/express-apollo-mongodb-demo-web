import React from 'react'
import styled from 'styled-components'
import logo from '../img/logo.svg';
import { useQuery,gql } from '@apollo/client';
import { Link,withRouter } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;


const UserState=styled.div`
margin-left:auto;
`

const HeaderBar=styled.header`
 width:100%;
 padding:0.5em 1em;
 display:flex;
 height:64px;
 position:fixed;
 align-items:center;
 background-color:#fff;
 box-shadow: 0 0 5px 0 rgba(0,0,0,0.25);
 z-index:1;
`
const LogoText=styled.h1`
   margin:0;
   padding:0;
   display:inline;
`

const Header=(props)=>{
    // 查询钩子，查看用户的登录状态
  let {data,client}=useQuery(IS_LOGGED_IN)
  
    return (
        <HeaderBar>
            <img src={logo} alt="Notedly Logo" height="40" />
            <LogoText>Notedly</LogoText>
            <UserState>
                {data?.isLoggedIn? (<ButtonAsLink onClick={()=>{
                    // 删除令牌
                    localStorage.removeItem('token');
                    // 清空应用的缓存
                    client.resetStore();
                    // 更新本地状态
                    client.writeData({data:{isLoggedIn:false}});
                    // 把用户重定向到首页
                    props.history.push('/')

                }}>Log Out</ButtonAsLink>):(<p>
                    <Link to={'/signin'} >Sign In</Link>
                    <Link to={'/signup'}>Sign Up</Link>
                </p>)}
            </UserState>
      </HeaderBar>
    )
}
export default withRouter(Header);