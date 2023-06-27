// 'use client'
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAxios } from "/src/components/Axios/axios";
// import AuthContext from "/src/components/AuthContext/AuthContext";
// import { FormSkeleton } from '@leafygreen-ui/skeleton-loader';
import dynamic from 'next/dynamic';
import ErrorAlert from '/src/components/Qpost/ErrorAlert';
import styles from '/src/components/Qpost/write.module.css';
import Button from '@leafygreen-ui/button';
import SelectType from '/src/components/Qpost/SelectType';
import TextInput from '@leafygreen-ui/text-input';
import Icon from '@leafygreen-ui/icon';

const QuillEditor = dynamic( () => import('/src/components/Qpost/QuillEditor'), {
  ssr : false
})

export default function Edit({blog}) {

  // const { user } = useContext(AuthContext);

  const router = useRouter()
  const api = useAxios()

  const [content, setContent] = useState(blog.body);
  const [title, setTitle] = useState(blog.title);
  const [errorMessage, setErrorMessage] = useState(false);

  const [type, setType] = useState(blog.radio_field)

  const [file, setFile] = useState(blog.file);
  const [selectedFileName, setSelectedFileName] = useState(getFilenameFromUrl(blog.file));

  const fileInput = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSelectedFileName(e.target.files[0].name);
  };

  const handleClick = () => {
    fileInput.current.click();
  };



  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login');
  //   } else {
  //     setLoading(false);
  //   }
  // }, [user, router]);

  // if (loading) {
  //   return <FormSkeleton/>
  // }

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(title)
    // console.log(content)
    if (title.trim() === '' || content.replace(/<\/?[^>]+(>|$)/g, '').trim() === "") {
      setErrorMessage('제목과 내용은 필수 입력 항목입니다.');
    } else {
      setErrorMessage(false);

      const formData = new FormData();
      formData.append('id', blog.id)
      formData.append('title', title)
      formData.append('body', content)
      if (file !== null && file !== blog.file) {
        formData.append('file', file);
      }

      const response = await api.put('/font/blog/'+blog.id+'/', formData);
      //  {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     id : blog.id,
      //     title: title,
      //     body: content,
      //   }),
      // });
      const data = await response.data;
      if (response.status === 201 || response.status === 200) {
        console.log(data)
        router.push('/qpost/'+blog.id)
      } else {
        console.log(response.status)
      }
    }
  };

  function getFilenameFromUrl(url) {
    if (url === null) {
      return null;
    }
    
    const splitUrl = url.split("/");
    const encodedFilename = splitUrl[splitUrl.length - 1];
    const decodedFilename = decodeURIComponent(encodedFilename);
    
    return decodedFilename;    
  };

  return (
    <div style={{backgroundColor:'#FAF0E6', width: '1100px', margin: 'auto' }}> 
      <div className={styles.detailContainer}>
        <div className={styles.detailWrapper}>
        <div className={styles.detailHeader}>
          <p style={{fontSize:'35px'}}>{"문의하기 게시판 > 수정하기"}</p>
        </div>
        <div className={`${styles.detailBody} ${styles.Box}`}> 
      <ErrorAlert parentState={[errorMessage, setErrorMessage]}/>

      <div style={{paddingBottom: '20px'}}>
      <span className={styles.toList} onClick={()=> router.push('/qpost')}>
              {"목록으로 >"}             
      </span>      
      </div>

      <form onSubmit={handleSubmit}>
      <div className={styles.writeTitle}>
          <div>
          <SelectType typeState={[type, setType]}/>      
          </div>
          <div className={styles.titleInput}>
          <TextInput            
            aria-labelledby="title" 
            value={blog.title}
            onChange={(e)=>{ 
              setTitle(e.target.value) 
            }}
          />
          </div>
        </div>

        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
        />
        <Button leftGlyph={<Icon glyph="Upload" fill="#FF0000"/>} onClick={handleClick}>파일 업로드</Button><span style={{margin: 10}}>{selectedFileName}</span>
        {/* <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules}/> */}
        <div className={styles.contents}>
        <QuillEditor style={{height: '425px'}} onChange={setContent} value={content}/>
        </div>

        <input type="hidden" name="content" value={content}/>
        <div className={styles.writeBtn} >
          <Button style={{width: '100px'}} type='submit'>수정완료</Button>    
        </div>    
      </form>
      </div>
      <div className={styles.detailFooter}/>          
      </div>
      </div>
    </div>
  )  
}