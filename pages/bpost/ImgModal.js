import { Modal, Box, TextField, IconButton} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';
import { Router } from 'react-router-dom';
import { useRouter } from 'next/router';

export default function ImgModal({open, onClose, figureInfo}) {

  console.log(figureInfo)
  const [like, setLike] = useState(true);

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

  const Router = useRouter();
  const onClick = () => {
    Router.push('/BoardUpdate/' + id)
  }

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
            <TextField sx={inputStyle} fullWidth label="댓글" variant="standard"/>
            <div className={styles.SendBtn}>
              <IconButton
                onClick={() => {}}> 
                <SendIcon/>
              </IconButton> 
            </div>
          </div>

          <div className={styles.likeBtn}>
          <IconButton
              onClick={() => setLike(!like)}>
              { 
                like
                ? <><FavoriteIcon className={styles.heart}/> 112 </>
                : <><FavoriteBorderIcon className={styles.heart}/> 111 </>
              }
            </IconButton>             
          </div>
          
          <div className={styles.commentBody}>
            title: {figureInfo.title}<br/>
            <span style={{fontWeight: 'bold'}}>user : {figureInfo.user}</span>{' '}
            <div>
              <span>text : {figureInfo.body}</span>
            </div>
            <div>
              <button onClick={onClick}>수정</button>
            </div>


            {/* 댓글여기에 쓰기 */}

            
          </div>
        </div>
      </div>
      </Box>
  </Modal>
  );            
}
