import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import styles from '../../../styles/post/post.module.css'
import { css, Global } from '@emotion/react';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useAxios } from "../../../src/components/Axios/axios";
import dynamic from "next/dynamic";


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

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
// CSS------------------------------------------------------------------------------------
const MainFontStyles = css`

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
// CSS------------------------------------------------------------------------------------


 
    

const BoardUpdate = () => {
  // const [id, setId] = useState();
  const Router = useRouter();
  const {query} = Router;
  const {id} = useParams();
  const api=useAxios();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
 

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



  const [board, setBoard] = useState({
    id: 0,
    title: '',
    user: '',
    body: '',
    image: '',
  });

  const { title, user, body, image } = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const getBoard = async () => {
    try {
      const response = await api.get(`/blog/blog/${query.number}/`);
      const data = response.data;
      setBoard(data);
      console.log(data);
    } catch (error) {
      console.error('게시글 가져오기 실패:', error);
    }
  };

  const updateBoard = async () => {
    try {
      const response = await api.patch(`/blog/blog/${query.number}/`, board);
      console.log('게시글 수정 성공:', response.data);
      alert('수정되었습니다.');
      Router.push('/bpost');
    } catch (error) {
      console.error('게시글 수정 실패:', error);
    }
  };

  const backToDetail = () => {
    Router.push('/bpost');
  };

  const deleteBoard = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        const response = await api.delete(`/blog/blog/${query.number}/`);
        console.log('게시글 삭제 성공:', response.data);
        alert('삭제되었습니다.');
        Router.push('/bpost');
      } catch (error) {
        console.error('게시글 삭제 실패:', error);
      }
    }
  };
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    getBoard();
  }, []);

  

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
        const response = await api.patch(`/blog/blog/${query.number}/`, formData, {
            headers: { "Content-Type": "multipart/form-data",
                    // "authorization" : 
        
        }, // 헤더 추가
        });
        if (response.status === 200) {
            console.log('이미지 전송 성공', response.data);
        } else {
            console.log('이미지 전송 실패');
            console.log(response.status);
        }
    } catch (error) {
        console.error('이미지 전송 실패', error);
        console.log(formData);
    };
    alert('수정되었습니다.');
    Router.push('/bpost');
    };
    const QuillEditor = dynamic( () => import('../../../src/components/Qpost/QuillEditor'), {
      ssr : false
    })

  return (
    <div>
      <div>
        <span>작성자</span>
        <input type="text" name="user" value={user} readOnly={true} />
      </div>
      <br />
      <div>
        <span>제목</span>
        <input type="text" name="title" value={title} onChange={onChange} placeholder="제목을 입력해주세요."
              className={styles.title}/>
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea
          placeholder='내용을 입력해주세요.'
          className={styles.textbox}
          name="body"
          cols="30"
          rows="10"
          value={body}
          onChange={onChange}
        ></textarea>
      </div>
      <br />
             <div style={{ flexDirection: "row", flex: 1, display: "flex" }}>
                 <div>
                     <div className={styles.h2}>-사진 업로드-</div>
                     <div className={styles.h4}>사진을 업로드 해주세요 -→</div>
                 </div>
                 <div className={styles.upload_box}>
                     <ImgUploadContainer className={styles.upload_box2}>
                         <Global styles={MainFontStyles}></Global>
                         <Upload
                            name="image"
                            value={image}
                            action="http://localhost:3000/"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>

                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img
                                style={{
                                    width: '100%',
                                }}
                                src={previewImage} />
                        </Modal>
                    </ImgUploadContainer>

                </div>
                </div>
      <div>
        <button type="submit" onClick={handleApi}>수정</button>
        <button onClick={deleteBoard}>삭제</button>
        <button onClick={backToDetail}>취소</button>
      </div>
    </div>
  );
};

export default BoardUpdate;