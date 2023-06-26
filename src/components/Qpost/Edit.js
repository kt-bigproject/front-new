// 'use client'
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAxios } from "/src/components/Axios/axios";
// import AuthContext from "/src/components/AuthContext/AuthContext";
// import { FormSkeleton } from '@leafygreen-ui/skeleton-loader';
import dynamic from 'next/dynamic';
import ErrorAlert from '/src/components/Qpost/ErrorAlert';

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

  return (
    <>
      <ErrorAlert parentState={[errorMessage, setErrorMessage]}/>
      <form onSubmit={handleSubmit}>
        <input 
          name="title" 
          defaultValue={blog.title}
          onChange={(e)=>{ 
        setTitle(e.target.value) 
        }}/>

        <QuillEditor onChange={setContent}  value={content}/>

        <input type="hidden" name="content" value={content}/>
        <button type='submit'>수정완료</button>
      </form>
    </>
  )  
}