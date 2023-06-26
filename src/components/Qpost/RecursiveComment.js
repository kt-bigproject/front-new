'use client'

import { useEffect, useState } from "react";
import CommentDelete from '/src/components/Qpost/CommentDelete';
import { useAxios } from "/src/components/Axios/axios";

const ReplyInput = ({ handleReplySubmit, replyState }) => {
  const [replyText, setReplyText] = replyState;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleReplySubmit(replyText);
    setReplyText('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setReplyText(e.target.value)} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

const CommentItem = ({ comment, handleReplyClick, handleReplySubmit, delState, inputState, commentId, replyState}) => {
  // const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplyInput, setShowReplyInput] = inputState;
  const [del, setDel] = delState;
  const [replyText, setReplyText] = replyState;

  return (
    <div key={comment.id}>
      <span>{comment.user} {comment.comment} {comment.created_at}</span>
      <span onClick={() => handleReplyClick(comment.id)}>답글쓰기</span>
      <CommentDelete id={comment.id} state={[del, setDel]} />

      {comment.replies.length > 0 && (
        <div>
          {comment.replies.slice().reverse().map((reply) => (
            <CommentItem
              inputState={[showReplyInput, setShowReplyInput] }
              delState={[del, setDel]}
              key={reply.id}
              comment={reply}
              handleReplyClick={handleReplyClick}
              handleReplySubmit={handleReplySubmit}
              commentId={commentId}
              replyState={[replyText, setReplyText]}
            />
          ))}
        </div>
      )}

      {showReplyInput && commentId === comment.id && (
        <ReplyInput commentId={comment.id} handleReplySubmit={handleReplySubmit} replyState={[replyText, setReplyText]} />
      )}
    </div>
  );
};

export default function Comment({blog}) {

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

  const handleReplySubmit = async () => {

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
    return false;
  };

  return(       
    <div>
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setComment(e.target.value)} />
      <button type="submit">댓글쓰기</button>
    </form>
    {data.length > 0 ? (
      data.slice().reverse().map((comment) => (
        <CommentItem
          inputState={[showReplyInput, setShowReplyInput] }
          delState={[del, setDel]}
          key={comment.id}
          comment={comment}
          handleReplyClick={handleReplyClick}
          handleReplySubmit={handleReplySubmit}
          commentId={commentId}
          replyState={[replyText, setReplyText]}
        />
      ))
    ) : (
      '댓글없음 --> 로딩중 UI'
    )}
  </div>
);
}