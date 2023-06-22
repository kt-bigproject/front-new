import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import PostTable from './PostTable'; 
import CreateTable from './CreateTable'; 


export default function Home() {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/blog/blog/?')
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