import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useState } from 'react';
import axios from "axios";
import styled from "@emotion/styled";
import Button from "@leafygreen-ui/button"


const ImgUploadContainer = styled.div`
  margin-top:50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items:center;
  text-align: center;
`

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


export default function ImageUpload(props) {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);


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
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );


    // 이미지를 서버로 전송하는 함수

    const handleApi = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('font', props.font)  //서버전달용
        formData.append(`image`, fileList[0].originFileObj) 
        // FormData의 key 확인

        data: formData
        try {
            const response = await axios.post('http://127.0.0.1:8000/practice/upload/', formData, {
                headers: { "Content-Type": "multipart/form-data", }, // 헤더 추가
            });
            if (response.status === 201) {
                console.log('이미지 전송 성공', response.data);
            } else {
                console.log('이미지 전송 실패');
                console.log(response.status);
            }
        } catch (event) {
            console.error('이미지 전송 실패', event)
            console.log(formData)
        };

    };

    return (
        <>
            <ImgUploadContainer>
                <h2>사진을 업로드 하세요</h2>
                <br />
                <Upload
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
                        src={previewImage}
                    />
                </Modal>
                <br />
                {/*서버 제출 버튼*/}
                <Button variant="primary" id='submit-btn' type='submit' onClick={handleApi}>Submit</Button>

            </ImgUploadContainer >
        </>
    );
};