import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import PostTable from './PostTable'; 
import CreateTable from './CreateTable'; 
import { useAxios } from '../../src/components/Axios/axios';


export default function Home() {
  const [blog, setBlog] = useState(null);
  const api=useAxios();

  useEffect(() => {
    api.get('/blog/blog/?')
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  if (blog === null) {
    return <div>Loading...</div>;
  }

  // return <PostTable blog={blog}/>;
  return <CreateTable data={blog}/>

}