import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import DeleteBtn from "/src/components/Qpost/DeleteBtn"
// import Link from 'next/link';
// import Comment from '/src/components/Qpost/Comment';
import CommentList from '/src/components/Qpost/Comment/CommentList';
// import Comment from '/src/components/Qpost/RecursiveComment'
import { useRouter } from 'next/router'
import Button from '@leafygreen-ui/button';
import { useAxios } from "/src/components/Axios/axios";
import AuthContext from "/src/components/AuthContext/AuthContext";
import { FormSkeleton } from '@leafygreen-ui/skeleton-loader';
import ErrorAlert from '/src/components/Qpost/ErrorAlert';


export default function PostDetail() {
  
  const api = useAxios()
  const router = useRouter()
  const { id } = router.query

  const [blog, setBlog] = useState(null);
  const [auth, setAuth] = useState(false);

  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/font/blog/${id}`);
      setBlog(response.data);      
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (blog && user) {
      setAuth(blog.user_id !== user.user_id);
    } 
  }, [blog, user]);
  
  if (!blog) {
    return <FormSkeleton/>;
  }

  const handleEditClick = () => {
    if (auth) {
      setErrorMessage('수정권한이 없습니다.');
      return;
    }
    router.push(`/qpost/edit/${blog.id}`);
  };

  return (
    <div>
      <ErrorAlert parentState={[errorMessage, setErrorMessage]}/>
      <Button style={{width: 100}} onClick={()=> router.push('/qpost')}>목록으로</Button>
      <Button className="EditBtn" onClick={handleEditClick}>수정</Button>
      <DeleteBtn id={blog.id} auth={auth}/>

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
      <CommentList blog={blog}/>
    </div>
  );
}