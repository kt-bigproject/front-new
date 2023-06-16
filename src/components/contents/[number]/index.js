import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BoardWrite from '../../BoardWrite';

const BoardDetail = () => {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [BoardWrite, setBoardWrite] = useState({});
  const getBoard = async () => {
    const resp = await (await axios.get(`http://127.0.0.1:8000/blog/blog/${id}`)).data;
    setBoardWrite(resp.data);
    setLoading(false);
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Board
          id={BoardWrite.id}
          title={BoardWrite.title}
          created_at={BoardWrite.created_at}
          user={BoardWrite.user}
          body={BoardWrite.body}
          image={BoardWrite.image}
        />
      )}
    </div>
  );
};

export default BoardDetail;