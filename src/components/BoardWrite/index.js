import { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import styles from '../../../styles/post/post.module.css'
import AuthContext from "../AuthContext/AuthContext"; // *
import { useAxios } from '../Axios/axios'; //** 
import dynamic from 'next/dynamic';
import ErrorAlert from '../Qpost/ErrorAlert';
import { FormSkeleton } from '@leafygreen-ui/skeleton-loader';
import TextInput from '@leafygreen-ui/text-input';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import SelectType from '../Qpost/SelectType';

const ImgUploadContainer = styled.div`
  margin-top:50px;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items:center;
  text-align: left;
  /* width:100px; */
  /* height: calc(100%/2 - 200px); */
  margin-bottom: 30px;
  margin-left: 10px;
`
const MainFontStyles = css`

  /* h2 {
    font-size: 32px;
    font-family: 'SUITE-Regular';
    margin-bottom: 10px;;
  }

  h4 {
    font-size: 20px;
    font-family: 'SUITE-Regular';
    margin-bottom: 20px;
  } */

  .img-container{
    width:100%;
    height: calc(100%/2 - 200px);
    /* margin-bottom: 30px; */
  }

  savebtn {
    background-color: "white";
  }


  @font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
  }
  
  @font-face {
      font-family: 'establishRetrosansOTF';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/establishRetrosansOTF.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
`

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const QuillEditor = dynamic( () => import('../Qpost/QuillEditor'), {
  ssr : false
})

const BoardWrite = () => {
  const Router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [title, setTitle] = useState("");
  const [ body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const fileInput = useRef();
  const [selectedFileName, setSelectedFileName] = useState('');
  const [type, setType] = useState("normal")

  console.log(user);


  const api = useAxios(); //**

  const handleFileChange = (e) => {
    setFileList(e.target.files[0]);
    setSelectedFileName(e.target.files[0]?.name);
  }

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleApi = async (event) => {
    event.preventDefault();

    if (title.trim() === '' || body.replace(/<\/?[^>]+(>|$)/g, '').trim() === "") {
      setErrorMessage('제목과 이미지와 내용은 필수 입력 항목입니다.');
    } else {
      setErrorMessage(false);

    const formData = new FormData();

    formData.append('title', title)  //서버전달용
    formData.append('body', body )
    // formData.append(`image`, fileList[0]?.originFileObj); 
    formData.append(`image${index}`, file);
    // if (file !== null) {
    //   formData.append('file', file);
    // }

    for (let key of formData.keys()) {
        console.log("formData key");
        console.log(key);
    }

    const response = await api.post('/blog/blog/', formData)

    const data = await response.data;
    if (response.status === 201) {
      console.log(data)
      Router.push('/bpost')
    } else {
      console.log(response.status)
    }
    // FormData의 value 확인
    for (let value of formData.values()) {
        console.log("formData values");
        console.log(value);
    }

    
    // 권한 필요한 곳에는 밑의 authorization에 bearer 뒤에 토큰 넣어주기
    // data: formData
    // try {
      
    //     const response = await api.post('/blog/blog/', formData);
    //     ;
    //     if (response.status === 201) {
    //         console.log('이미지 전송 성공', response.data);
    //     } else {
    //         console.log('이미지 전송 실패');
    //         console.log(response.status);
    //         console.log("뚱뚱이");
    //     }
    // } catch (error) {
    //     console.error('이미지 전송 실패', error);
    //     console.log(formData);
    // };
    alert('등록되었습니다.');
    Router.push('/bpost');
    
    }
    };
    // const handleSubmit = async e => {
    //   e.preventDefault();
    //   // console.log(title)
    //   // console.log(content)
    //   if (title.trim() === '' || content.replace(/<\/?[^>]+(>|$)/g, '').trim() === "") {
    //     setErrorMessage('제목과 내용은 필수 입력 항목입니다.');
    //   } else {
    //     setErrorMessage(false);
  
    //     const formData = new FormData();
    //     formData.append('title', title)
    //     formData.append('body', content)
    //     formData.append('radio_field', type)
    //     if (file !== null) {
    //       formData.append('file', file);
    //     }
  
    //     const response = await api.post('/blog/blog/', formData)
  
    //     const data = await response.data;
    //     if (response.status === 201) {
    //       console.log(data)
    //       router.push('/qpost')
    //     } else {
    //       console.log(response.status)
    //     }
    //   }
    // };
    

  return (
    <div className={styles.write_page1}>
      <div className={styles.detailContainer}>
      <div className={styles.detailWrapper}>
        <div className={styles.detailHeader}>
        <p className={styles.board_title}>{"자랑하기 게시판 > 글쓰기"}</p>
        </div>
        <div className={`${styles.detailBody} ${styles.Box}`}>
        <ErrorAlert parentState={[errorMessage, setErrorMessage]}/>

        <div style={{paddingBottom: '20px'}}>
        <span className={styles.toList} onClick={()=> Router.push('/bpost')}>
                {"목록으로 >"}             
        </span>      
        </div>
        <form onSubmit={handleApi}>
          <div className={styles.writeTitle}>
            {/* <div>
              <SelectType typeState={[type, setType]} />
            </div> */}
            <div className={styles.titleInput}>
              <TextInput 
                  // {/* <input */}
                    type="text"
                    id="title"
                    onChange={(e) => {setTitle(e.target.value)}}
                    placeholder="30자 이내로 제목을 입력해 주세요."
                    className={styles.titleInput}
                    maxLength={30}
                    required
                  // {/* /> */}
              // {/* </TextInput> */}
              />
            </div>
          </div>
          

          <input
              style={{ display: 'none' }}
              action="http://localhost:3000/"
              listType="picture-card"
              fileList={fileList}
              ref={fileInput}
              // onPreview={handlePreview}
              onChange={handleFileChange}
          />
              {/* {fileList.length >= 1 ? null : uploadButton} */}
          {/* </input> */}
          <Button leftGlyph={<Icon glyph="Upload" fill="#FF0000"/>} 
            onClick={handleClick}>파일 업로드</Button>
            <span style={{margin: 10}}>{selectedFileName}</span>
            {/* <span style={{margin: 10}} /> */}
            <div >
              <QuillEditor onChange={setBody} value={body} style={{height: '425px'}} />
            </div>
            <input type="hidden" name="content" value={body}/>
            <div className={styles.writeBtn} >
              {/* <Button variant="outline-primary" id='submit-btn' type='submit' onClick={handleApi} style={{width: '100px'}} >글쓰기</Button>     */}
              <Button style={{width: '100px'}} type='submit'>글쓰기</Button> 
            </div> 
        </form>
            
          
      </div>
      {/* <div className={styles.h3}>내용을 입력해 주세요.</div>

      <div>
          
          <hr className={styles.line}></hr>
        <label htmlFor="Content">
          <div>
            <textarea 
              placeholder='내용을 입력해주세요.' 
              id="Content" 
              className={styles.textbox} 
              onChange={e => setBody(e.target.value)}>
            </textarea>
          </div>
          
        </label>        
      </div>
      <br /> */}

      {/* <div className={styles.h2}>사진을 업로드 해주세요.</div>
      <hr className={styles.line}></hr> */}
      {/* <div style={{flexDirection : "row", flex:1, display:"flex"}}> 
      <div className={styles.h2}>사진을 업로드 해주세요.</div>
        <div className={styles.upload_box}>
          <div className={styles.upload_box2}> */}
                  {/* <Global></Global> */}
                  
                  {/* <Upload
                      className={styles.h5}
                      action="http://localhost:3000/"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                  >
                      {fileList.length >= 1 ? null : uploadButton}
                  </Upload> */}
                  

                  {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} >
                      <img
                          style={{
                              width: '100%',
                          }}
                          src={previewImage}
                      />
                  </Modal> */}

                  

          </div >
          
        </div>
        
       </div>
      // {/*서버 제출 버튼*/}
      // {/* <hr className={styles.line}></hr> */}
      // {/* <div className={styles.button_div}> */}
      // {/* <button variant="outline-primary" id='submit-btn' type='submit' onClick={handleApi} className={styles.save_btn}>저장하기</button> */}
        // {/* <button onClick={saveBoard} className={styles.save_btn}>저장</button> */}
        // {/* <span>    </span> */}
        // {/* <button onClick={backToList} className={styles.cancel_btn}>뒤로가기</button> */}
      // {/* </div> */}
      // <div>
      // </div>
      // </div>
    // </div>
  );
};

export default BoardWrite;





// 'use client'
// import React, { useState, useContext, useEffect, useRef } from 'react';
// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';
// import { useAxios } from "../../../src/components/Axios/axios";
// import AuthContext from "../../../src/components/AuthContext/AuthContext";
// import { FormSkeleton } from '@leafygreen-ui/skeleton-loader';
// import ErrorAlert from '../../../src/components/Qpost/ErrorAlert';
// import SelectType from '../../../src/components/Qpost/SelectType';
// import Button from '@leafygreen-ui/button';
// import Icon from '@leafygreen-ui/icon';
// import TextInput from '@leafygreen-ui/text-input';
// import styles from '../../../src/components/Qpost/write.module.css';

// const QuillEditor = dynamic( () => import('../../../src/components/Qpost/QuillEditor'), {
//   ssr : false
// })

// export default function BoardWrite() {
  
//   const router = useRouter()
//   const api = useAxios()
//   const { user } = useContext(AuthContext);

//   const [content, setContent] = useState('');
//   const [title, setTitle] = useState('');
//   const [errorMessage, setErrorMessage] = useState(false);
//   const [type, setType] = useState("normal")

//   const [loading, setLoading] = useState(true);
//   const [file, setFile] = useState(null);
//   const [selectedFileName, setSelectedFileName] = useState('');
//   const fileInput = useRef();

//   console.log(user)

//   useEffect(() => {
//     if (!user) {
//       router.push('/login');
//     } else {
//       setLoading(false);
//     }
//   }, [user, router]);

//   if (loading) {
//     return <FormSkeleton/>
//   }


//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setSelectedFileName(e.target.files[0].name);
//   };

//   const handleClick = () => {
//     fileInput.current.click();
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     // console.log(title)
//     // console.log(content)
//     if (title.trim() === '' || content.replace(/<\/?[^>]+(>|$)/g, '').trim() === "") {
//       setErrorMessage('제목과 내용은 필수 입력 항목입니다.');
//     } else {
//       setErrorMessage(false);

//       const formData = new FormData();
//       formData.append('title', title)
//       formData.append('body', content)
//       formData.append(`image`, fileList[0]?.originFileObj); 
//       // formData.append('image', type)
//       if (file !== null) {
//         formData.append('file', file);
//       }

//       const response = await api.post('/blog/blog/', formData)

//       const data = await response.data;
//       if (response.status === 201) {
//         console.log(data)
//         router.push('/bpost')
//       } else {
//         console.log(response.status)
//       }
//     }
//   };

//   console.log(type)
//   return (
//     <div style={{backgroundColor:'#FAF0E6', width: '1100px', margin: 'auto' }}> 
//       <div className={styles.detailContainer}>
//         <div className={styles.detailWrapper}>
//         <div className={styles.detailHeader}>
//           <p style={{fontSize:'35px'}}>{"자랑하기 게시판 > 글쓰기"}</p>
//         </div>
//         <div className={`${styles.detailBody} ${styles.Box}`}> 
//       <ErrorAlert parentState={[errorMessage, setErrorMessage]}/>

//       <div style={{paddingBottom: '20px'}}>
//       <span className={styles.toList} onClick={()=> router.push('/bpost')}>
//               {"목록으로 >"}             
//       </span>      
//       </div>

//       <form onSubmit={handleSubmit}>

//         <div className={styles.writeTitle}>
//           <div>
//           <SelectType typeState={[type, setType]}/>      
//           </div>
//           <div className={styles.titleInput}>
//           <TextInput            
//             aria-labelledby="title" 
//             placeholder="제목을 입력해 주세요."
//             onChange={(e)=>{ 
//               setTitle(e.target.value) 
//             }}
//           />
//           </div>
//         </div>

//         <input
//           type="file"
//           style={{ display: 'none' }}
//           ref={fileInput}
//           onChange={handleFileChange}
//         />
//         <Button leftGlyph={<Icon glyph="Upload" fill="#FF0000"/>} onClick={handleClick}>파일 업로드</Button><span style={{margin: 10}}>{selectedFileName}</span>
//         {/* <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules}/> */}
//         <div className={styles.contents}>
//         <QuillEditor style={{height: '425px'}} onChange={setContent} value={content}/>
//         </div>
//         {/* {typeof window !== 'undefined' && (
//           <div 
//             dangerouslySetInnerHTML={{ 
//               __html : DOMPurify.sanitize(content),
//               }}
//           />
//         )} */}
//         {/* {value} */}
//         <input type="hidden" name="content" value={content}/>
//         <div className={styles.writeBtn} >
//           <Button style={{width: '100px'}} type='submit'>글쓰기</Button>    
//         </div>    
//       </form>
//       </div>
//       <div className={styles.detailFooter}/>          
//       </div>
//       </div>
//     </div>
//   )  
// }