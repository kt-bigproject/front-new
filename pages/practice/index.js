import styled from "@emotion/styled";
import { useRef, useState, useEffect, useContext } from "react"
import AuthContext from "../../src/components/AuthContext/AuthContext";

import { Modal, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined, LoadingOutlined, DownOutlined, HighlightOutlined, ReadOutlined, SolutionOutlined, UndoOutlined } from '@ant-design/icons';
import {default as CustomModal} from '@leafygreen-ui/modal';
import { Dropdown, Space } from 'antd';
import Button from "@leafygreen-ui/button"

import { Mydiv, Alldiv, Mydiv2, Mydiv3, Mydiv4, Mydiv5, MyButton1, MyButton2, BannerDiv, BannerDiv2, ImageDiv, Function, Context } from "../../styles/practice/pracitce"
import { useRouter } from "next/router";
import { useAxios } from "../../src/components/Axios/axios";
import LayoutHeader from "../../src/commons/layout/header2/header";

import confetti from "canvas-confetti"


const Mycanvas = styled.canvas`
  border: 1px solid;
  background-image: url("/main/grid2.png");
  background-size: 100%;
  background-color: white;
`
const Mydivv = styled.div`
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

export default function PraticePage() {
  // 기능
  const api = useAxios()
  const router = useRouter()
  const { user } = useContext(AuthContext)

  // canvas state
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const hiddenRef = useRef(null)
  const hiddenContextRef = useRef(null)

  // 그림지정 state
  const [ctx, setCtx] = useState() 
  const [hiddenCtx, sethiddenCtx] = useState()
  const [isDrawing, setIsDrawing] = useState(false) 
  const [eraser, setEraser] = useState("black")
  const [clear, setClear] = useState("")

  // font지정 state
  const [font, setFont] = useState("one") 
  const [fontsent, setFontsent] = useState("폰트를 선택하세요")
  
  // 문장지정 state
  const [ sent, setSent ] = useState("")
  const [open, setOpen] = useState(false);
  const [gameOpen, setgameOpen] = useState(false);

  // 점수 state
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState(null)

  // 다시하기 함수
  const GoHome = () => {
    router.reload()
  }

  // 더블클릭 방지
  const variable = useRef({
    isDoubleClick: false
  })

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
    if (variable.current.isDoubleClick) {
      return;
    }
    variable.current.isDoubleClick = true;
    if (!user) {
      alert("로그인 후 이용해주세요.")
      router.push('/')
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append('font', font)  //서버전달용
      formData.append(`image`, fileList[0].originFileObj) 
      formData.append('sentence', sent)
      // FormData의 key 확인
      setIsLoading(true)
      setgameOpen(curr => !curr)
      data: formData
      try {
          const response = await api.post('/practice/upload/', formData, {
              headers: { "Content-Type": "multipart/form-data", }, // 헤더 추가
          }).finally(() => { variable.current.isDoubleClick = false;});
          if (response.status === 201) {
              console.log('이미지 전송 성공', response.data);
              const newid = response.data.id
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
    }
  };

    // 그림 제출하기 함수
  const onClickSubmit = async (event) => {
    // 중복클릭 방지
    if (variable.current.isDoubleClick) {
      return;
    }

    variable.current.isDoubleClick = true;

    const randomNumber = Math.floor(Math.random() * 100000)
    if (!user) {
      alert("로그인 후 이용해주세요.")
      router.push('/')
    } else {
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
      formData.append("sentence", sent);
      
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
      try {
        const response = await api.post('/practice/upload/', formData, {
            headers: { "Content-Type": "multipart/form-data", },
        }).finally(() => { variable.current.isDoubleClick = false;})
        if (response.status === 201) {
            console.log('이미지 전송 성공', response.data);
            const newid = response.data.id
            setId(newid)
            Fetchsentence(newid)          
        } else {
            console.log('이미지 전송 실패')
            console.log(response.status);
        }
      } catch (event) {
          console.error('이미지 전송 실패', event)
      };
    }
  };

  // 폰트 설정 함수
  const onClcikFont1 = () => { 
    setFont("one")
    setFontsent("교보 2019년 손글씨체")
  }
  const onClcikFont2 = () => {
    setFont("two")
    setFontsent("네이버 클로바 느릿느릿체")
  }
  const onClcikFont3 = () => {
    setFont("three")
    setFontsent("조선 궁서체")
  }
  const onClcikFont4 = () => {
    setFont("four")
    setFontsent("교보 2020년 박도연체")
  }
  const onClcikFont5 = () => {
    setFont("five")
    setFontsent("KCC 안중근체")
  }
  const onClcikFont6 = () => {
    setFont("six")
    setFontsent("연예인 폰트 - (블락비 지코)")
  }

  // dropbox옵션
  const items = [ 
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
    {
      key: '6',
      label: (
        <div style={{ fontFamily: "six", fontSize:20}} onClick={onClcikFont6} target="_blank" rel="noopener noreferrer">
          연예인 폰트 - (블락비 지코)
        </div>
      ),
    },
  ]

  useEffect(() =>{
    const canvas = canvasRef.current;
    canvas.width = 1050
    canvas.height = 400

    const hidden = hiddenRef.current;
    hidden.width = 1050
    hidden.height = 400

    const context = canvas.getContext('2d')
    context.lineWidth = 5;
    context.strokeStyle = eraser
    context.lineCap = "round" // 선 끝모양지정 butt, round, square

    context.font = `75pt ${font}` 
    context.fillStyle = "lightgray";
    context.fillText(sent, 200, 225)
    contextRef.current = context;
    setCtx(contextRef.current)

    const hiddenContext = hidden.getContext('2d')
    hiddenContext.lineWidth = 5;
    hiddenContext.strokeStyle = eraser
    hiddenContext.lineCap = "round" // 선 끝모양지정 butt, round, square

    hiddenContext.fillStyle = 'white';
    hiddenContext.fillRect(0, 0, canvas.width, canvas.height);

    hiddenContextRef.current = hiddenContext;
    sethiddenCtx(hiddenContextRef.current)
  }, [clear, font, sent]);

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

  // 문장 바꾸기 함수
  useEffect(() => {
    const Fetchsentence = async () => {
      const result = await api.get('/practice/sentence/')
      const random = Math.floor(Math.random() * result.data['length'])
      // console.log(result.data[1])
      setSent(result.data[random].sentence)
      // setSent("다라쥐 쳇바뀌")
    }
    Fetchsentence()
  }, [])

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


  // 점수 표출 함수
  const Fetchsentence = async (id) => {
    const result = await api.get('/practice/predict/');
    const fetchedScore = result.data.data.find(item => item.id === id)?.confidence;
    setScore(fetchedScore);
    setIsLoading(false);
  };



  return(
    <>
    <Alldiv>
      <BannerDiv>
          <LayoutHeader />
            <BannerDiv2>
              <ImageDiv>
                <img width='350' height='370' src='/Practice/Practice.png'/>
              </ImageDiv>
              <Context style={{marginRight: '30px'}}>
                <h1 style={{fontSize: '50px'}}>낙서장</h1>
                <br />
                <p style={{fontSize: '24px'}}>다양한 서체를 적용하여 글씨체를 연습해보세요</p>
                <p style={{fontSize: '24px'}}>손글씨를 연습하고 싶은 분들을 위한 특별한 공간입니다.</p>
                <p style={{fontSize: '24px'}}>손글씨의 아름다움과 창의성을 함께 향상시킬 수 있는 공간, 손글씨 낙서장입니다</p>
              </Context>
            </BannerDiv2>
            <Function>
              <Mydiv2>
                  <img style = {{width: 130, height: 130}} src="/left.png" />
                  <p style={{fontSize : "30px", fontFamily:font}}>{sent}</p>
                  <img style = {{width: 130, height: 130}} src="/right.png" />
              </Mydiv2>
              <br />
              <Mydiv3>
              <Dropdown menu={{ items,}}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space style={{ fontFamily:"one", fontSize:30, marginTop:50, backgroundImage:"url('/Practice/line2.png')", backgroundSize:"100% 100%", width: '13em', height:'3em', textAlign:'center', paddingLeft:'2em'}}>
                    <span>{fontsent}</span>
                  <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
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
              />
              <Mydiv4>
                <Button type="text" onClick={onClickClear}><DeleteOutlined /></Button>
                <Button type="text" onClick={onClickEraser}><UndoOutlined /></Button>
                <Button type="text" onClick={onClickPencil}><HighlightOutlined /></Button>
              </Mydiv4>
              </Mydiv>
              <Mydiv5>
                  <MyButton1 size="default" onClick={onClickSubmit} >손글씨 등록하기</MyButton1>
                  <MyButton2 onClick={() => setOpen(curr => !curr)} >사진 등록하기</MyButton2>
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
                <div style={{fontSize:"30px", textAlign:"center", height:"300px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center"}}>
                {isLoading ? (
                  <img src="/Practice/19.gif" width="168px"/>
                ) : (
                <>
                {score >= 0.8 ? (
                    <div style={{height: "250px", display: "flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                    {score*100}점입니다!!<br/><h6>축하합니다!! 통과하셨습니다!</h6>
                    <MyButton1 onClick={GoHome}>다시하기</MyButton1>
                    </div>
                ) : (
                    <div style={{height: "250px", display: "flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                    <h3>{score*100}점입니다..</h3><br/><p>점수가 기준에 도달하지 못하였습니다</p><p>다시 해보시겠습니까?</p><br/>
                    <MyButton1 onClick={GoHome}>다시하기</MyButton1>
                    </div>
                )}
                </>
                )}
                  </div>
              </CustomModal>
              </Mydiv5>
          </Function>
          </BannerDiv>
        </Alldiv>
    </>
  )
}