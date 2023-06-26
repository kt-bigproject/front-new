import { useState } from 'react';
import { useAxios } from "/src/components/Axios/axios";

export default function CommentForm({ blog, setComments, isReply, commentId}) {

  const api = useAxios()
  const [comment, setComment] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('blog', blog.id);
    formData.append('comment', comment);
    if (isReply) {
      formData.append('parent', commentId);
    }

    const response = await api.post('/font/comment/', formData)

    const data = await response.data;
    console.log(data)
    if ( response.status == 201 ) {
      console.log(data)
    } else {
      console.log(response.status)
    }
    setComments(prevData => [...prevData, data]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={comment}
        onChange={(e)=>{ setComment(e.target.value) }}
      />
      <button type='submit'>댓글쓰기</button>
    </form>
  );
}