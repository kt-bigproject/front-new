import Link from 'next/link';
import {BannerButtonDiv, Banner, BannerDiv, Section3Img, Section3Div, EndBanner, EndBanner1, EndBanner2, FeatureSection, FeatureSection2, FeatureSection3, Main, MainBox, MainDiv, MainFeatures,  MainP, MenuBox, FooterUl, Profile, Profile1, ProfileIcon, Name, Position, ProfileCircle, FunctionSpan, FunctionDiv, FunctionTitle, FunctionContext, Function, GIFdiv, FeatureP, BannerSection, All, Section1, Section2, FunctionDiv1, FunctionDiv2, FunctionDiv3, FunctionDiv4, Section3, Section4, Cover, Section4Div, BannerButtonDiv2} from '../styles/main/index'
import LayoutHeader from '../src/commons/layout/header2/header';
import { MyButton1, MyButton2, MyButton3 } from '../styles/practice/pracitce';
import Modal from '@leafygreen-ui/modal';
import {useState, useContext, useEffect, useRef} from "react"
import { Anchor } from 'antd';
import AuthContext from '../src/components/AuthContext/AuthContext';
import { useRouter } from 'next/router';
import { hasCookie, getCookie, getCookies, deleteCookie } from 'cookies-next';
import styled from '@emotion/styled';

const Mycanvas = styled.canvas`
	/* border: 1px solid; */
	/* background-image: url("/main/grid2.png"); */
	background-size: 100%;
	/* background-color: white; */
`

