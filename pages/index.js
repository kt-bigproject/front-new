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

	if (user) {
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
			context.font = `50pt one` 
			context.fillStyle = "lightgray";
			context.fillText(`${user.username} 님 환영합니다`,250, 225)
	
			context.font = `30pt one` 
			context.fillText('그림을 그려보세요!',380, 300)
			contextRef.current = context;
			setCtx(contextRef.current)
	
		}, [clear]);
	}


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

	useEffect(() => {
    if (hasCookie('token')) {

			const access = getCookie('token');
			const refresh = getCookie('refresh_token');
			const authTokens = { access, refresh}

			socialLogin(authTokens)

			deleteCookie('token')
			deleteCookie('refresh_token')
    }
  }, []);


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
						  {/* <p style={{fontSize:"25px"}}>{user.username} 님 환영합니다!</p>
						  <br />
							<BannerButtonDiv2>
          	    <MyButton1 onClick={() => {router.push('/practice')}}>Try it!</MyButton1>
						  </BannerButtonDiv2> */}
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
							<GIFdiv>
								<img src="/logo.png" />
							</GIFdiv>
							<p style={{fontSize:"25px"}}>오늘의 글씨에 오신것을 환영합니다!</p>
						  <br />
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
						<MainDiv>
							<h2>Introducing the ultimate mobile app
							<br />
							for doing stuff with your phone</h2>
							<MainP>Blandit varius ut praesent nascetur eu penatibus nisi risus faucibus nunc ornare<br />
							adipiscing nunc adipiscing. Condimentum turpis massa.</MainP>
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
								<FeatureP>글쓰기 연습을 할 때는 언제나 올바른 자세로! 잘못된 자세는 허리에 부담을 줄 수가 있어요!</FeatureP>
							</FeatureSection>
							<FeatureSection2>
								<span></span>
								<h3>밝은 장소!</h3>
								<img
          			src="./main/pretty/giphy2.gif"
          			width="180"
          			height="240"
          			frameBorder="0"
          			></img>
                <br />
								<FeatureP>글쓰기를 할때는 언제나 밝은 곳에서! 어두운 곳에서 하는 글쓰기 연습은 시력에 안 좋은 영향을 미칠 수 가 있어요!</FeatureP>
							</FeatureSection2>
							<FeatureSection3>
								<span></span>
								<h3>올바른 파지법</h3>
								<img
          			src="./main/pretty/giphy3.gif"
          			width="180"
          			height="240"
          			frameBorder="0"
          			></img>
                <br />
								<FeatureP>연필을 잡을 때는 언제나 올바른 파지법으로! 잘못된 파지법은 손에 부담을 줄 수가 있어요!</FeatureP>
							</FeatureSection3>
						</MenuBox>
						</MainBox>
        	</Main>
				</Section1>
				<Section2 id="part-3">
							<Function>
              	<FunctionDiv1>
              	  <FunctionTitle>
										<h3>글씨 연습장</h3>
									</FunctionTitle>
									<img src="/vector/vector1.png" />
              	  <FunctionContext>
										<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
									</FunctionContext>
              	</FunctionDiv1>
								<FunctionDiv2>
              	  <FunctionTitle>
										<h3>글씨 놀이터</h3>
									</FunctionTitle>
									<img src="/vector/vector2.png" />
              	  <FunctionContext>
										<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
									</FunctionContext>
              	</FunctionDiv2>
							</Function>
							<Function>
								<FunctionDiv3>
              	  <FunctionTitle>
										<h3>손글씨 자랑하기</h3>
									</FunctionTitle>
									<img src="/vector/vector3.png" />
              	  <FunctionContext>
										<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
									</FunctionContext>
              	</FunctionDiv3>
								<FunctionDiv4>
              	  <FunctionTitle>
										<h3>폰트 만들어보기</h3>
									</FunctionTitle>
									<img src="/vector/vector4.png" />
              	  <FunctionContext>
										<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
									</FunctionContext>
              	</FunctionDiv4>
							</Function>
					</Section2>
					<Section3 id="part-4">
						<Section3Img>
							<img src="/main/A.png"/>
						</Section3Img>
						<Section3Div>
							<h1>What's Model Use?</h1>
							<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
						</Section3Div>
					</Section3>
					<Section4 id="part-5">
					<Cover onClick={onClcikTeam}/>
					<Section4Div>
						<h1>Who with us?</h1>
						<p>누가누가 우리랑 같이 했을까</p>
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