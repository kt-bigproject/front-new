// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import WritePage from '../../../../pages/BoardWrite/index';

// const BoardDetail = () => {
//   // return (
//   //   <div>
//   //     test
//   //   </div>
//   // )
//   const { id } = useParams(); 
//   const [loading, setLoading] = useState(true);
//   const [BoardWrite, setBoardWrite] = useState({});
//   const getBoard2 = async () => {
//     const resp = await (await axios.get(`http://127.0.0.1:8000/blog/blog/`)).data;
//     setBoardWrite(resp.data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     getBoard2();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <h2>loading...</h2>
//       ) : (
//         <WritePage
//           // id={BoardWrite.id}
//           title={WritePage.title}
//           // created_at={BoardWrite.created_at}
//           // user={BoardWrite.user}
//           body={WritePage.body}
//           image={WritePage.image}
//         />
//       )}
//     </div>
//   );
// };

// export default BoardDetail;

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
