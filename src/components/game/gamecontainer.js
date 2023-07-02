import styled from "@emotion/styled"
import { useRef, useState, useEffect, useContext } from "react"

import { Modal, Upload } from 'antd';
import { DeleteOutlined, HighlightOutlined, LoadingOutlined, PlusOutlined, ReadOutlined, UndoOutlined } from '@ant-design/icons';
import {default as CustomModal} from '@leafygreen-ui/modal';
import Button from "@leafygreen-ui/button"

import AuthContext from "../AuthContext/AuthContext";
import { Mydiv2, Mydiv3, Mydiv4, Mydiv5, MyButton1, MyButton2, ImageDiv, Context, BannerDiv, BannerDiv2, Alldiv2, } from "../../../styles/practice/pracitce"
import { useRouter } from "next/router";
import { useAxios } from "../Axios/axios";
import LayoutHeader from "../../../src/commons/layout/header2/header";

import confetti from "canvas-confetti"


const Mycanvas = styled.canvas`
border: 1px solid;
background-image: url("/main/grid2.png");
background-size: 100%;
background-color: white;
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
  let { count, setCount, user } = useContext(AuthContext)
  const api = useAxios()
  const router = useRouter()

  //canvas state
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const hiddenRef = useRef(null)
  const hiddenContextRef = useRef(null)

  // 폰트 지정 state
  const [font, setFont] = useState("two")
  const [ctx, setCtx] = useState() // 그림지정 state
  const [hiddenCtx, sethiddenCtx] = useState()
  const [isDrawing, setIsDrawing] = useState(false) 
  const [eraser, setEraser] = useState("black")
  const [clear, setClear] = useState("")

  const [open, setOpen] = useState(false);
  const [gameOpen, setgameOpen] = useState(false);

  // 점수관련 state
  const [score, setScore] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState(null)
  const [correct, setCorrect] = useState(null)

  // 사진 미리보기 함수
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

  
  // 업로드 이미지를 서버로 전송하는 함수
  const handleApi = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('font', font)  //서버전달용
    formData.append(`image`, fileList[0].originFileObj)
    // formData.append('sentence', '가') 
    formData.append('sentence', props.sent)
    console.log(fileList[0].originFileObj)

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
            const newid = response?.data.id
            setId(newid)
            Fetchsentence(newid)
        } else {
            console.log('이미지 전송 실패');
            console.log(response.status);
        }
    } catch (event) {
        console.error('이미지 전송 실패', event)
        console.log(formData)
    };
  };

    // 그림 제출하기 함수
  const onClickSubmit = async (event) => {
    //파일명 아무거나로 바꾸기
    const randomNumber = Math.floor(Math.random() * 100000)

    event.preventDefault();
    hiddenRef.current.getContext('2d').fillText("",0,0)
    const canvas = hiddenRef.current;
    const ImageURL = canvas.toDataURL(); // base64 타입 데이터로 변환
  
    const response = await fetch(ImageURL);
    const blob = await response.blob();
    const file = new File([blob], `image${randomNumber}.png`, { type: "image/png" });
    const formData = new FormData(); // 이미지는 formdata객체를 만들어서 보내줘야 함
    formData.append("font", font);
    formData.append("image", file);
    formData.append("sentence", props.sent)
    // formData.append('sentence', '가') 
  
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

    // 모달창 열기
    setIsLoading(true)
    setgameOpen(curr => !curr)
    data: formData
    try {
      const response = await api.post('/game/upload/', formData, {
          headers: { "Content-Type": "multipart/form-data", }, // 헤더 추가
      });
      if (response.status === 201) {
          console.log('이미지 전송 성공', response.data);
          const newid = response?.data.id
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

  useEffect(() =>{
    const canvas = canvasRef.current;
    canvas.width = 1010
    canvas.height = 400

    const hidden = hiddenRef.current;
    hidden.width = 1010
    hidden.height = 400

    const context = canvas.getContext('2d')
    context.lineWidth = 4;
    context.strokeStyle = eraser
    context.lineCap = "round" // 선 끝모양지정 butt, round, square

    contextRef.current = context;
    setCtx(contextRef.current)

    const hiddenContext = hidden.getContext('2d')
    hiddenContext.lineWidth = 5;
    hiddenContext.strokeStyle = eraser
    hiddenContext.lineCap = "round"

    hiddenContextRef.current = hiddenContext;
    sethiddenCtx(hiddenContextRef.current)

    hiddenContext.fillStyle = 'white';
    hiddenContext.fillRect(0, 0, canvas.width, canvas.height);

  }, [clear]);

  useEffect(() => { // 지우개 쓰기 위해서 렌더링
    if (ctx) {
      ctx.strokeStyle = eraser;
      hiddenCtx.strokeStyle = eraser;
    }
  }, [eraser, ctx, hiddenCtx]);

  const startDrawing = ({ nativeEvent }) => { //그리는 함수
    const { offsetX, offsetY } = nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);

    hiddenCtx.beginPath();
    hiddenCtx.moveTo(offsetX, offsetY);

    setIsDrawing(true);
  }
  
  const EndDrawing = () => { // 그리는거 끝내기
    setIsDrawing(false);
  }

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx && hiddenCtx) {
      if (!isDrawing) {
        ctx.beginPath(); // 출발점 초기화
        ctx.moveTo(offsetX, offsetY); // 출발점을 좌표로 옮김
        hiddenCtx.beginPath();
        hiddenCtx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY); // 도착점을 좌표로 옴김
        ctx.stroke() // 그림이 그려짐
        hiddenCtx.lineTo(offsetX, offsetY);
        hiddenCtx.stroke();
      }
    }
  }

  const onClickClear = () => {
      ctx.clearRect(0,0, 10000000, 10000000)
      hiddenCtx.clearRect(0,0, 1000, 1000);
      setClear(clear+1)
    }

  const onClickEraser = () => {
    setEraser("white")
  }

  const onClickPencil = () => {
    setEraser("black")
  }

    // 점수 표출 함수
    const Fetchsentence = async (id) => {
      const result = await api.get('/game/predict/');
      const fetchedScore = result.data.data.find(item => item.id === id).score;
      const corrected = result.data.data.find(item => item.id === id)?.is_correct;
      setCorrect(corrected)
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

    const GoHome2 = () => {
      setCount(1)
      router.push("/")
    }
    


    useEffect(() => {
      const countToWord = (count) => {
        const words = ["one", "two", "three", "four", "five"];
        return words[Math.ceil(count / 3) - 1] || "";
      };
  
      setFont(countToWord(count));
    }, []);

    const bomb = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

    useEffect(() => {
      if(score >= 0.8) {
        bomb();
      }
    }, [score])

    // console.log(correct)
    // console.log(font, "가")
  return(
    <>
    <Alldiv2>
      <BannerDiv>
        <LayoutHeader />
            <BannerDiv2>
                  <ImageDiv>
                    <img width='350' height='370' src='/Practice/pbg.jpg'/>
                  </ImageDiv>
                  <Context>
                    <h1 style={{fontSize: '40px'}}>놀이터</h1>
                    <p>연습한 글씨체를 게임을 통해 직접 적어보세요!</p>
                    <p>단어와 문장을 듣고 발음을 연습할 수 있는 기능도 제공합니다.</p>
                    <p>언어 학습의 재미를 경험해보세요.</p>
                  </Context>
                </BannerDiv2>                     
                      <Mydiv2 style= {{marginTop:50}}>
                          <img style = {{width: 130, height: 130}} src="/left.png" />
                          <div style={MyDivStyle}>{props.sent}</div>
                          <img style = {{width: 130, height: 130}} src="/right.png" />
                      </Mydiv2>
                      <br />
                      <Mydiv3>
                        <div style={{ fontFamily:"one", fontSize:30, margin: '50px 0', backgroundImage:"url('/Practice/line2.png')", backgroundSize:"100% 100%", width: '10em', height:'3em', display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <h2>{count} Stage</h2>
                        </div>
                      </Mydiv3>
                      <Mydiv>
                      <canvas ref={hiddenRef} 
                        onMouseDown={startDrawing} // 마우스 버튼을 눌렀을때
                        onMouseUp={EndDrawing} // 마우스마우스 버튼을 땠을 때
                        onMouseMove={drawing} // 마우스가 움직일 때
                        onMouseLeave={EndDrawing} // 마우스가 캔버스를 벗어낫을 때
                        style={{ display: 'none' }} />
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
                          <MyButton1 size="default" onClick={onClickSubmit} >
                            <span style={{  fontSize: 15 }}>손글씨 등록하기</span></MyButton1>
                          <MyButton2 onClick={() => setOpen(curr => !curr)} >
                            <span >사진 등록하기</span></MyButton2>
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
                      <h1 style={{textAlign:"center"}}>{user?.username}님의 점수는</h1>
                      <div style={{fontSize:"30px", textAlign:"center", height:"300px", display:"flex", flexDirection:"column", justifyContent:"space-evenly"}}>
                      {isLoading ? (
                        <LoadingOutlined />
                      ) : (
                      <>
                      {score >= 0.8 ? (
                        count <= 14 ? (
                        <div style={{height: "250px", display: "flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                        {score*100}점입니다!!<br/><h6>축하합니다!! 통과하셨습니다!</h6>
                        <MyButton1 onClick={props.NextLevel}>다음 단계</MyButton1>
                        </div>
                            ) : (
                              <div style={{height: "250px", display: "flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                              {score*100}점입니다!!<br/><h6>마지막 단계를 통과하셨습니다!</h6>
                              <MyButton1 onClick={GoHome2}>게임 종료</MyButton1>
                              </div>
                            )
                      ) : (
                          <div style={{height: "250px", display: "flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                          <h3>{score*100}점입니다..</h3><br/><p>점수가 기준에 도달하지 못하였습니다</p><p>게임이 종료되었습니다</p><br/>
                          <MyButton1 onClick={GoHome2}>게임 종료</MyButton1>
                          </div>
                      )}
                      </>
                      )}
                        </div>
                    </CustomModal>
                    </Mydiv5>
      </BannerDiv>    
    </Alldiv2>
    </>
  )
}