'use client'
import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const QuillEditor = dynamic( () => import('/src/components/Qpost/QuillEditor'), {
  ssr : false
})

export default function Write() {

  const router = useRouter()

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(title)
    // console.log(content)
    if (title === '' || content === '') {
      setError(true);
      console.log('blank')
    } else {
      const response = await fetch('http://127.0.0.1:8000/blog/blog/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          body: content,
        }),
      });
      const data = await response.json();
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