import styled from "@emotion/styled"
import ImageUpload from "../../src/components/Imageupload/Imageupload";
import axios from "axios";
import { useRef, useState, useEffect, useContext } from "react"
import { DeleteOutlined, DownOutlined, HighlightOutlined, ReadOutlined, UndoOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import AuthContext from "../../src/components/AuthContext/AuthContext";
import { useAxios } from "../../src/components/Axios/axios";

import Modal from '@leafygreen-ui/modal';
import Button from "@leafygreen-ui/button"
import { Alldiv, Mydiv2, Mydiv3, Mydiv4, Mydiv5, MyButton1, MyButton2 } from "../../styles/practice/pracitce"


const Mycanvas = styled.canvas`
  border: 1px solid;
  background-image: url("/grid.png");
`

const Mydiv = styled.div`
  display: flex;
  flex-direction: row;
`


export default function PraticePage(props) {

  const [inputValue, setInputValue] = useState('쓰고싶은 글을 써주세요.');

  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const hiddenRef = useRef(null)
  const hiddenContextRef = useRef(null)

  const api = useAxios() //axios호출
  const [ctx, setCtx] = useState() // 그림지정 state
  const [hiddenCtx, sethiddenCtx] = useState()

  const [isDrawing, setIsDrawing] = useState(false) 
  const [eraser, setEraser] = useState("black")
  const [clear, setClear] = useState("")

  const [font, setFont] = useState("one") // font지정 state

  const [ sent, setSent ] = useState("")

  const [change, setChange] = useState(false) // 화면 전환 state
  
  const [open, setOpen] = useState(false);

  const onClickChange = () => {
    {change? setChange(false): setChange(true)}
  }
  const onClcikFont1 = () => { // 폰트 설정 함수
    setFont("one")
  }
  const onClcikFont2 = () => {
    setFont("two")
  }
  const onClcikFont3 = () => {
    setFont("three")
  }
  const onClcikFont4 = () => {
    setFont("four")
  }
  const onClcikFont5 = () => {
    setFont("five")
  }

  const items = [ // dropbox옵션
    {
      key: '1',
      label: (
        <div style={{ fontFamily: "one", fontSize:20}} onClick={onClcikFont1} target="_blank" rel="noopener noreferrer">
          초보 - ( 교보 2019 )
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{ fontFamily: "two", fontSize:20}} onClick={onClcikFont2} target="_blank" rel="noopener noreferrer">
          표준 - ( 네이버 클로바 느릿느릿)
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div style={{ fontFamily: "three", fontSize:20}} onClick={onClcikFont3} target="_blank" rel="noopener noreferrer">
          숙련 - ( 조선 궁서체 )
        </div>
      ),
    },
    {
      key: '4',
      label: (
        <div style={{ fontFamily: "four", fontSize:20}} onClick={onClcikFont4} target="_blank" rel="noopener noreferrer">
          전문 - ( 교보 2020박도연)
        </div>
      ),
    },
    {
      key: '5',
      label: (
        <div style={{ fontFamily: "five", fontSize:20}} onClick={onClcikFont5} target="_blank" rel="noopener noreferrer">
          예술 - ( KCC안중근 )
        </div>
      ),
    },
  ]

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() =>{
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.6
    canvas.height = window.innerHeight * 0.43

    const hidden = hiddenRef.current;
    hidden.width = window.innerWidth * 0.6
    hidden.height = window.innerHeight * 0.43

    const context = canvas.getContext('2d')
    context.lineWidth = 5;
    context.strokeStyle = eraser
    context.lineCap = "round" // 선 끝모양지정 butt, round, square

    context.font = `75pt ${font}` //폰트 넣을 수 있는 기능인데 보류
    context.fillStyle = "lightgray";
    context.fillText(inputValue, 50, 150)
    contextRef.current = context;
    setCtx(contextRef.current)

    const hiddenContext = hidden.getContext('2d')
    hiddenContext.lineWidth = 5;
    hiddenContext.strokeStyle = eraser
    hiddenContext.lineCap = "round" // 선 끝모양지정 butt, round, square

    // hiddenContext.font = "100pt bold gray" //폰트 넣을 수 있는 기능인데 보류
    // hiddenContext.fillStyle = "lightgray";
    // hiddenContext.fillText(sent, 50, 150)
    hiddenContextRef.current = hiddenContext;
    sethiddenCtx(hiddenContextRef.current)
  }, [clear, inputValue, font, change]);

  useEffect(() => { // 지우개 쓰기 위해서 렌더링
    if (ctx && hiddenCtx) {
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
      ctx.clearRect(0,0, 1000, 1000)
      hiddenCtx.clearRect(0,0, 1000, 1000);
      setClear(clear+1)
    }

  const onClickEraser = () => {
    setEraser("white")
  }

  const onClickPencil = () => {
    setEraser("black")
  }
  const onClickSubmit = async (event) => {
    event.preventDefault();
    hiddenRef.current.getContext('2d').fillText("",0,0)
    const canvas = hiddenRef.current;
    const ImageURL = canvas.toDataURL(); // base64 타입 데이터로 변환
  
    const response = await fetch(ImageURL);
    const blob = await response.blob();
    const file = new File([blob], "myImage.png", { type: "image/png" });
    const formData = new FormData(); // 이미지는 formdata객체를 만들어서 보내줘야 함
    formData.append("font", font);
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

    try {
      const response = await api.post('/practice/upload/', formData, {
          headers: { "Content-Type": "multipart/form-data", },
      });
      if (response.status === 201) {
          console.log('이미지 전송 성공', response.data);
      } else {
          console.log('이미지 전송 실패')
          console.log(response.status);
      }
    } catch (event) {
        console.error('이미지 전송 실패', event)
        console.log(response)
    };

    
    }

    useEffect(() => {
      const Fetchsentence = async () => {
        const result = await api.get('/practice/sentence/')
        const random = Math.floor(Math.random() * result.data['length'])
        // console.log(result.data[1])
        setSent(result.data[random].sentence)
      }
      Fetchsentence()
    }, [])

    

    const MyDivStyle = {
      fontFamily: font,
      fontSize: 30,
      textAlign: "center",
      width: "1200px",
      borderRadius: "10px", 
      width: 800, 
      height: 50, 
      textAlign: "center", 
      fontSize: 28, 
      border: "2px solid gray"

    }

  return(
    <>
    <Alldiv style={{ margin: 0, display: "block"}}>
      <div className="updiv" style={{ backgroundColor: "#faf0e6", width: "100%", 
                          margin: 0, height: 570, display: "flex", flexDirection: "row", justifyContent: "center"}}>
        {/* <div style= {{textAlign:"center"}}> */}
          {/* <img style = {{width: 250, height: 140}} src="/LOGO.png" /> */}
            
          {/* </div> */}
            <div className="lefdiv" style={{ display: "flex", flexDirection: "row", justifyContent: "center", 
                            alignItems: "center"}}>
                 <div className="imgdiv" style={{ position: "relative"}}>            
                    <img style = {{width: 480, height: 500, transform: "rotate(-7deg)"}} src="/upp7.png" />   
                    <img style = {{width: 300, height: 310, 
                                  position: "absolute", top: 95, left: 97, transform: "rotate(-7deg)" }} src="/ipp2.png" />     



                  </div> 
            </div>
            {/* <contdiv style={{ display: "flex", flexDirection: "column", 
                              alignItems: "center", justifyContent: "center", 
                              backgroundColor: "skyblue", marginTop: 0}}> */}
              <div className="rigdiv" style= {{ display: "flex", flexDirection: "column", justifyContent: "center", 
                                alignItems: "center", gap: 50}}>         
                {/* <ReadOutlined style={{fontSize:100, color:"#fa6400"}}/>              */}
                <h2 style={{ fontSize:80, color: "#fa6400", fontFamily: "Kimjungchul" }}>『글씨 낙서장』</h2>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
                  <div style={{ display: "flex", flexDirection: "column", 
                                justifyContent: "center", gap: 20}}>
                    <h3 style={{ fontSize:30, fontFamily: "Kimjungchul" }}>다양한 서체를 적용하여 글씨체를 연습해보세요</h3>
                    <h4 style={{ fontSize:25, fontFamily: "Kimjungchul" }}>손글씨를 연습하고 싶은 분들을 위한 특별한 공간입니다.</h4>
                    <h5 style={{ fontSize:25, fontFamily: "Kimjungchul" }}>손글씨의 아름다움과 창의성을 함께 향상시킬 수 있는 공간, 손글씨 낙서장입니다.</h5>
                  </div>
                </div>
              </div>
          </div>
          <div className="downdiv" style={{ backgroundImage: "url('/wrap2.jpg')", display: "flex", flexDirection: "column", 
                            alignItems: "center", justifyContent: "center", 
                            width: "100%", marginBottom: 0}}>
              <Mydiv2 style= {{marginTop:50}}>
                  <img style = {{width: 130, height: 130}} src="/left.png" />
                  {/* <div style={MyDivStyle}>{sent}</div> */}
                  <input type="text" style={MyDivStyle} value={inputValue} onChange={handleInputChange}/>
                  <img style = {{width: 130, height: 130}} src="/right.png" />
              </Mydiv2>
              <Mydiv3>
              <Dropdown menu={{ items,}}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space style={{ fontFamily:"one", fontSize:30, marginTop:30}}>
                    <span style={{ fontFamily: "Kimjungchul" }}>폰트를 선택하세요</span>
                  <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              </Mydiv3>
              <br />
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
               <div className="butdiv" style={{ display: "flex", flexDirection: "row", 
                                alignItems: "center", justifyContent: "center", 
                                gap: 50}}>
                <MyButton1 size="default" onClick={onClickSubmit} style={{ backgroundColor: "#fa6400", 
                                                                          width: 140, height: 40, fontSize: 15, marginBottom: 40}}>
                    <span style={{ fontFamily: "Kimjungchul" }}>손글씨 등록하기</span></MyButton1>
                <MyButton2 onClick={() => setOpen(curr => !curr)} style={{ width: 140, height: 40, fontSize: 17, marginBottom: 40}}>
                  <span style={{ fontFamily: "Kimjungchul" }}>사진 등록하기</span></MyButton2>
              </div>  
              <Modal open={open} setOpen={setOpen}>
                 
            <h1 style={{textAlign:"center"}}>서체를 사진으로 찍어 등록 해주세요!</h1>
            <ImageUpload font={font}/>
          </Modal>
          </Mydiv5>
          {/* </contdiv>  */}
        </div>
        </Alldiv>
    </>
  )
}