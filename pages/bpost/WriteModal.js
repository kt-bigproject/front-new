
import { Modal, Box, TextField, IconButton} from '@mui/material';
import styles from './page.module.css';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect, useRef } from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import AuthContext from "../../src/components/AuthContext/AuthContext"; // *
import { useAxios } from '../../src/components/Axios/axios';
import ErrorAlert from '../../src/components/Qpost/ErrorAlert';
import TextInput from '@leafygreen-ui/text-input';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
// import dynamic from 'next/dynamic';
import Image from 'next/image';

export default function WriteModal({open, onClose}) {


  

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

  const [errorMessage, setErrorMessage] = useState(false);
  const { user } = useContext(AuthContext);
  const fileInput = useRef();
  const [fileList, setFileList] = useState([]);
  const [ body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const Router = useRouter();
  const api = useAxios();

  const handleFileChange = (e) => {
    // setFileList(e.target.files[0]);
    // setSelectedFileName(e.target.files[0]?.name);

    const file = e.target.files[0];
    setFileList(file);
    setSelectedFileName(file?.name);
    setSelectedImage(URL.createObjectURL(file));

  };

  const handleClick = () => {
    fileInput.current.click();
  };

  // const QuillEditor = dynamic( () => import('../../src/components/bpost/QuillEditor'), {
  //   ssr : false
  // })

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

      alert('등록되었습니다.')
      

    };
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
        
      
      
       {/* */ }
        <div className={styles.commentBox_write}>
          <div className={styles.form_head}>
              {/* 왼쪽 이미지 */}
              <form onSubmit={handleApi} className={styles.form_Style}>
                <input
                  type='file'
                  style={{ display: 'none' }}
                  fileList={fileList}
                  ref={fileInput}
                  // onPreview={handlePreview}
                  onChange={handleFileChange}
                />
              
              <div onClick={handleClick} 
                style={{cursor: 'pointer', width: '405px', height: '400px',
                border: '1px dashed #ccc', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', position: 'absolute', overflow: 'hidden',
              }}
              >
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    // alt="Selected Image"
                    // style={{ 
                      // position: 'absolute',
                      // top: '50%',
                      // left: '50%',
                    //   transform: 'translate(-50%, -50%)',
                    //   maxWidth: '100%', maxHeight: '100%' }}
                    // }}
                    width={500}
                    height={500}
                    
                  />
                ) : (
                  <InboxOutlined style={{ fontSize: '32px' }} >파일 업로드</InboxOutlined>
                )}
                {/* <div>파일 업로드</div> */}
              </div>
              {/* <Button leftGlyph={<Icon glyph="Upload" fill="#FF0000"/>}
                onClick={handleClick}>파일 업로드</Button> */}
        </form>

        </div>
        <div>
        <div className={styles.modal_content_wrapper}>
            <div style={{backgroundColor: '#faf0e6', width: '100%', margin: 'auto'}}>
                <div className={styles.detailContainer}>
                  <div className={styles.detailWrapper}>
                    <div className={styles.detailHeader}>
                    <p className={styles.board_title}>{"자랑하기 게시판 > 글쓰기"}</p>
                    </div>
                      <div className={`${styles.detailBody} ${styles.Box}`}>
                      <ErrorAlert parentState={[errorMessage, setErrorMessage]}/>
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
                        
                            {/* <span style={{margin: 10}}>{selectedFileName}</span> */}
                            {/* <span style={{margin: 10}} /> */}
                            <div >
                            <textarea 
                              placeholder='내용을 입력해주세요.' 
                              id="Content" 
                              className={styles.textbox} 
                              onChange={e => setBody(e.target.value)}>
                            </textarea>
                              {/* <QuillEditor onChange={setBody} value={body} style={{height: '100px'}} /> */}
                            </div>
                            <input type="hidden" name="content" value={body}/>
                            <div className={styles.writeBtn} >
                              {/* <Button variant="outline-primary" id='submit-btn' type='submit' onClick={handleApi} style={{width: '100px'}} >글쓰기</Button>     */}
                              <Button className={styles.button_style}
                              type='submit' >글쓰기</Button> 
                            </div> 
                        </form>
                      </div>
                  </div>
                </div>
            </div>
        </div>
        </div>
        </div> {/**/}
      </div>
      </Box>
  </Modal>
  );            
}
