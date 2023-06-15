import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from '../components/Board';

const BoardDetail = () => {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  const getBoard = async () => {
    const resp = await (await axios.get(`http://127.0.0.1:8000/blog/blog/?format=json${idx}`)).data;
    setBoard(resp.data);
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
          id={board.id}
          title={board.title}
          created_at={board.created_at}
          user={board.user}
          body={board.body}
          image={board.image}
        />
      )}
    </div>
  );
};

export default BoardDetail;