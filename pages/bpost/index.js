import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/router';

const BoardList = () => {
  const [boardList, setBoardList] =useState([]);
  const Router = useRouter()

  const getBoardList = async() => {
    const resp = (await axios.get('http://127.0.0.1:8000/blog/blog/')).data;
    setBoardList(resp.data);
    
    const pngn = resp.pagination;
    console.log(pngn);
  };

  const moveToWrite = () => {
    Router.push('/BoardWrite');
  }

  useEffect(() => {
    getBoardList();
  }, []);

//   import BoardWrite from '../../src/components/BoardWrite/index';

  
  return (
    <div>
      <ul>
      <button onClick={moveToWrite}>글쓰기</button>
        {boardList?.map((blog) => (
          // 4) map 함수로 데이터 출력
          <li key={blog.id}>
            <Link href={`/contents/${blog.id}`}>{blog.title}</Link>
            </li>
        ))}
        
      </ul>
          
    </div>
  )

  }

  export default BoardList;