export default function MainPage() {
	const [open, setOpen] = useState(false);
	const { user, socialLogin } = useContext(AuthContext)
	console.log(user)
	const onClcikTeam = () => {
		setOpen(curr => !curr)
	}

	// 메인페이지 캔버스 그리기
	const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [ctx, setCtx] = useState() // 그림지정 state
	const [isDrawing, setIsDrawing] = useState(false) 
  const [eraser, setEraser] = useState("black")
  const [clear, setClear] = useState("")

	useEffect(() =>{
		const img = new Image()
		img.src = '/main/mainlogo.png'

		const canvas = canvasRef.current;
		canvas.width = 1010
		canvas.height = 400

		const context = canvas.getContext('2d')
		context.lineWidth = 4;
		context.strokeStyle = eraser
		context.lineCap = "round" // 선 끝모양지정 butt, round, square
		
		context.drawImage(img, 300, 10, 404, 128)

		if (user) {
			context.font = `50pt one` 
			context.fillStyle = "lightgray";
			context.fillText(`${user.username} 님 환영합니다`,250, 225)
		} else {
			context.font = `50pt one` 
			context.fillStyle = "lightgray";
			context.fillText(`오늘의 글씨`,380, 225)
		}

		context.font = `30pt one` 
		context.fillText('그림을 그려보세요!',380, 300)
		contextRef.current = context;
		setCtx(contextRef.current)

	}, [clear]);


  useEffect(() => { // 지우개 쓰기 위해서 렌더링
    if (ctx) {
      ctx.strokeStyle = eraser;
    }
  }, [eraser, ctx ]);

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
      setClear(clear+1)
    }

	const router = useRouter()

	// useEffect(() => {
  //   if (hasCookie('token')) {

	// 		const access = getCookie('token');
	// 		const refresh = getCookie('refresh_token');
	// 		const authTokens = { access, refresh}

	// 		socialLogin(authTokens)

	// 		deleteCookie('token')
	// 		deleteCookie('refresh_token')
  //   }
  // }, []);


  return (
    <>
			<Banner>
			<LayoutHeader />
			<div>
      <Anchor style={{
      		padding: '15px',
					fontWeight: 'bold',
					width : '23vw',
					display: 'flex',
					justifyContent:'center',
					backgroundImage: "url('/anchor.png')",
					backgroundSize:'100% 100%',
					zIndex: 2,
					marginTop: '10px'
					}}
        direction="horizontal"
        items={[
          {
            key: 'part-1',
            href: '#part-1',
            title: 'Main',
          },
          {
            key: 'part-2',
            href: '#part-2',
            title: 'Caution',
          },
          {
            key: 'part-3',
            href: '#part-3',
            title: 'Function',
          },
          {
            key: 'part-4',
            href: '#part-4',
            title: 'Tech',
          },
          {
            key: 'part-5',
            href: '#part-5',
            title: 'Coworker',
          },
        ]}
      />
    </div>
					<BannerSection id="part-1">
          	<BannerDiv>
							{/* <GIFdiv>
								<img src="/logo.png" />
							</GIFdiv> */}
							{user? 
							(
							<>
								<Mycanvas ref={canvasRef}
                          onMouseDown={startDrawing} // 마우스 버튼을 눌렀을때
                          onMouseUp={EndDrawing} // 마우스마우스 버튼을 땠을 때
                          onMouseMove={drawing} // 마우스가 움직일 때
                          onMouseLeave={EndDrawing} // 마우스가 캔버스를 벗어낫을 때
                ></Mycanvas>
								<MyButton3 onClick={onClickClear}>다시 그리기</MyButton3>
							</>
							)	: (
							<>
							{/* <GIFdiv>
								<img src="/logo.png" />
							</GIFdiv>
							<p style={{fontSize:"25px"}}>오늘의 글씨에 오신것을 환영합니다!</p>
						  <br /> */}
								<Mycanvas ref={canvasRef}
            			onMouseDown={startDrawing} // 마우스 버튼을 눌렀을때
            			onMouseUp={EndDrawing} // 마우스마우스 버튼을 땠을 때
            			onMouseMove={drawing} // 마우스가 움직일 때
            			onMouseLeave={EndDrawing} // 마우스가 캔버스를 벗어낫을 때
                ></Mycanvas>
							<BannerButtonDiv>
          	    <MyButton1 onClick={() => {router.push('/register')}}>회원가입</MyButton1>
          	    <MyButton2 onClick={() => {router.push('/login')}}>로그인</MyButton2>
						  </BannerButtonDiv>
							</>
							)} 
          	</BannerDiv>
					</BannerSection>
		</Banner>



			{/* Main */}
			<All>
				<Section1 id="part-2">
				<Main>
					<MainBox>
						<MainDiv style={{marginTop: '35px'}}>
							<span style={{fontSize: '40px', fontWeight: 'bolder'}}>"손글씨 마스터!"
							<br />
							<br />
							</span>
							<MainP style={{fontSize: '27px'}}>글씨 연습장은 더 나은 글쓰기 경험을 위해 설계된 도구입니다.<br /><p style={{margin: '10px'}}/>
							편안한 자세로 앉아 등과 어깨를 펴고, 팔과 손목을 자연스럽게 위치시켜 최적의 글쓰기 자세를 유지하세요.<br /><p style={{margin: '10px'}}/>
							이렇게 하면 손글씨의 흐름과 정확성을 더욱 개선할 수 있답니다.<br /><p style={{margin: '10px'}}/>
							시작하기 전에 자세와 환경을 체크하고, 손글씨 마스터로의 여정을 시작해보세요!</MainP>
						</MainDiv>
						<MenuBox>
							<FeatureSection>
								<span></span>
								<h3>올바른 자세!</h3>
								<img
          			src="./main/pretty/giphy.gif"
          			width="180"
          			height="240"
          			frameBorder="0"
          			></img>
                <br />
								<FeatureP style={{fontSize: '19px'}}>글쓰기 연습을 할 때는 언제나 올바른 자세로! 잘못된 자세는 허리에 부담을 줄 수가 있어요!</FeatureP>
							</FeatureSection>
							<FeatureSection2 style={{width: '600px'}}>
								<span></span>
								<h3>밝은 장소!</h3>
								<img
          			src="./main/pretty/giphy2.gif"
          			width="180"
          			height="240"
          			frameBorder="0"
          			></img>
                <br />
								<FeatureP style={{fontSize: '19px'}}>어두운 곳에서 하는 글쓰기 연습은 시력에 안 좋은 영향을 미칠 수 가 있어요!</FeatureP>
							</FeatureSection2>
							<FeatureSection3>
								<span></span>
								<h3>올바른 파지법</h3>
								<img
          			src="./hand_write.png"
          			width="180"
          			height="240"
          			frameBorder="0"
          			></img>
                <br />
								<FeatureP style={{fontSize: '19px'}}>연필을 잡을 때는 언제나 올바른 파지법으로! 잘못된 파지법은 손에 부담을 줄 수가 있어요!</FeatureP>
							</FeatureSection3>
						</MenuBox>
						</MainBox>
        	</Main>
				</Section1>
				<Section2 id="part-3">
							<Function>
              	<FunctionDiv1>
              	  <FunctionTitle>
										<h3 style={{fontSize: '30px'}}>글씨 연습장</h3>
									</FunctionTitle>
									<img src="/vector/vector1.png" />
              	  <FunctionContext>
										<p style={{textAlign: 'center', fontSize: '20px'}}>손글씨 연습장은 당신이 나만의 글씨 작업을 시작하고 발전시킬 수 있는 공간입니다.<br/>글씨 작업은 창의력을 자극하고 예술적인 재능을 발전시킬 수 있는 멋진 경험입니다.</p>
									</FunctionContext>
              	</FunctionDiv1>
								<FunctionDiv2>
              	  <FunctionTitle>
										<h3 style={{fontSize: '30px'}}>글씨 놀이터</h3>
									</FunctionTitle>
									<img src="/vector/vector2.png" />
              	  <FunctionContext>
										<p style={{textAlign: 'center', fontSize: '20px'}}>손글씨 놀이터는 재미있는 기능을 통해 손글씨 연습을 즐길 수 있도록 만들어졌습니다.<br/>다양한 게임 기능을 통해 손글씨 작업에 도전하고, 자신의 실력을 향상시킬 수 있습니다..</p>
									</FunctionContext>
              	</FunctionDiv2>
							</Function>
							<Function>
								<FunctionDiv3>
              	  <FunctionTitle>
										<h3 style={{fontSize: '30px'}}>손글씨 자랑하기</h3>
									</FunctionTitle>
									<img src="/vector/vector3.png" />
              	  <FunctionContext>
										<p style={{textAlign: 'center', fontSize: '20px'}}>당신의 글씨체를 다양한 사람들과 자랑해 보세요.<br/>서로의 자랑과정을 통해 다양한 글씨체를 공유하고 댓글을 남기며 소통해보세요.<br/>자신의 글씨체로 자랑스러움을 느껴보십시오. </p>
									</FunctionContext>
              	</FunctionDiv3>
								<FunctionDiv4>
              	  <FunctionTitle>
										<h3 style={{fontSize: '30px'}}>폰트 만들어보기</h3>
									</FunctionTitle>
									<img src="/vector/vector4.png" />
              	  <FunctionContext>
										<p style={{textAlign: 'center', fontSize: '20px'}}>당신만의 독특한 폰트를 만들어보세요!<br/>폰트 만들기 서비스에서는 당신이 우리 사이트에서 다듬어진 손글씨를 기반으로 맞춤형 폰트를 생성할 수 있습니다.</p>
									</FunctionContext>
              	</FunctionDiv4>
							</Function>
					</Section2>
					<Section3 id="part-4">
						<Section3Img>
							<img src="/main/A.png"/>
						</Section3Img>
						<Section3Div>
							<h1>손글씨 예측을 위한 AI모델 소개{/*합니다.*/} </h1>
							<p>우리 사이트는 아이들과 외국인들의 손글씨 개선을 위하여 AI모델을 적용 시켰습니다. AI는 당신의 손글씨를 분석하여 정해진 폰트와의 정확도를 예측하고, 그에 따른 사용자의 필체가 폰트와 정확할수록 예측 점수는 올라갑니다.</p>
						</Section3Div>
					</Section3>
					<Section4 id="part-5">
					<Cover onClick={onClcikTeam}/>
					<Section4Div>
						<h1 style={{fontSize: '120px'}}>Who with us?</h1>
						<br />
						<p style={{fontSize: '28.8px'}}>-이 사이트는 <span style={{fontWeight: 'bolder', fontSize: '30px'}}>KT AIVLE</span> 에서 만난 인연들이 만들어낸 작품입니다.-</p>
						<span></span>
					</Section4Div>
					<Modal open={open} setOpen={setOpen} size={'large'}>
						{/* <div style={{height:"110px"}}></div> */}
					<Profile>
          <Profile1>
            <ProfileCircle style={{backgroundImage:'url("/profile/1.png")', backgroundSize:"100% 100%"}}>
              <Name>김무연</Name>
              <Position>프론트엔드</Position>
            </ProfileCircle>
            <ProfileCircle style={{backgroundImage:'url("/profile/2.png")', backgroundSize:"100% 100%"}}>
              <Name>김힘찬</Name>
              <Position>프론트엔드</Position>
            </ProfileCircle>
            <ProfileCircle style={{backgroundImage:'url("/profile/3.png")', backgroundSize:"100% 100%"}}>
              <Name>김규민</Name>
              <Position>프론트엔드</Position>
            </ProfileCircle>
            <ProfileCircle style={{backgroundImage:'url("/profile/4.png")', backgroundSize:"100% 100%"}}>
              <Name>박규정</Name>
              <Position>프론트엔드</Position>
            </ProfileCircle>
          </Profile1>
          <Profile1>
            <ProfileCircle style={{backgroundImage:'url("/profile/5.png")', backgroundSize:"100% 100%"}}>
              <Name>박윤수</Name>
              <Position>AI</Position>
            </ProfileCircle>
            <ProfileCircle style={{backgroundImage:'url("/profile/8.png")', backgroundSize:"100% 100%"}}>
              <Name>김혜민</Name>
              <Position>백엔드</Position>
            </ProfileCircle>
            <ProfileCircle style={{backgroundImage:'url("/profile/5.png")', backgroundSize:"100% 100%"}}>
              <Name>문석호</Name>
              <Position>백엔드</Position>
            </ProfileCircle>
            <ProfileCircle style={{backgroundImage:'url("/profile/7.png")', backgroundSize:"100% 100%"}}>
              <Name>이창영</Name>
              <Position>백엔드</Position>
            </ProfileCircle>
          </Profile1>
          </Profile>
      		</Modal>
					</Section4>
				</All>
    </>
  );
}