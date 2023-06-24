import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CreateTable from './CreateTable'; 
import Pagination from '@mui/material/Pagination';
import AuthContext from "/src/components/AuthContext/AuthContext";
import { TableSkeleton } from '@leafygreen-ui/skeleton-loader';

export default function Home() {

  const { user, logoutUser } = useContext(AuthContext);

  console.log(user)
  
  const [blog, setBlog] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const baseURL = 'http://127.0.0.1:8000/api';

  useEffect(() => {
    axios.get( baseURL + '/font/blog/')
      .then(response => {
        const pageSize = 15;
        setCount(Math.ceil(response.data.count / pageSize));
      })
    }, []);

  useEffect(() => {
    axios.get( baseURL + '/font/blog/?page='+page)
      .then(response => {
        setBlog(response.data.results);
      })
      .catch(error => console.error(error));
  }, [page]);

  if (blog === null) {
    return <TableSkeleton/>
  }

  // return <PostTable blog={blog}/>;
  return (
    <>    
      {/* <div>{user.username}</div> */}
      <button onClick={logoutUser}>Logout</button>
      <CreateTable data={blog}/>
      <Pagination 
            count={count} 
            page={page}
            onChange={handleChangePage}
            showFirstButton 
            showLastButton />
    </>

  )
}