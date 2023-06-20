import styled from "@emotion/styled"
import ImageUpload from "../../src/components/Imageupload/Imageupload";
import axios from "axios";
import { useRef, useState, useEffect, useContext } from "react"
import { DeleteOutlined, DownOutlined, HighlightOutlined, ReadOutlined, UndoOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

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

export default function Gamepage(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  
  const [ctx, setCtx] = useState() // 그림지정 state
  const [isDrawing, setIsDrawing] = useState(false) 
  const [eraser, setEraser] = useState("black")

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
        setSent(result.data[random].sentence)
      }
      Fetchsentence()
    }, [])

    

    const MyDivStyle = {
      fontFamily: font,
      fontSize: 30,
      textAlign: "center",
      width: "1200px",

    }

  return(
    <>
    <Alldiv>
      <div style= {{textAlign:"center", marginTop:50}}>
        {/* <img style = {{width: 250, height: 140}} src="/LOGO.png" /> */}
        <ReadOutlined style={{fontSize:100, color:"#fa6400"}}/>
      </div>
      <div style= {{marginTop:20}}>
        <h2>글씨 낙서장</h2>
      </div>
      <div style= {{marginTop:20}}>
        <h3>다양한 서체를 적용하여 글씨체를 연습해보세요 블라블라 글씨체 다르게</h3>
      </div>
      <div>
        <h4>여기에는 더더욱 부차적인 내용이 들어갈거에요 글씨체 다르게</h4>
      </div>
      <Mydiv2 style= {{marginTop:50}}>
          <img style = {{width: 170, height: 170}} src="/left.png" />
          <div style={MyDivStyle}>{sent}</div>
          <img style = {{width: 170, height: 170}} src="/right.png" />
      </Mydiv2>
      <Mydiv3>
      <Dropdown menu={{ items,}}>
        <a onClick={(e) => e.preventDefault()}>
          <Space style={{fontFamily:"one", fontSize:30, marginTop:30}}>
            폰트를 선택하세요
          <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      </Mydiv3>
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
      <MyButton1 size="default" onClick={onClickSubmit}><h4>손글씨 등록하기</h4></MyButton1>
      <MyButton2 onClick={() => setOpen(curr => !curr)}><h4>사진 등록하기</h4></MyButton2>
      <Modal open={open} setOpen={setOpen}>
        <h1 style={{textAlign:"center"}}>서체를 사진으로 찍어 등록 해주세요!</h1>
        <ImageUpload font={font}/>
      </Modal>
      </Mydiv5>
    </Alldiv>
    </>
  )
}