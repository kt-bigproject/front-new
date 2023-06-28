import { Modal, Box, TextField, IconButton} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import Image from 'next/image';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { useRouter } from 'next/router';
import Board from '../update/[number]/index';
import { useAxios } from '../../src/components/Axios/axios';
import CommentDeleteblog from '../../src/components/bpost/commentDelete';
// import ScrollView


export default function ImgModal({open, onClose, figureInfo}) {

  console.log(figureInfo)
  const [like, setLike] = useState(true);
  const [counter, setCounter] = useState(0);

  const like_btn = () => {
    setLike(like + 1);
  };
  

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 850,
    hegith: 750,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 1,
    // pt: 2,
    // px: 4,
    // pb: 3,
  };


  const inputStyle ={
    width: 270,
    display: 'flex',
    paddingBottom: '10px',
    marginLeft: '20px',
  }

//   const listBoard = { title, user, body, image, id };
 
  const Router = useRouter();
  const onClick = () => { 
    Router.push(`/update/` + figureInfo.id )
  }

  // const [comments, setComments] = useState([]); // 기존 데이터
  const api = useAxios();
  const [commentText, setCommentText] = useState('');
  const [comment, setComment] = useState([]);

  // 새로 추가한 데이터 ---------------------------------------

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  // const fetchComments = async () => {
  //   try {
  //     const response = await api.get(`/blog/comment/?blog=${figureInfo.id}`);
  //     setComments(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleSaveComment = async () => {
  //   try {
  //     const response = await api.post(`/blog/comment/?blog=${figureInfo.id}`, {
  //       text: commentText,
  //     });
  //     setComments([response.data]);
  //     setCommentText('');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // 아래는 댓글기능 구현 (시도)코드입니다.

  // const [data, setData] = useState([])
  // const [del, setDel] = useState(false)
  // const [showReplyInput, setShowReplyInput] = useState(false);
  // const [replyText, setReplyText] = useState('');
  // const [commentId, setCommentId] = useState('');

  // const handleReplyClick = (commentId) => {
  //   setCommentId(commentId);
  //   setShowReplyInput(!showReplyInput);
  // };

  // console.log(figureInfo.id)

  // useEffect(()=>{
  //   api.get(`/blog/comment/?blog=${figureInfo.id}`)
  //     .then(response => {
  //       setData(response.data)
  //   })
  // }, [setData, del] );

  // const handleSubmit = async e => {
  //   e.preventDefault();

  //   console.log(comment);
  //   console.log(figureInfo.id);

  //   const formData = new FormData();
  //   formData.append('blog', figureInfo.id);
  //   formData.append('comment', comment);

  //   const response = await api.post('/blog/comment/', formData)
  //   const data = await response.data;
  //   console.log(data)
  //   if ( response.status == 201 ) {
  //     console.log(data)
  //   } else {
  //     console.log(response.status)
  //   }
  //   setData(prevData => [...prevData, data]);
  // };

  // const submitReply = async e => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('blog', figureInfo.id);
  //   formData.append('comment', replyText);
  //   formData.append('parent', commentId);

  //   const response = await api.post('/font/comment/', formData)
  //   const data = await response.data;
  //   console.log(data)
  //   if ( response.status == 201 ) {
  //     console.log(data)
  //   } else {
  //     console.log(response.status)
  //   }
  //   setData(prevData => [...prevData, data]);

  //   setCommentId('');
  //   setReplyText('');
  //   setShowReplyInput(false);
  // };

  // --------------------------------------------------------
  

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >

      <Box
          sx={boxStyle}
      >
      <div className={styles.modal_wrapper} >
            
        <Image                        
          src={figureInfo.image}
          width={500}
          height={500}        
          alt={figureInfo.id}
        />    
        
        <div className={styles.commentBox}>
          <div className={styles.input_wrapper}>          
            {/* <TextField 
            sx={inputStyle} 
            fullWidth 
            label="댓글" 
            variant="standard"
            추가한 데이터
          
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}

            

            -------------
            /> */}
            {/* 힘찬님 코드 추가 (아래) */}
            {/* <div >
            <form onSubmit={handleSubmit} >
            <input style={{ marginLeft: 10}} onChange={(e)=>{ setComment(e.target.value) }}/>
            <div>
            <IconButton type='summit'>
              <SendIcon className={styles.commentbtn} />
            </IconButton>
            </div>
            </form>
            </div>
            <div style={{height: 250}}> */}
              {/* <ScrollView */}
                {/* {
                data.length > 0 &&
                data.slice().reverse().map((comment) => (
                  <div className={styles.commentdiv} key={comment.id}>
                    <span>{comment.user} {comment.comment} {comment.created_at}</span>
                    <span onClick={() => handleReplyClick(comment.id)} style={{cursor: 'pointer'}}>답글쓰기</span>
                    <CommentDeleteblog id={comment.id} state={[del, setDel]}/> */}

                    {/* {comment.replies.length > 0 && (
                      <div>
                        {comment.replies.map((reply) => (
                          <Comment key={reply.id} comment={reply} />
                        ))}
                      </div>
                    )} */}

                    {/* {showReplyInput && commentId === comment.id &&(
                      <div>
                        <form onSubmit={submitReply}>
                          <input onChange={(e)=>{ setReplyText(e.target.value) }}/>
                          <button type='submit'>전송</button>
                        </form>
                      </div>
                    )}
                  </div>
                ))
                //  : ''
                    }
              </div> */}
            {/* 힘찬님 코드 추가 (위) */}

            
          </div>

          <div className={styles.likeBtn}>
            
          <IconButton
              onClick={like_btn}
          >
            <><FavoriteIcon className={styles.heart}/>{like}</>
              {/* onClick={() => setLike(!like)}>
              { 
                like
                ? <><FavoriteIcon className={styles.heart}/> 112 </>
                : <><FavoriteBorderIcon className={styles.heart}/> 111 </>
              } */}
            </IconButton>             
          </div>
          
          <div className={styles.commentBody}>
            
            title: {figureInfo.title}<br/>
            <span style={{fontWeight: 'bold'}}>user : {figureInfo.user}</span>{' '}
            <div>
              <span>text : {figureInfo.body}</span>
            </div>
            


            {/* 댓글여기에 쓰기 */}
            {/* 아래는 추가본 -----------------------------*/}
            {/* {comments.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
              ))} */}




            {/* ------------ -----------------------------*/}
            
          </div>
            <div className={styles.button_position}>
              <button onClick={onClick} className={styles.button_click}>
                <img src='fix_icon.png' width='40' ></img>
              </button>
            </div>
        </div>
        
      </div>
      </Box>
  </Modal>
  );            
}
