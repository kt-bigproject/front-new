import styled from "@emotion/styled"
import axios from "axios";
import { useRef, useState, useEffect, useContext } from "react"

import { Modal, Upload } from 'antd';
import { DeleteOutlined, HighlightOutlined, LoadingOutlined, PlusOutlined, ReadOutlined, UndoOutlined } from '@ant-design/icons';
import {default as CustomModal} from '@leafygreen-ui/modal';
import Button from "@leafygreen-ui/button"

import AuthContext from "../AuthContext/AuthContext";
import { Alldiv, Mydiv2, Mydiv3, Mydiv4, Mydiv5, MyButton1, MyButton2 } from "../../../styles/practice/pracitce"
import { useRouter } from "next/router";
import { useAxios } from "../Axios/axios";


const Mycanvas = styled.canvas`
border: 1px solid;
background-image: url("/grid.png");
`

const Mydiv = styled.div`
display: flex;
flex-direction: row;
`
const ImgUploadContainer = styled.div`
margin-top:50px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items:center;
text-align: center;
`

const getBase64 = (file) =>
new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export default function Gamepage(props) {
  let { count, setCount } = useContext(AuthContext)
  const api = useAxios()
  const router = useRouter()
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  // 폰트 지정 state
  const [font, setFont] = useState("one")
  const [ctx, setCtx] = useState() // 그림지정 state
  const [isDrawing, setIsDrawing] = useState(false) 
  const [eraser, setEraser] = useState("black")

  
  const [open, setOpen] = useState(false);
  const [gameOpen, setgameOpen] = useState(false);

  const [score, setScore] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState(null)

  // 사진 등록하기 함수
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
      <div>
          <PlusOutlined />
          <div style={{marginTop: 8}}>Upload</div>
      </div>
  );

  
    // 이미지를 서버로 전송하는 함수2

  const handleApi = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('font', "one")  //서버전달용
    formData.append(`image`, fileList[0].originFileObj) 
    // FormData의 key 확인
    setIsLoading(true)
    setgameOpen(curr => !curr)
    data: formData
    try {
        const response = await api.post('/game/upload/', formData, {
            headers: { "Content-Type": "multipart/form-data", }, // 헤더 추가
        });
        if (response.status === 201) {
            console.log('이미지 전송 성공', response.data);
            const newid = response.data.id - 16
            setId(newid)
            Fetchsentence(newid)
        } else {
            console.log('이미지 전송 실패');
            console.log(response.status);
        }
    } catch (event) {
        console.error('이미지 전송 실패', event)
        console.log(formData)
    };};

  useEffect(() =>{
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.6
    canvas.height = window.innerHeight * 0.43

    const context = canvas.getContext('2d')
    context.lineWidth = 4;
    context.strokeStyle = eraser
    context.lineCap = "round" // 선 끝모양지정 butt, round, square

    // context.font = "bold 100px serif" //폰트 넣을 수 있는 기능인데 보류
    // context.strokeText("Hello world", 50, 100); //글씨 써주는것
    contextRef.current = context;
    setCtx(contextRef.current)
  }, []);

  useEffect(() => { // 지우개 쓰기 위해서 렌더링
    if (ctx) {
      ctx.strokeStyle = eraser;
    }
  }, [eraser, ctx]);

  const startDrawing = ({ nativeEvent }) => { //그리는 함수
    const { offsetX, offsetY } = nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }
  
  const EndDrawing = () => { // 그리는거 끝내기
    setIsDrawing(false);
  }

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath(); // 출발점 초기화
        ctx.moveTo(offsetX, offsetY); // 출발점을 좌표로 옮김
      } else {
        ctx.lineTo(offsetX, offsetY); // 도착점을 좌표로 옴김
        ctx.stroke() // 그림이 그려짐
      }
    }
  }

  const onClickClear = () => {
      ctx.clearRect(0,0, 10000000, 10000000)
    }

  const onClickEraser = () => {
    setEraser("white")
  }

  const onClickPencil = () => {
    setEraser("black")
  }
  // 파일전송함수 1
  const onClickSubmit = async (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const ImageURL = canvas.toDataURL(); // base64 타입 데이터로 변환
  
    const response = await fetch(ImageURL);
    const blob = await response.blob();
    const file = new File([blob], "myImage.png", { type: "image/png" });
    const formData = new FormData(); // 이미지는 formdata객체를 만들어서 보내줘야 함
    formData.append("font", "one");
    formData.append("image", file);
  
    console.log("******************************")
    // FormData의 key 확인
    for (let key of formData.keys()) {
        console.log("formData key");
        console.log(key);
    }

    // FormData의 value 확인
    for (let value of formData.values()) {
        console.log("formData values");
        console.log(value);
    }
    setIsLoading(true)
    setgameOpen(curr => !curr)
    try {
      const response = await api.post('/game/upload/', formData, {
          headers: { "Content-Type": "multipart/form-data", }, // 헤더 추가
      });
      if (response.status === 201) {
          console.log('이미지 전송 성공', response.data);
          const newid = response.data.id - 16
          setId(newid)
          Fetchsentence(newid)
      } else {
          console.log('이미지 전송 실패')
          console.log(response.status);
      }
    } catch (event) {
        console.error('이미지 전송 실패', event)
        console.log(response)
    };
    }

    // 점수 표출 함수
    const Fetchsentence = async (id) => {
      const result = await api.get('/game/predict/');
      const fetchedScore = result.data.data.find(item => item.id === id)?.score;
      console.log(result);
      console.log("id", id);
      console.log("score", fetchedScore);
      setScore(fetchedScore);
      setIsLoading(false);
    };
    
    const MyDivStyle = {
      fontFamily: font,
      fontSize: 30,
      textAlign: "center",
      width: "1200px",
    };

    const GoHome = () => {
      router.push("/")
    }

    const GoHome2 = () => {
      setCount(1)
      router.push("/")
    }


    console.log(count)

    useEffect(() => {
      const countToWord = (count) => {
        const words = ["one", "two", "three", "four", "five"];
        return words[Math.ceil(count / 3) - 1] || "";
      };
  
      setFont(countToWord(count));
    }, []);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };




  return(
    <>
    <Alldiv style={{ margin: 0, display: "block"}}>
        <div className="up2div" style={{ display: "flex", flexDirection: "row", 
                                        justifyContent: "center", backgroundImage: "url('/wrap6.jpg')", 
                                        width: "100%", margin: 0, height: 570}}>
                 <div className="lef2div" style={{ display: "flex", flexDirection: "row", justifyContent: "center", 
                                                  alignItems: "center"}}>
                  <div className="imgdiv" style={{ position: "relative"}}>            
                    <img style = {{width: 520, height: 520, transform: "rotate(6deg)"}} src="/gamei3.png" />   
                    <img style = {{width: 270, height: 320, position: "absolute", top: 100, left: 125,
                                    transform: "rotate(5deg)"}} src="/gamei1.png" />     



                  </div>                                                    
          <div style= {{textAlign:"center", marginTop:30}}>
            {/* <img style = {{width: 250, height: 140}} src="/LOGO.png" /> */}
            {/* <ReadOutlined style={{fontSize:100, color:"#fa6400"}}/> */}
          </div>

                  </div>  
                  <div className="rig2div" style={{ display: "flex", flexDirection: "column", 
                                alignItems: "center", justifyContent: "center", gap: 30}}>
                        <div vstyle= {{marginTop:10}}>
                          <h2 style={{ fontSize:80, color: "#fa6400", 
                                      fontFamily: "Kimjungchul"}}>『글씨 놀이터』</h2>
                        </div>
                          <h3 style={{ fontSize:25, fontFamily: "Kimjungchul" }} >연습한 글씨체를 게임을 통해 직접 적어보세요!</h3>
                        <div className="text" style={{ display: "flex", flexDirection: "column", 
                                                      alignItems: "center", justifyContent: "center", gap: 25}}>
                          <h4 style={{ fontSize:25, fontFamily: "Kimjungchul" }} >단어와 문장을 듣고 발음을 연습할 수 있는 기능도 제공합니다. </h4>
                            <h5 style={{ fontSize:25, fontFamily: "Kimjungchul" }} >언어 학습의 재미를 경험해보세요. </h5>
                            <button onClick={props.NextLevel} 
                                    style={{ fontFamily: "Kimjungchul", color: "white", 
                                              backgroundColor: "#fa6400", border: "white", cursor: "pointer",
                                              width: 120, height: 50, fontSize: 40, 
                                              borderTopLeftRadius: "80px",
                                              borderTopRightRadius: "100px",
                                              borderBottomLeftRadius: "100px",
                                              borderBottomRightRadius: "100px",
                                              transform: isHovered ? "scale(1.1)" : "none",
                                              transition: "transform 0.3s ease",
                                              marginTop: 20, textAlign: "center"}}
                                              onMouseEnter={handleMouseEnter}
                                              onMouseLeave={handleMouseLeave}>start</button>                           
                        </div>
                          {/* <img style = {{width: 190, height: 120}} src="/g2.gif"/>  */}
                      </div>
                    </div>  
          <div className="down2div" style={{ display: "flex", flexDirection: "column", 
                                              alignItems: "center", justifySelf: "center", 
                                              backgroundImage: "url('/gamed6.jpg')", width: "100%" }}>
            <Mydiv2 style= {{marginTop:50}}>
                <img style = {{width: 130, height: 130}} src="/left.png" />
                <div style={MyDivStyle}>{props.sent}</div>
                <img style = {{width: 130, height: 130}} src="/right.png" />
            </Mydiv2>
            <br />
            <Mydiv>
            <Mycanvas ref={canvasRef}
                      onMouseDown={startDrawing} // 마우스 버튼을 눌렀을때
                      onMouseUp={EndDrawing} // 마우스마우스 버튼을 땠을 때
                      onMouseMove={drawing} // 마우스가 움직일 때
                      onMouseLeave={EndDrawing} // 마우스가 캔버스를 벗어낫을 때
            ></Mycanvas>
            <Mydiv4>
              <Button type="text" onClick={onClickClear}><DeleteOutlined /></Button>
              <Button type="text" onClick={onClickEraser}><UndoOutlined /></Button>
              <Button type="text" onClick={onClickPencil}><HighlightOutlined /></Button>
            </Mydiv4>
          </Mydiv>
            <Mydiv5>
                <div className="butdiv2" style={{ display: "flex", flexDirection: "row", 
                                alignItems: "center", justifyContent: "center", 
                                gap: 50}}>
                  <MyButton1 size="default" onClick={onClickSubmit} style={{ backgroundColor: "#fa6400", 
                                                                          width: 140, height: 40, marginBottom: 40}}>
                    <span style={{ fontFamily: "Kimjungchul", fontSize: 15 }}>손글씨 등록하기</span></MyButton1>
                  <MyButton2 onClick={() => setOpen(curr => !curr)} style={{ width: 140, height: 40, fontSize: 17, marginBottom: 40 }}>
                    <span style={{ fontFamily: "Kimjungchul" }}>사진 등록하기</span></MyButton2>
                </div>  
            <CustomModal open={open} setOpen={setOpen}>
              <h1 style={{textAlign:"center"}}>서체를 사진으로 찍어 등록 해주세요!</h1>
              <ImgUploadContainer>
                <h2>사진을 업로드 하세요</h2>
                <br />
                <Upload
                    action="http://localhost:3000/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
                <br />
                {/*서버 제출 버튼*/}
                <Button variant="primary" id='submit-btn' type='submit' onClick={handleApi}>Submit</Button>
              </ImgUploadContainer >
            </CustomModal>
            <CustomModal open={gameOpen} setOpen={setgameOpen}>
              <h1 style={{textAlign:"center"}}>당신의 점수는!</h1>
              <div style={{fontSize:"30px", textAlign:"center", height:"300px", display:"flex", flexDirection:"column", justifyContent:"space-evenly"}}>
              {isLoading ? (
                <LoadingOutlined />
              ) : (
              <>
              {score >= 0.8 ? (
                count <= 14 ? (
                <div style={{height: "250px", display: "flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                <h3>축하합니다</h3>{score*100}점입니다!!<br />
                <MyButton1 onClick={props.NextLevel}>다음 단계</MyButton1>
                </div>
                    ) : (
                      <div style={{height: "250px", display: "flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                      <h3>축하합니다</h3>{score*100}점입니다!!<br/><h6>게임이 종료되었습니다</h6>
                      <MyButton1 onClick={GoHome2}>게임 종료</MyButton1>
                      </div>
                    )
                ) : (
                  <div style={{height: "250px", display: "flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                  <h3>점수가 기준에 도달하지 못하였습니다</h3>{score*100}점입니다..<br/><h6>게임이 종료되었습니다</h6>
                  <MyButton1 onClick={GoHome2}>게임 종료</MyButton1>
                  </div>
              )}
        </>
      )}
                </div>
            </CustomModal>
            </Mydiv5>
            </div>  
    </Alldiv>
    </>
  )
}