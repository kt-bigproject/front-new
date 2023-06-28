
import CommentDelete from './CommentDelete';
import styles from './comment.module.css';
import DateFormat from '/src/components/Qpost/DateFormat'

export default function CommentList({data, del, setDel}) {
  return (
    <>
      {
        data.length > 0 ?
        data.map((comment) => (
          <div key={comment.id}>
            <span className={styles.user_text}>{comment.user}</span> 
            <span className={styles.comment_text}>{comment.comment}</span>
            <span className={styles.created_at_text}>{DateFormat(comment.created_at)}</span>
            <CommentDelete id={comment.id} state={[del, setDel]}/>
          </div>
        ))
        : '댓글을 남겨주세요!'
      }
    </>
  )
}