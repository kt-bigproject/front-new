/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import DeleteIconBtn from "/src/components/Qpost/DeleteIconBtn"
// import Link from 'next/link';
import CommentList from '/src/components/Qpost/Comment/CommentList';
import { useRouter } from 'next/router'
// import Button from '@leafygreen-ui/button';
import { useAxios } from "/src/components/Axios/axios";
import AuthContext from "/src/components/AuthContext/AuthContext";
import { FormSkeleton } from '@leafygreen-ui/skeleton-loader';
import ErrorAlert from '/src/components/Qpost/ErrorAlert';
import styles from '/src/components/Qpost/detail.module.css';
// import moment from 'moment';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import Popover from '@leafygreen-ui/popover';
import { css } from '@emotion/react'


export default function PostDetail() {
  
  const api = useAxios()
  const router = useRouter()
  const { id } = router.query

  const [blog, setBlog] = useState(null);
  const [auth, setAuth] = useState(false);

  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(false);

  const [numComments, setNumComments] = useState(0);

  const [active, setActive] = useState(false);
  const [attachment, setAttachment] = useState(null);

  console.log(blog)
  console.log(user)

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/font/blog/${id}`);
      setBlog(response.data);      
      setNumComments(response.data.num_comments);
      setAttachment(response.data.file);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (blog && user) {
      setAuth(blog.user_id !== user.user_id);
    } 
  }, [blog, user]);
  
  if (!blog) {
    return <FormSkeleton/>;
  } 

  const handleEditClick = () => {
    if (auth) {
      setErrorMessage('수정권한이 없습니다.');
      return;
    }
    router.push(`/qpost/edit/${blog.id}`);
  };

  const types = {
    normal: "일반",
    inquiry: "문의",
    announcement: "공지",
  };

  function getFilenameFromUrl(url) {
    const splitUrl = url.split("/");
    const encodedFilename = splitUrl[splitUrl.length - 1];
    const decodedFilename = decodeURIComponent(encodedFilename);
    
    return decodedFilename;    
  };

  const quillEditorStyle = css`
  .ql-font-one {
    font-family: 'one';
  }
  .ql-font-two {
    font-family: 'two';
  }
  .ql-font-three {
    font-family: 'three';
  }
  .ql-font-four {
    font-family: 'four';
  }
  .ql-font-five {
    font-family: 'five';
  }
    
  .ql-size-small {
      font-size: 0.75em;
  }

  .ql-size-large {
      font-size: 1.5em;
  }

  .ql-size-huge {
      font-size: 2.5em;
  }
  `

  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  return (
    <div style={{backgroundColor:'#FAF0E6', width: '1100px', margin: 'auto' }}> 
      <div className={styles.detailContainer}>
        <div className={styles.detailWrapper}>
        <div className={styles.detailHeader}>
          <p style={{fontSize:'35px'}}>{"문의하기 게시판 > 게시글"}</p>
        </div>
        <div className={`${styles.detailBody} ${styles.Box}`}> 
          <div className={styles.topToolbar}>
            <ErrorAlert parentState={[errorMessage, setErrorMessage]}/>
            <span className={styles.toList} onClick={()=> router.push('/qpost')}>
              {"목록으로 >"}             
            </span>
            <div className={styles.toolBtn}>
            <IconButton className="Edit" aria-label="edit" size="large" onClick={handleEditClick}>
              <Icon glyph="Edit" />
            </IconButton>
            <DeleteIconBtn id={blog.id} auth={auth} />
            </div>
          </div>

          <div>            
            <span>[{types[blog.radio_field]}]</span>
            <h1>{blog.title}</h1>
            <h3>{blog.user}</h3>

            <div style={{display: 'flex', justifyContent: 'space-between', color: '#666666', paddingTop: '15px'}}>
              <div style={{display: 'flex', width: '170px', justifyContent: 'space-between'}}>
                <h5>{formatDateTime(new Date(blog.created_at))}</h5>
                <h5>조회: {blog.views}</h5>
              </div>

            { attachment && (
              <span className={styles.attachment} onClick={() => setActive(!active)}> 
              <Icon role="img" glyph="File"/>첨부파일             
              <Popover
                align="top"
                justify="end"
                active={active}
                usePortal={true}
                spacing={10}
              >
                <div className={`${styles.Box} ${styles.fileBox}`}>
                  <a 
                    className={styles.fileText} 
                    href={blog.file} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    download
                  >
                    {getFilenameFromUrl(attachment)}
                  </a>
                </div>
              </Popover>
             </span>
            )}

            </div>
            <hr/>
          </div>

          <div className={styles.contents}>
          {/* { 
            <div
              dangerouslySetInnerHTML={{
              __html : sanitizeHtml(blog.body) }}
            />
          } */}

          {
            <div
            css={quillEditorStyle}
            dangerouslySetInnerHTML={{
            __html : blog.body }}
          />
          }
          </div>
        </div>
        
        <div className={styles.commentContainer}>
          <span style={{fontSize:'35px'}}>댓글</span> 
          <span style={{color: '#fa6400', fontWeight: '600', marginLeft: '5px'}}>[{numComments}]</span>
          <hr style={{marginBottom: '10px', border: 'none', height: '1.5px', backgroundColor: 'black'}}/>
          <CommentList blog={blog} setNumComments={setNumComments}/>
        </div>

      </div>
      </div>
    </div>
  );
}