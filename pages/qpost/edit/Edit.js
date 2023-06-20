// 'use client'
import { useState } from 'react';
import dynamic from 'next/dynamic';
// import { useRouter } from 'next/navigation'
import { useRouter } from 'next/router';

const QuillEditor = dynamic( () => import('/src/components/Qpost/QuillEditor'), {
  ssr : false
})

export default function Edit({blog}) {
  const router = useRouter()

  const [content, setContent] = useState(blog.body);
  const [title, setTitle] = useState(blog.title);
  const [error, setError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(title)
    // console.log(content)
    if (title === '' || content === '') {
      setError(true);
      console.log('blank')
    } else {
      const response = await fetch('http://127.0.0.1:8000/blog/blog/'+blog.id+'/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id : blog.id,
          title: title,
          body: content,
        }),
      });
      const data = await response.json();
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