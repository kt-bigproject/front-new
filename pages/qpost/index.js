import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import CreateTable from './CreateTable'; 
import CustomTable from '../../src/components/Qpost/CustomTable'; 
import Pagination from '@mui/material/Pagination';
import AuthContext from "../../src/components/AuthContext/AuthContext";
import { TableSkeleton } from '@leafygreen-ui/skeleton-loader';
// import Button from '@leafygreen-ui/button';
import Image from 'next/image';
// import { Syllabus, Heart } from '@codecademy/gamut-illustrations';
// import { RainLoose, DiagonalBRegular, RainRegular } from "@codecademy/gamut-patterns";
import styles from '../../src/components/Qpost/home.module.css';
import { styled  } from '@material-ui/styles';
// import Icon from '@leafygreen-ui/icon';
// import Annotation from '/src/components/Qpost/Annotation';

// const SomeComponent = () => <Icon glyph="Plus" fill="#FF0000" />;

const CustomPagination = styled(Pagination)({
  '& button[type="button"]': {
    fontFamily: 'inherit',
  },
});

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
        const pageSize = 10;
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

  const downloadTemplate = () => {
    const fileURL = "/210_template.pdf";
    window.open(fileURL, "_blank");
}

  return (
    <div style={{ width: '1100px', margin: 'auto' }}>    

      
      <div className={styles.headerContainer}>
        <div className={styles.pageHeader}>        
        <div className={styles.headerPostit}>
          <Image src="/qpost_svg.svg" width={1010} height={410}/>          
          <p className={styles.postitP1} style={{fontSize:'45px'}}>문의하기 게시판입니다.</p>
          <p className={styles.postitP2} style={{fontSize:'20px'}}>누군가의 예쁜 손글씨를 소유하고 싶지 않으신가요?</p>
          <p className={styles.postitP3} style={{fontSize:'20px'}}>본인 혹은 좋아하는 사람의 손글씨를 폰트로 바꿔드립니다.</p>
          <p className={styles.postitP4} style={{fontSize:'20px'}}>아래의 템플릿을 완성하여 문의해주세요!</p>
          <div className={styles.templateBox} onClick={downloadTemplate}/>
        </div>
        </div>
      </div>

      <CustomTable data={blog}/>
      <div className={styles.pagination}>
        <CustomPagination 
          count={count} 
          page={page}
          onChange={handleChangePage}
          showFirstButton 
          showLastButton />
      </div>
    </div>

  )
}