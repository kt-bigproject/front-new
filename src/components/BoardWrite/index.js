import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import styles from '../../../styles/post/post.module.css'


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
    margin-bottom: 30px;
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
  const [title, setTitle] = useState("")
  const [ body, setBody] = useState("")


  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
      <div>
          <PlusOutlined />
          <div
              style={{
                  marginTop: 8,
              }}
          >
              Upload
          </div>
      </div>
  );

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };

  // const [board, setBoard] = useState({
  //       id: "",
  //       title: "",
  //       created_at: "",
  //       user: "",
  //       body: "",
  //       image: null,
  // });

//  try {
  const saveBoard = async () => {
    await axios.post(`http://127.0.0.1:8000/blog/blog/`, board).then((res) => {
      alert('등록되었습니다.');
      Router.push('/bpost');
    });
  };

  const backToList = () => {
    Router.push('/bpost');
  };

    const handleApi = async (event) => {
    event.preventDefault();
    const formData = new FormData();


        
    formData.append('title', title)  //서버전달용
    formData.append('user', localStorage.user)
    formData.append('body', body )
    formData.append(`image`, fileList[0]?.originFileObj); 
    // formData.append(`user`, )
    // FormData의 key 확인
    for (let key of formData.keys()) {
        console.log("formData key");
        console.log(key);
    }

    // FormData의 value 확인
    for (let value of formData.values()) {
        console.log("formData values");
        console.log(value);
    }

    data: formData
    try {
        const response = await axios.post('http://127.0.0.1:8000/blog/blog/', formData, {
            headers: { "Content-Type": "multipart/form-data",
                    // "authorization" : 
        
        }, // 헤더 추가
        });
        if (response.status === 201) {
            console.log('이미지 전송 성공', response.data);
        } else {
            console.log('이미지 전송 실패');
            console.log(response.status);
        }
    } catch (error) {
        console.error('이미지 전송 실패', error);
        console.log(formData);
    };
    alert('등록되었습니다.');
    Router.push('/bpost');

    };
    // console.log(localStorage.user)
  return (
    <div>
      <div>게시물 작성</div>
      <hr className={styles.line}></hr>
      <div>
        <label htmlFor="title">
            <input
              type="text"
              id="title"
              onChange={e => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요."
              className={styles.title}
              required
            />
            <hr className={styles.line}></hr>
        </label>
      </div>
      <div>
        <label htmlFor="Content">
          <div>
            <textarea 
              placeholder='내용을 입력해주세요.' 
              id="Content" 
              rows="10"
              cols="40" 
              className={styles.textbox} 
              onChange={e => setBody(e.target.value)}>
            </textarea>
          </div>
          <hr className={styles.line}></hr>
        </label>
      
      
          {/* <input
            type="textbox"
            id="Content"
            cols="50"
            rows="50"
            onChange={e => setBody(e.target.value)}
            placeholder="내용을 입력해주세요"
            required
          /> */}
          
      </div>
      <br />
      
      <div style={{flexDirection : "row", flex:1, display:"flex"}}>
        <div >
          <div className={styles.h2}>-사진 업로드-</div>
          <div className={styles.h4}>사진을 업로드 해주세요 -→</div>
        </div>
        <div className={styles.upload_box}>
          <ImgUploadContainer className={styles.upload_box2}>
                  <Global styles={MainFontStyles} ></Global>
                  <Upload
                      
                      action="http://localhost:3000/"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                  >
                      {fileList.length >= 1 ? null : uploadButton}
                  </Upload>

                  <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} >
                      <img
                          style={{
                              width: '100%',
                          }}
                          src={previewImage}
                      />
                  </Modal>

                  

          </ImgUploadContainer >
          
        </div>
        
      </div>
      {/*서버 제출 버튼*/}
      
      <div>
      <button variant="outline-primary" id='submit-btn' type='submit' onClick={handleApi} className={styles.save_btn}>저장</button>
        {/* <button onClick={saveBoard} className={styles.save_btn}>저장</button> */}
        <span>    </span>
        <button onClick={backToList} className={styles.cancel_btn}>뒤로</button>
      </div>
      <div>
      </div>
    </div>
  );
};

export default BoardWrite;

