import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const BoardWrite = () => {
  const Router = useRouter();

  const [board, setBoard] = useState({
    id: '',
    title: '',
    created_at: '',
    user: '',
    body: '',
    image: '',
  });

  const { id, title, created_at, user, body, image } = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };
//  try {
  const saveBoard = async () => {
    await axios.post(`http://127.0.0.1:8000/blog/blog/`, board).then((res) => {
      alert('등록되었습니다.');
      Router.push('/bpost');
    });
  };

  const backToList = () => {
    Router.push('/bpost');
  };
// } catch (event) {
//   console.log("에러", event)
//   console.error("에러", event)
// }
  return (
    <div>
      <div>
        <span>제목</span>
        <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>작성자</span>
        <input
          type="text"
          name="user"
          value={user}
          onChange={onChange}
        />
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea
          name="body"
          cols="30"
          rows="10"
          value={body}
          onChange={onChange}
        ></textarea>
      </div>
      <br />
      <div>
        <span>사진/이미지</span>
        <input type="file"
          onChange={onChange}
        ></input>
      </div>
      <div>
        <button onClick={saveBoard}>저장</button>
        <button onClick={backToList}>취소</button>
      </div>
    </div>
  );
};

export default BoardWrite;