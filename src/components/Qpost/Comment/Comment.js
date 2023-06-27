import CommentForm from './CommentForm';
import CommentDelete from './CommentDelete';
import { useState } from "react";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
// import moment from 'moment';
import styles from './comment.module.css';

export default function Comment({ blog, comment, level = 0, deleteComment, setDeleteComment, setComments, fetchComments }) {
  
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplyClick = () => {    
    setShowReplyInput(!showReplyInput);
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentBoxWrapper}>
      { level > 0 && (
        <SubdirectoryArrowRightIcon sx={{ color: "#FA6400", paddingRight: '5px' }}/>
      )}

      <div className={styles.commentBox}>
        <div style={{display: 'inline-block'}}>
          <p className={styles.userName}>{comment.user}</p>
          <p className={styles.commentFrame}>{comment.comment}</p>
          <span className={styles.commentDate}>{moment(new Date(comment.created_at).toISOString()).format('YYYY-MM-DD HH:mm')}</span>
          <span className={styles.replyText} onClick={handleReplyClick}>답글쓰기</span>   
        </div>  

        <div className={styles.commentIcon}>   
            <CommentDelete id={comment.id} state={[deleteComment, setDeleteComment]}/>
        </div>

        {showReplyInput && (
          <CommentForm blog={blog} setComments={setComments} isReply={true} commentId={comment.id} setShowReplyInput={setShowReplyInput} fetchComments={fetchComments}/>
        )}

        <hr style={{marginBottom: '10px', border: 'none', height: '1px', backgroundColor: 'black'}}/>
        {comment.replies && comment.replies.map((reply) => (          
            <Comment 
              blog={blog}
              key={reply.id} 
              comment={reply} 
              level={level + 1} 
              deleteComment={deleteComment}
              setDeleteComment={setDeleteComment}
              setComments={setComments}
              fetchComments={fetchComments}
            />
        ))}
      </div>
      </div>
    </div>
  );
}