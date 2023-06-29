import { Modal, Box, IconButton} from '@mui/material';
import { useAxios } from '../../src/components/Axios/axios';
import Image from 'next/image';
import styles from './detail.module.css';
import { useState, useEffect  } from 'react';
import Comment from '../../src/components/bpost/Comment/Comment';
import CommentList from '../../src/components/bpost/Comment/CommentList';
import EditIcon from '@mui/icons-material/Edit';
import Heart from "react-animated-heart";

export default function ImgModal({open, onClose, figureInfo}) {


  const [data, setData] = useState([])
  const [del, setDel] = useState(false)

  const [loading, setLoading] = useState(false);

  const [isLike, setIsLike] = useState(figureInfo.isLiked)
  const [likes, setLikes] = useState(figureInfo.num_likes)


  useEffect(() => {
    setIsLike(figureInfo.isLiked);
  }, [figureInfo.isLiked]);

  useEffect(() => {
    setLikes(figureInfo.num_likes);
  }, [figureInfo.num_likes]);

  
  const api = useAxios()

  // console.log(figureInfo)

  const handleLike = async () => {
    try {
      setLoading(true);
      if (isLike) {
        const response = await api.post(`/blog/blog/${figureInfo.id}/unlike/`);
        console.log(response);
        setLikes(prevLikes => prevLikes - 1);
      } else {
        const response = await api.post(`/blog/blog/${figureInfo.id}/like/`);
        console.log(response);
        setLikes(prevLikes => prevLikes + 1);
      }
      setIsLike(!isLike); 
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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
  };


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
        <div className={styles.commentBody}>
          <span style={{fontWeight: 'bold', marginRight: '5px', fontFamily: "four"}}>{figureInfo.user}</span>
          <span>{figureInfo.body}</span>

          <div className={styles.editIcon}>
              <IconButton type='summit' >
                <EditIcon/>
              </IconButton>
          </div>
          <hr style={{marginTop: '10px', marginBottom: '10px', border: 'none', height: '1px', backgroundColor: 'black'}}/>
          <div>
            <CommentList data={data} del={del} setDel={setDel}/>
          </div>
        </div>

        <div className={styles.LikeWrapper}>
          <div className={styles.LikeBtn}>
            <Heart isClick={isLike} onClick={loading ? null : handleLike}/>
          </div>
          <div className={styles.LikeNum}>
            {likes}
          </div>
        </div>

        <div className={styles.inputWrapper}>       
          <Comment blog={figureInfo} setData={setData} del={del}/>
        </div>
        </div>
      </div>
      </Box>
  </Modal>
  );            
}
