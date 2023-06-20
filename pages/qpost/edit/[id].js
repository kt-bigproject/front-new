import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import Edit from "./Edit"

export default function EditPage() {

  const router = useRouter()
  const { id } = router.query

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/blog/blog/' + id)
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  if (blog === null) {
    return <div>Loading...</div>;
  }

  return (
    <Edit blog={blog}/>
  )
}