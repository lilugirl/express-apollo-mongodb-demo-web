import React from 'react'
import { useQuery,gql } from '@apollo/client';
import Note from '../components/Note'

// note查询，接受一个ID变量
const GET_NOTE=gql`
  query note($id:ID!){
      note(id:$id){
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
`;

const NotePage=(props)=>{
    const id=props.match.params.id;

    // 查询钩子 传入 ID的值
    const {loading,error,data}=useQuery(GET_NOTE,{variables:{id}});
    if(loading) return <p>Loading....</p>;
    if(error) return <p>Error! Note not found</p>;

    return <Note note={data.note} />

}

export default NotePage;