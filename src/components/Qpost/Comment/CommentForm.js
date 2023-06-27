import { useState } from 'react';
import { useAxios } from "/src/components/Axios/axios";
import styles from './comment.module.css';

export default function CommentForm({ blog, setComments, isReply, commentId, setShowReplyInput, fetchComments}) {

  const api = useAxios()
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (comment.replace(/<\/?[^>]+(>|$)/g, '').trim() === "") {
      setErrorMessage('내용을 입력해주세요.'); // 에러 메시지 출력은 굳이 안해도 될 것 같음.
    } else {
      setErrorMessage(false)

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
    fetchComments();
    setComments(prevData => [...prevData, data]);
    setComment('');
    
    if (isReply) {
      setShowReplyInput(false);
    };
  }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.textDiv}>
        <textarea 
          className={styles.textArea} 
          value={comment} 
          placeholder={'댓글을 남겨보세요'} 
          onChange={(e)=>{ setComment(e.target.value) }}>
        </textarea>
        <button className={styles.innerButton} type='submit'>등록</button>
      </div>
    </form>
  );
}