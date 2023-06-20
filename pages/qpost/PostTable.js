'use client'

import Link from "next/link";
import { useRouter } from 'next/router';
// import { useRouter } from "next/navigation"
import {
  Table,
  TableHead,
  HeaderRow,
  TableBody,
  Row,
  Cell,
  HeaderCell,
  useLeafyGreenTable,
} from '@leafygreen-ui/table';
// import { useMemo } from "react";


export default function PostTable({blog}){

  // useEffect(()=>{

  //   서버에 부탁해서 DB게시물 가져옴
  //   result = DB게시물

  // },[])

  const router = useRouter()

  // console.log(blog)

  const data = Object.values(blog).map(({ body, ...rest }) => rest);

  console.log(data)

  const columns = Object.keys(data[0]);
  console.log(columns)

  return (
    <div>
      <button onClick={()=> router.push('/qpost/write')}>글쓰기</button>

      {/* { 
        blog.map(function(a,i) {
          return ( 
            <div className="list-item" key={i}>
              <Link href={`qpost/${blog[i].id}`}>
                <span>{blog[i].title}</span>
              </Link>

            </div>
          )
        })
      } */}

      <Table shouldAlternateRowColor={true} baseFontSize={16}>
        <TableHead>
          <HeaderRow>
            {columns.map((columnname, i) => (
              <HeaderCell key={i} columnname={columnname} />
            ))}
          </HeaderRow>
        </TableHead>
        <TableBody>
          {
             data.slice().reverse().map((row, i) => (
              <Row key={i}>
                {Object.keys(row).map((cellKey, index) => {
                  return <Cell key={`${cellKey}-${index}`}>{row[cellKey]}</Cell>;
                })}
              </Row>
            ))
          }
        </TableBody>
      </Table> 
    </div>
  )
}

// { 
//   blog.map(function(a,i) {
//     return ( 
//       <div className="list-item" key={i}>
//         <Link href={`/${blog[i]._id}`}>
//           {/* <span>{blog[i]._id}</span> */}
//           <span>{blog[i].title}</span>
//         </Link>

//       </div>
//     )
//   })
// }