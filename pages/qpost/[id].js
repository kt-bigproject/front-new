import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteBtn from "/src/components/Qpost/DeleteBtn"
import Link from 'next/link';
import Comment from '/src/components/Qpost/Comment'
import { useRouter } from 'next/router'

export default function PostDetail() {
  
  const router = useRouter()
  const { id } = router.query
  
  console.log(`http://127.0.0.1:8000/blog/blog/${id}`)
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/blog/blog/${id}`);
      setBlog(response.data);
    };
    fetchData();
  }, [id]);

  // 로딩 중이라는 것을 표시하기 위한 코드
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <Link href={'edit/' + blog.id}> 
        <button className="EditBtn">수정</button> 
      </Link>
      <DeleteBtn id={blog.id} user={blog.user}/>

      <h4>상세페이지</h4>
      <h4>제목 : {blog.title}</h4>
      <h5>작성시간 : {new Date(blog.created_at).toISOString()}</h5>
      <h5>글쓴이 : {blog.user}</h5>
      <hr/>

      {/* { 
        <div
          dangerouslySetInnerHTML={{
          __html : sanitizeHtml(blog.body) }}
        />
      } */}

      {
        <div
        dangerouslySetInnerHTML={{
        __html : blog.body }}
      />
      }
      
      <hr/>
      <Comment blog={blog}/>
    </div>
  );
}