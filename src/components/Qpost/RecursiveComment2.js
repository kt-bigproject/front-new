'use client'

import { useEffect, useState } from "react";
import CommentDelete from '/src/components/Qpost/CommentDelete';
import { useAxios } from "/src/components/Axios/axios";

export default function Comment({ reply, blog, level = 0 }) {

  const [comment, setComment] = useState('')
  // let [commentList, setCommentList] = useState([])
  const [data, setData] = useState([])
  const [del, setDel] = useState(false)
  const api = useAxios()
  // const authContextValue = useContext(AuthContext); 
  // console.log(authContextValue)
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [commentId, setCommentId] = useState('');

  const handleReplyClick = (commentId) => {
    setCommentId(commentId);
    setShowReplyInput(!showReplyInput);
  };

  console.log(blog.id)

  useEffect(()=>{
    api.get(`/font/comment/?blog=${blog.id}`)
      .then(response => {
        setData(response.data)
    })
  }, [setData, del] );

  const handleSubmit = async e => {
    e.preventDefault();

    console.log(comment);
    console.log(blog.id);

    const formData = new FormData();
    formData.append('blog', blog.id);
    formData.append('comment', comment);

    const response = await api.post('/font/comment/', formData)
    // const response = await fetch('http://127.0.0.1:8000/blog/comment/', {
    //   method : 'POST', 
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body : JSON.stringify({          
    //     comment: comment,
    //     blog: blog.id,            
    //     user: blog.user,
    //   })
    // })
    const data = await response.data;
    console.log(data)
    if ( response.status == 201 ) {
      console.log(data)
    } else {
      console.log(response.status)
    }
    setData(prevData => [...prevData, data]);
  };
      // .then((res) => console.log(res.status) )

  const submitReply = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('blog', blog.id);
    formData.append('comment', replyText);
    formData.append('parent', commentId);

    const response = await api.post('/font/comment/', formData)
    const data = await response.data;
    console.log(data)
    if ( response.status == 201 ) {
      console.log(data)
    } else {
      console.log(response.status)
    }
    setData(prevData => [...prevData, data]);

    setCommentId('');
    setReplyText('');
    setShowReplyInput(false);
  };

  return (        
      <div>
        <form onSubmit={handleSubmit}>
          <input onChange={(e)=>{ setComment(e.target.value) }}/>
          <button type='summit'>댓글쓰기</button>
        </form>
        {
          data.length > 0 ?
          data.slice().reverse().map((comment) => (
            <div key={comment.id}>
              <span>{comment.user} {comment.comment} {comment.created_at}</span>
              <span onClick={() => handleReplyClick(comment.id)}>답글쓰기</span>
              <CommentDelete id={comment.id} state={[del, setDel]}/>

              {/* {comment.replies.length > 0 && (
                <div>
                  {comment.replies.map((reply) => (
                    <Comment key={reply.id} comment={reply} />
                  ))}
                </div>
              )} */}

              {showReplyInput && commentId === comment.id &&(
                <div>
                  <form onSubmit={submitReply}>
                    <input onChange={(e)=>{ setReplyText(e.target.value) }}/>
                    <button type='submit'>전송</button>
                  </form>
                </div>
              )}
            </div>
          ))
          : '댓글없음 --> 로딩중 ui'
        }
      </div>
  );
}