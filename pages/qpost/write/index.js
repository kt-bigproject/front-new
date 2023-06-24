'use client'
import React, { useState, useContext, useEffect} from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useAxios } from "/src/components/Axios/axios";
import AuthContext from "/src/components/AuthContext/AuthContext";
import { FormSkeleton } from '@leafygreen-ui/skeleton-loader';
import ErrorAlert from '/src/components/Qpost/ErrorAlert';

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

  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <ErrorAlert parentState={[errorMessage, setErrorMessage]}/>
      <form onSubmit={handleSubmit}>
        <input name="title" onChange={(e)=>{ 
        setTitle(e.target.value) 
        }}/>

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
        <button type='submit'>글쓰기</button>
      </form>
    </>
  )  
}