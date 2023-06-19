import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useParams } from 'react-router-dom';

// 확인할 것 : id, title, created_at->날짜, user, body->내용
const Check = () => {
    const [checkList, setCheckList] = useState([]);

    const checkBoard = async () => {
        const abcd = await (await axios.get('http://127.0.0.1:8000/blog/blog/')).data;
        setCheckList(abcd);
        
        const id = 1;
        const filterList = abcd.filter(board => board.id === id);
        console.log(filterList);
    }
    useEffect(() => {
        checkBoard();
      }, [])
    
      const {id} = useParams();
      console.log(useParams());

        return (
            <table>
                <tbody>
                    {checkList.map(board => (
                        <tr key={board.id}>
                            <td>{board.user}</td>
                            <td>{board.title}</td>
                            <td>{board.body}</td>
                            <td>{board.image}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
        
}

export default Check;