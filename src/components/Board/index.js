import React from 'react';
import { useRouter } from "next/router";
import axios from 'axios';

const Board = ({ title, user, body, image, id }) => {
    const Router = useRouter();
    // const [id, setId] = useState();
    const {query} = useRouter();
    


      const moveToback = () => {
          Router.push('/bpost');
        }

      const moveToUpdate = () => {      
          Router.push(`/update/` + id)
      }

      const deleteBoard = async () => {
          if (window.confirm('게시글을 삭제하시겠습니까?')) {
            
            await axios.delete(`http://127.0.0.1:8000/blog/blog/${id}`).then((res) => {
              alert('삭제되었습니다.');
              Router.push('/bpost');
            });
          }
        }


  return (
    <div>
        <div>
            <h2>{title}</h2>
            <h5>{user}</h5>
            <hr />
            <p>{body}</p>
            <hr />
            <label>{image}</label>
        </div>
        <div>
            <button onClick={moveToUpdate}>수정</button>
            <button onClick={deleteBoard}>삭제</button>
            <button onClick={moveToback}>뒤로</button>
        </div>
    </div>
    
  );
};

export default Board;