import { Modal, Box, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import styles from './detail.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Comment from '/src/components/bpost/Comment/Comment';
import CommentList from '/src/components/bpost/Comment/CommentList';
import EditIcon from '@mui/icons-material/Edit';

export default function ImgModal({open, onClose, figureInfo}) {


  const [data, setData] = useState([])
  const [del, setDel] = useState(false)

  console.log(figureInfo)
  // const [like, setLike] = useState(true);
  // const [counter, setCounter] = useState(0);

  // const like_btn = () => {
  //   setLike(like + 1);
  // };
  

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
        <div className={styles.input_wrapper}>       
          <Comment blog={figureInfo} setData={setData} del={del}/>
        </div>
        </div>
      </div>
      </Box>
  </Modal>
  );            
}
