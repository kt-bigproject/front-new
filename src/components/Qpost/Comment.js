'use client'

import { useEffect, useState } from "react"

export default function Comment({blog}) {

  const [comment, setComment] = useState('')
  // let [commentList, setCommentList] = useState([])
  const [data, setData] = useState([])

  useEffect(()=>{

    // const url = new URL('/api/post/comment', location.origin);
    // url.searchParams.append('parent', result._id);

    fetch(`http://127.0.0.1:8000/blog/comment/?blog_id=${blog.id}`, { method : 'GET'})
      .then((r) => r.json())
      .then((blog)=>{
        setData(blog)
        console.log(blog)
      })
  }, [setData] );

  const handleSubmit = async e => {
    e.preventDefault();

    console.log(comment);
    console.log(blog.id)
    const response = await fetch('http://127.0.0.1:8000/blog/comment/', {
      method : 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({          
        comment: comment,
        blog: blog.id,            
        user: blog.user,
      })
    })
    const data = await response.json();
    if ( response.status == 201 ) {
      console.log(data)
    } else {
      console.log(response.status)
    }
    setData(prevData => [...prevData, data]);
  };
      // .then((res) => console.log(res.status) )

  return(       
      <div>
        <form onSubmit={handleSubmit}>
          <input onChange={(e)=>{ setComment(e.target.value) }}/>
          {/* <button onClick={()=>{

              // .then((r) => r.json())
              // .then((data) => {
              //   console.log(data)
                // const newCommentString = JSON.stringify(data);
                // console.log(newCommentString);
                // setData(prevData => [...prevData, newCommentString])
              // });
          }}>댓글전송</button> */}
          <button type='summit'>댓글쓰기</button>
        </form>
        {
          data.length > 0 ?
          data.slice().reverse().map((a, i) => (
              <p key={i}>{a.user} {a.comment} {a.created_at} </p>
          ))
          : '댓글없음 --> 로딩중 ui'
        }
      </div>

  )
}