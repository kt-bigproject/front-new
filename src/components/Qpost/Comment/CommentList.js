'use client'

import { useEffect, useState } from "react";
import { useAxios } from "/src/components/Axios/axios";
import CommentDelete from './CommentDelete';
import CommentForm from "./CommentForm";
import Comment from './Comment';

export default function CommentList({blog, setNumComments}) {

  const [comments, setComments] = useState([])
  const [deleteComment, setDeleteComment] = useState(false)
  const api = useAxios()

  const fetchComments = async () => {
    const response = await api.get(`/font/comment/?blog=${blog.id}`)
    setComments(response.data)
  }

  useEffect(() => {
    fetchComments()
  }, [deleteComment, blog.id])

  const countComments = (comments) => {
    let count = comments.length;
    comments.forEach(comment => {
      if (comment.replies) {
        count += countComments(comment.replies);
      }
    });
    return count;
  };

  useEffect(() => {
    setNumComments(countComments(comments));    
  }, [comments]);  
  
  // useEffect(()=>{
  //   api.get(`/font/comment/?blog=${blog.id}`)
  //     .then(response => {
  //       setComments(response.data)
  //   })
  // }, [comments, deleteComment] );

  return (        
      <div>
        <CommentForm blog={blog} setComments={setComments} isReply={false} fetchComments={fetchComments}/>

        {
          comments.length > 0 ?
          // comments.slice().reverse().map((reply) => (
          comments.map((reply) => (
            <Comment 
              blog={blog}
              key={reply.id} 
              comment={reply} 
              // onSubmitReply={onSubmitReply} 
              deleteComment={deleteComment}
              setDeleteComment={setDeleteComment}
              setComments={setComments}
              fetchComments={fetchComments}
          />
          ))
          : null
        }
      </div>
  );
}