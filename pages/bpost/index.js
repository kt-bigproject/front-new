import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/router';
import { useAxios } from '/src/components/Axios/axios';
import { styled  } from '@material-ui/styles';
import AuthContext from '/src/components/AuthContext/AuthContext';
import styles from '/src/components/bpost/home.module.css';
import Image from 'next/image';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';

import LayoutHeader from '/src/commons/layout/header2/header';
import ImgModal from '/src/components/bpost/ImgModal';
import WriteModal from '../../src/components/bpost/WriteModal';

// import { RoughNotation } from 'react-rough-notation';


const CustomPagination = styled(Pagination)({
  '& button[type="button"]': {
    fontFamily: 'inherit',
  },
});

export default function Home() {

  const router = useRouter()
  const { user, logoutUser } = useContext(AuthContext);

  // console.log(user)
  
  const api = useAxios()
  const [blog, setBlog] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [writeOpen, setWriteOpen] = useState(false);
  const [clickFigure, setClickFigure] = useState({});

  // const [isHovered, setIsHovered] = useState(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const baseURL = 'http://127.0.0.1:8000/api';

  useEffect(() => {
    axios.get( baseURL + '/blog/blog/')
      .then(response => {
        const pageSize = 8;
        setCount(Math.ceil(response.data.count / pageSize));
      })
    }, []);

  useEffect(() => {
    axios.get( baseURL + '/blog/blog/?page='+page)
      .then(response => {
        setBlog(response.data.results);
      })
      .catch(error => console.error(error));
  }, [page]);

  if (blog === null) {
    return <div>Loading</div>;
  }
  

  const handleOpen = async (figureInfo) => {
    if (!user) {
      router.push('/login');
    } else {
      try {
        const response = await api.post('/blog/blog/' + figureInfo.id + '/increase_views/');

        const likeResponse = await api.get(`/blog/blog/${figureInfo.id}/is_liked/`); 
        const isLiked = likeResponse.data.is_liked;

        setClickFigure({...figureInfo, isLiked});
        setOpen(true);    
        // console.log(response, likeResponse, isLiked)
      } catch (error) {
        console.error(error);
      }
    };
  };

  const handleClose = async () => {
    setClickFigure({});
    setOpen(false);

    const response = await api.get('/blog/blog/' + clickFigure.id);
    const updatedFigureInfo = response.data;

    setBlog(blog.map(figureInfo => 
      figureInfo.id === updatedFigureInfo.id ? updatedFigureInfo : figureInfo
    ));
  };

  const handleWriteOpen = () => {
    if (!user) {
      router.push('/login');
    } else {
      setWriteOpen(true);    
    }
  };

  const handleWriteClose = () => {
    setWriteOpen(false);
  };

  // console.log(blog)
  return (
    <>
    <div style={{backgroundImage: "url('/Practice/bpost.png')", backgroundSize:'100% 100%' }}>
      <LayoutHeader/>
      <div style={{ width: '1010px', margin: 'auto'}}>    

        
      <div className={styles.headerContainer}>
        <div className={styles.pageHeader}>        
          <div className={styles.headerPostit}>
            
          <Image src='/bpost_svg.svg' width={1010} height={410} priority/>
          <p className={styles.postitP1} style={{fontSize:'35px'}}>자랑하기 게시판입니다.</p>
          <p className={styles.postitP2} style={{fontSize:'20px'}}>열심히 연습한 글씨를 공유하고 자랑하는 공간입니다.</p>
          <p className={styles.postitP3} style={{fontSize:'20px'}}>좋아요를 받고 댓글로 칭찬을 남겨주세요.</p>
          <p className={styles.postitP4} style={{fontSize:'20px'}}>아래의 버튼을 눌러 글을 쓸 수 있습니다.</p>
          <div className={styles.writeBox} onClick={handleWriteOpen}><span className={styles.innerText}>자랑글쓰기</span></div>
            {/* <Image 
              src="/good.png"             
              width={80} 
              height={80} 
              onClick={handleWriteOpen}            
            /> */}
          {/* <div style={{ position: 'relative', display: 'inline-block' }}>
            <RoughNotation 
              type="circle" 
              show={isHovered}
              color="red"
              strokeWidth={5} 
              animationDuration={800}
              padding={10}         
            >
            <Image 
              src="/good.png"             
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              width={80} 
              height={80} 
              onClick={handleWriteOpen}            
            />  
            </RoughNotation>
          </div>           */}
            {/* <Image src="/qpost_postit.svg" width={600} height={400}/>          
            <p className={styles.postitP1} style={{fontSize:'45px'}}>문의하기 게시판입니다.</p>
            <p className={styles.postitP2} style={{fontSize:'20px'}}>누군가의 예쁜 손글씨를 소유하고 싶지 않으신가요?</p>
            <p className={styles.postitP3} style={{fontSize:'20px'}}>본인 혹은 좋아하는 사람의 손글씨를 폰트로 바꿔드립니다.</p>
            <p className={styles.postitP4} style={{fontSize:'20px'}}>아래의 템플릿을 완성하여 문의해주세요!</p>
            <div className={styles.headerTemplate}>
              <Image src="/qpost_template.svg" width={80} height={100}/>            
            </div>
            <div className={styles.headerDeco}>
              <Image src="/qpost_deco.svg" width={460} height={310}/>    
            </div>
          </div>
          <div className={styles.headerFig}>
            <Image src="/qpost_fig.png" width={350} height={350}/> */}
          </div>
        </div>
      </div>    

      <WriteModal open={writeOpen} onClose={handleWriteClose}/> 
      <div className={styles.figureWrapper}>
          {blog.map((figureInfo, index) =>
          <div className={styles.figureItem} key={figureInfo.id} >
          
            <div style={{ 
              position: 'relative', 
              width: '245px',
              height: '245px',
            }}>
              <div style={{ transform: 'scale(0.97)', position: 'relative', width: '100%', height: '100%' }}>
                  <Image 
                      layout="fill"
                      // objectFit="cover"
                      src={figureInfo.image}
                      // onClick={() => handleOpen(figureInfo)}
                      alt={figureInfo.id}
                  />
              </div>
              <Image               
                layout="fill"
                objectFit="contain"
                src="/bpost_frame.svg" 
                onClick={() => handleOpen(figureInfo)}
              />  
            </div>
          
            <div className={styles.infoWrapper}>
              <span className={styles.figureTitle}>{figureInfo.title}</span>
              <div className={styles.infoText}>
                <FavoriteIcon sx={{ fontSize: 15, margin: '0px 2px 0px 2px', color: '#F24822'}} color="action"/>{figureInfo.num_likes}
                <ChatBubbleIcon sx={{ fontSize: 15, margin: '0px 2px 0px 2px', color: '#F24822'}} color="action"/>{figureInfo.num_comments}
                <VisibilityIcon sx={{ fontSize: 15, margin: '0px 2px 0px 2px', color: '#F24822'}} color="action"/>{figureInfo.views}
              </div>
            </div>
          </div>
          )}
    </div>

    <ImgModal open={open} onClose={handleClose} figureInfo={clickFigure}/> 

    <div className={styles.pagination}>
      <CustomPagination 
        count={count} 
        page={page}
        onChange={handleChangePage}
        showFirstButton 
        showLastButton />
      </div>
    </div>
  </div>
  </>
  )
};

