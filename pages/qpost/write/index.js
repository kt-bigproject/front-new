'use client'
import React, { useState, useContext, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useAxios } from "/src/components/Axios/axios";
import AuthContext from "/src/components/AuthContext/AuthContext";
import { FormSkeleton } from '@leafygreen-ui/skeleton-loader';
import ErrorAlert from '/src/components/Qpost/ErrorAlert';
import SelectType from '/src/components/Qpost/SelectType';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import TextInput from '@leafygreen-ui/text-input';

const QuillEditor = dynamic( () => import('/src/components/Qpost/QuillEditor'), {
  ssr : false
})

export default function Write() {
  
  const router = useRouter()
  const api = useAxios()
  const { user } = useContext(AuthContext);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [type, setType] = useState("normal")

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const fileInput = useRef();

  console.log(user)

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return <FormSkeleton/>
  }


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSelectedFileName(e.target.files[0].name);
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(title)
    // console.log(content)
    if (title.trim() === '' || content.replace(/<\/?[^>]+(>|$)/g, '').trim() === "") {
      setErrorMessage('제목과 내용은 필수 입력 항목입니다.');
    } else {
      setErrorMessage(false);

      const formData = new FormData();
      formData.append('title', title)
      formData.append('body', content)
      formData.append('radio_field', type)
      if (file !== null) {
        formData.append('file', file);
      }

      const response = await api.post('/font/blog/', formData)

      const data = await response.data;
      if (response.status === 201) {
        console.log(data)
        router.push('/qpost')
      } else {
        console.log(response.status)
      }
    }
  };

  console.log(type)
  return (
    <>
      <ErrorAlert parentState={[errorMessage, setErrorMessage]}/>
      <form onSubmit={handleSubmit}>
        <SelectType typeState={[type, setType]}/>      
        <TextInput
          aria-labelledby="title" 
          placeholder="제목을 입력해 주세요."
          onChange={(e)=>{ 
            setTitle(e.target.value) 
          }}
        />

        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
        />
        <Button leftGlyph={<Icon glyph="Upload" fill="#FF0000"/>} onClick={handleClick}>파일 업로드</Button>{selectedFileName}
        {/* <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules}/> */}
        <QuillEditor onChange={setContent} value={content}/>
        {/* {typeof window !== 'undefined' && (
          <div 
            dangerouslySetInnerHTML={{ 
              __html : DOMPurify.sanitize(content),
              }}
          />
        )} */}
        {/* {value} */}
        <input type="hidden" name="content" value={content}/>
        <Button type='submit'>글쓰기</Button>
      </form>
    </>
  )  
}