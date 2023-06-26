import CommentForm from './CommentForm';
import CommentDelete from '/src/components/Qpost/CommentDelete';

export default function Comment({ comment, level = 0, onSubmitReply, deleteComment, setDeleteComment }) {
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplyClick = () => {    
    setShowReplyInput(!showReplyInput);
  };


  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <span>{comment.user} {comment.comment} {comment.created_at}</span>
      <span onClick={handleReplyClick}>답글쓰기</span>
      <CommentDelete id={comment.id} state={[deleteComment, setDeleteComment]}/>
      
      {showReplyInput && (
        <CommentForm onSubmit={(replyText) => onSubmitReply(replyText, comment.id)} />
      )}

      {comment.replies.map((reply) => (
        <Comment 
          key={reply.id} 
          comment={reply} 
          level={level + 1} 
          onSubmitReply={onSubmitReply} 
          deleteComment={deleteComment}
          setDeleteComment={setDeleteComment}
        />
      ))}
    </div>
  );
}