import React from 'react'
import Button from '../components/Button'
import ReactMarkdown from 'react-markdown';
import{useQuery,gql} from '@apollo/client'
import NoteFeed from '../components/NoteFeed';

// 把GraphQL查询存储为一个变量
const GET_NOTES=gql`
  query NoteFeed($cursor:String){
      noteFeed(cursor:$cursor){
          cursor
          hasNextPage
          notes{
              id
              createdAt
              content
              favoriteCount
              author{
                  username
                  id
                  avatar
              }
          }
      }
  }
`


const Home=()=>{
   // 查询钩子
   const {data,loading,error,fetchMore}=useQuery(GET_NOTES);

   // 显示一个消息，指明正在加载数据
   if(loading) return <p>Loading...</p>
   // 如果获取数据出错，显示一个错误消息
   if(error) return <p>Error!</p>;

   // 成功获取数据后，在UI中显示出来
   return <NoteFeed notes={data.noteFeed.notes} />
}

export default Home