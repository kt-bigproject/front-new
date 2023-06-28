'use client'

import { useEffect, useState } from "react";
// import CommentDelete from './CommentDelete';
// import { SpaceContext } from "antd/es/space";
import { useAxios } from "/src/components/Axios/axios";
// import AuthContext from "/src/components/AuthContext/AuthContext";
import styles from './comment.module.css';
import { IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { lightBlue } from '@mui/material/colors';

export default function Comment({blog, setData, del}) {

  console.log(blog.id)
  const [comment, setComment] = useState('')
  // let [commentList, setCommentList] = useState([])
  // const [data, setData] = useState([])
  // const [del, setDel] = useState(false)
  const api = useAxios()
  // const authContextValue = useContext(AuthContext); 
  // console.log(authContextValue)

  console.log(blog.id)

  useEffect(()=>{
    api.get(`/blog/comment/?blog=${blog.id}`)
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

    const response = await api.post('/blog/comment/', formData)
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

  return (        
      <div className={styles.commentBox}>
        <form onSubmit={handleSubmit}>

          <textarea 
            className={styles.textArea} 
            placeholder={"댓글을 남겨보세요."}
            onChange={(e)=>{ setComment(e.target.value) }} />


            <div className={styles.commentIcon}>
              <IconButton type='summit' >
                <SendIcon sx={{color: lightBlue[600]}}/>
              </IconButton>
            </div>
        </form>
      </div>
  );
}