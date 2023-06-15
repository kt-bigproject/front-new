import styled from "@emotion/styled"
import { Global, css } from '@emotion/react'
import ImageUpload from "../../src/components/Imageupload/Imageupload";
import axios from "axios";
import { useRef, useState, useEffect } from "react"

import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const Mycanvas = styled.canvas`
  border: 1px solid;
  background-image: url("/grid.png");
`

const Mydiv = styled.div`
  display: flex;
  flex-direction: row;
`

const globalStyles = css`
  @font-face {
    font-family: "one";
    src: url("/fonts/초보.ttf");
  }

  @font-face {
    font-family: "two";
    src: url("/fonts/표준.ttf");
  }

  @font-face {
    font-family: "three";
    src: url("/fonts/숙련.ttf");
  }

  @font-face {
    font-family: "four";
    src: url("/fonts/전문.ttf");
  }

  @font-face {
    font-family: "five";
    src: url("/fonts/예술.ttf");
  }
`
export default function PraticePage() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  
  const [ctx, setCtx] = useState() // 그림지정 state
  const [isDrawing, setIsDrawing] = useState(false) 
  const [eraser, setEraser] = useState("black")

  const [font, setFont] = useState("one") // font지정 state

  const [ sent, setSent ] = useState("")

  const [change, setChange] = useState(false) // 화면 전환 state
  
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

  useEffect(() =>{
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8
    canvas.height = window.innerWidth * 0.43

    const context = canvas.getContext('2d')
    context.lineWidth = 4;
    context.strokeStyle = eraser
    context.lineCap = "round" // 선 끝모양지정 butt, round, square

    // context.font = "bold 100px serif" 폰트 넣을 수 있는 기능인데 보류
    // context.strokeText("Hello world", 50, 100); 글씨 써주는것
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
      ctx.clearRect(0,0, 1000, 1000)
    }

  const onClickEraser = () => {
    setEraser("white")
  }

  const onClickPencil = () => {
    setEraser("black")
  }
  const onClickSubmit = async () => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const ImageURL = canvas.toDataURL(); // base64 타입 데이터로 변환
  
    const response = await fetch(ImageURL);
    const blob = await response.blob();
    const file = new File([blob], "myImage.png", { type: "image/png" });
    console.log(response)
    const formData = new FormData(); // 이미지는 formdata객체를 만들어서 보내줘야 함
    formData.append("font", font);
    formData.append("image", file);
    console.log(blob)
    console.log(file)
  
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
      const response = await axios.post('http://127.0.0.1:8000/practice/upload/', formData, {
          headers: { "Content-Type": "multipart/form-data", }, // 헤더 추가
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

    .3
    }

    useEffect(() => {
      const Fetchsentence = async () => {
        const result = await axios.get('http://127.0.0.1:8000/practice/sentence/')
        const random = Math.floor(Math.random() * result.data['length'])
        // console.log(result.data[1])
        console.log(random)
        console.log("a")
        setSent(result.data[random].sentence)
      }
      Fetchsentence()
    }, [])

    

    const MyDivStyle = {
      fontFamily: font,
      fontSize: 30,
      border: "1px solid",
      textAlign: "center",
    }

  return(
    <>
      <Global styles={globalStyles} />
      <div style={MyDivStyle}>{sent}</div>
      <div style={{}}></div>
      <Dropdown menu={{ items,}}>
        <a onClick={(e) => e.preventDefault()}>
          <Space style={{fontFamily:"one", fontSize:30}}>
            폰트를 선택하세요
          <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <br />
      <Mycanvas ref={canvasRef}
                onMouseDown={startDrawing} // 마우스 버튼을 눌렀을때
                onMouseUp={EndDrawing} // 마우스마우스 버튼을 땠을 때
                onMouseMove={drawing} // 마우스가 움직일 때
                onMouseLeave={EndDrawing} // 마우스가 캔버스를 벗어낫을 때
      ></Mycanvas>
    <Mydiv>
      <button onClick={onClickClear}>삭제하기</button>
      <button onClick={onClickEraser}>지우개</button>
      <button onClick={onClickPencil}>연필</button>
    </Mydiv>
      <button onClick={onClickSubmit}>사진으로 저장(벡엔드로 제출)</button>
    <button onClick={onClickChange}>사진으로 업로드하기</button>
    {change&& <ImageUpload font={font}/>}
    </>
  )
}