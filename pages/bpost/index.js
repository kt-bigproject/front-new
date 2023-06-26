import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/router';
// import TestFolders from '../Test';

import Pagination from '@mui/material/Pagination';
import styles from './page.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Modal, Box, Typography, TextField, Button, IconButton} from '@mui/material';
import Image from 'next/image';
import ImgModal from './ImgModal';
import { PlusOutlined } from '@ant-design/icons';
import { Margin } from '@mui/icons-material';

const BoardList = () => {
  // const [boardList, setBoardList] = useState([]);
  // const [pageList, setPageList] = useState([]);
  const [boardShow, setBoardshow] = useState([]);

  const [curPage, setCurPage] = useState(1); //현재 페이지 세팅
  // const [prevBlock, setPrevBlock] = useState(0); //이전 페이지 블록
  // const [nextBlock, setNextBlock] = useState(0); //다음 페이지 블록
  // const [lastPage, setLastPage] = useState(0); //마지막 페이지
  const Router = useRouter()

  const [count, setCount] = useState(0);
  // const [search, setSearch] = useState({
  //   page: 1,
  //   sk: '',
  //   sv: '',
  // });


  const getBoardList = async() => {
  //   if (search.page === curPage) return; //현재 페이지와 누른 페이지가 같으면 return

  //   const queryString = Object.entries(search)
  //     .map((e) => e.join('='))
  //     .join('&');

    const resp = await(
      await axios.get('http://127.0.0.1:8000/api/blog/blog/')).data;
      // await axios.get('http://127.0.0.1:8000/blog/blog/' + queryString)).data;
      // console.log(resp)
      const pageSize = 8;
      setCount(Math.ceil(resp.count / pageSize));
      
      // console.log(count)
    }

  
  const getBoard = async () => {    
      const abc = await (await axios.get('http://127.0.0.1:8000/api/blog/blog/?page=' + curPage)).data; // 2) 게시글 목록 데이터에 할당  
      
      setBoardshow(abc.results);    
      
    };
  

  const moveToWrite = () => {
    Router.push('/BoardWrite');
  }
  const moveTofix = () => {
    Router.push('/Test');
  }
  const moveToCheck = (id) => {
    Router.push(`/boardcheck/${id}`)
  }

  
  useEffect(() => {
    getBoardList(); // 1) 게시글 목록 조회 함수 호출
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurPage(newPage);
  };

  useEffect(() => {
    getBoard();
    // console.log(boardShow)
  }, [curPage])
  


  

  const [like, setLike] = useState(new Array(boardShow.length).fill(false));

  const [open, setOpen] = useState(false);

  const [clickFigure, setClickFigure] = useState({});

  const handleOpen = (figureInfo) => {
    setClickFigure(figureInfo);
    setOpen(true);    
    console.log(figureInfo)
  };

  const handleClose = () => {
    setClickFigure({});
    setOpen(false);
  };

  const handleClick = index => {
    const newLike = [...like];
    newLike[index] = !newLike[index];
    setLike(newLike);
  };

  return (
    <div /*style={{backgroundColor: '#ebddcc', width: '1200px', margin: 'auto'}}*/>
      <div >
      <div className={styles.main_page}>
        <div className={styles.main_page_color}>
          {/* 상단 메인 페이지 */}
          <div className={styles.main_box1}>
            {/* test */}
            {/* <img src='upp7.png' style={{width: 500, height: 300}} /> */}
            <img src='board_img.jpg' className={styles.b6} />
          </div>

          <div className={styles.main_box2}>
            <h1 style={{fontFamily: "Kimjungchul", fontSize: 40}}><span className={styles.b4}>자랑</span> 게시판에 어서오세요!</h1>
            <br />
            <div className={styles.write_text}>
              <p style={{fontFamily: "Kimjungchul", fontSize: 25}}>우리는 다양한 글씨체의 매력을 발견하고, 창의적인 디자인을 위한 영감을 얻기 위해 이곳을 만들었습니다. </p>
              <br />
              <p style={{fontFamily: "Kimjungchul", fontSize: 25}}>한 줄의 글에서도 마치 작품처럼 아름다움을 담아보세요. 여기서는 당신의 상상력이 자유로워집니다. 다양한 글씨체를 활용하여 감동적인 메시지를 전달해보세요.</p>
              <br />
              {/* <p>놀라운 글씨체들과 함께 표현력을 높이고, 독특한 스타일을 완성해보세요. 이제 당신의 문장도 작품으로 거듭날 차례입니다!</p> */}
              {/* <br /> */}
              {/* <p style={{fontFamily: "Kimjungchul", fontSize: 25}}>저희 게시판에서는 꾸준히 새로운 글씨체를 업데이트하며, 당신의 참여와 공유를 기다립니다. 함께하는 모든 분들을 위한 특별한 공간으로 이곳에서 만나요!</p> */}
            </div>
          </div>
        </div>
        
      </div>
      {/* <hr /> */}
      <div>
        <div className={styles.content_wrapper}>
          {/* Content_Wrapper */}
          <td className={styles.content_title}>
            {/* 자랑하기 게시판 - Contents_Title */}
            <span className={styles.b4}>자랑</span><hr />해보세요  <img src='pencil.png' width={35} />
            {/* <td> */}
            <div className={styles.b1}>
            <button onClick={moveToWrite} className={styles.b2}><img src='plus.png' className={styles.b3}/></button>
          </div>
            {/* </td> */}
          </td>
          <div className={styles.section}></div>
          {/* <div className={styles.b5}> */}
            <div className={styles.figure_wrapper}>
              <div className={styles.figure_list}>
                {boardShow.map((figureInfo, index) =>
                
                    <div className={styles.card} key={figureInfo.id}>   
                    {/* Photo CARD */}
                    {/* <td> */}
                    
                    {/* </td> */}
                    <div>
                      <Image 
                        className={styles.img_border}                    
                        src={figureInfo.image}
                        width="300"
                        height="300"
                        onClick={() => handleOpen(figureInfo)}
                        alt={figureInfo.id}
                      /> 
                      <IconButton
                        className={styles.IconButton_post}
                        onClick={() => handleClick(index)}>
                        { 
                          like[index] 
                          ? <FavoriteIcon className={styles.heart}/>
                          : <FavoriteBorderIcon className={styles.heart}/>
                        }
                      </IconButton>
                      </div>
                      {/* <div className={styles.text_align}>   */}
                      <div className={styles.text_align2}>
                      Title : {figureInfo.title}             
                      {/* <div className={styles.text_align2}>Title : {figureInfo.title}</div> */}
                      </div>                                   
                     
                      {/* </div>   */}
                    </div>  
                    
                )}
                              
              </div>              
            </div>
            {/* </div> */}
            <ImgModal open={open} onClose={handleClose} figureInfo={clickFigure}/> 
      </div>
      </div>
          
      <div>
          <div className={styles.bottom_style}>
            <Pagination className={styles.pagination_style}
              count={count} 
              page={curPage}
              onChange={handleChangePage}
              showFirstButton 
              showLastButton />
              
          </div>
          
      </div>
        
        
      <div/>
      </div>
    </div>
  );

  };

  export default BoardList;

