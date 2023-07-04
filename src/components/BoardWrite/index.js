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
    formData.append(`image`, fileList);
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
                    // type="text"
                    // id="title"
                    onChange={(e) => {setTitle(e.target.value)}}
                    placeholder="30자 이내로 제목을 입력해 주세요."
                    // className={styles.titleInput}
                    maxLength={30}
                    // required
                  // {/* /> */}
              // {/* </TextInput> */}
              />
            </div>
          </div>
          

          <input
              type='file'
              style={{ display: 'none' }}
              // action="http://localhost:3000/"
              // listType="picture-card"
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

  );
};

export default BoardWrite;
