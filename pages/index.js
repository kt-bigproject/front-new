import Link from 'next/link';
import {BannerButtonDiv, Banner, BannerDiv, Section3Img, Section3Div, EndBanner, EndBanner1, EndBanner2, FeatureSection, FeatureSection2, FeatureSection3, Main, MainBox, MainDiv, MainFeatures,  MainP, MenuBox, FooterUl, Profile, Profile1, ProfileIcon, Name, Position, ProfileCircle, FunctionSpan, FunctionDiv, FunctionTitle, FunctionContext, Function, GIFdiv, FeatureP, BannerSection, All, Section1, Section2, FunctionDiv1, FunctionDiv2, FunctionDiv3, FunctionDiv4, Section3, Section4, Cover, Section4Div, BannerButtonDiv2, Section1div, Section2div, Section3div} from '../styles/main/index'
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
			context.fillText(`"${user.username}" 님 환영합니다`,250, 225)
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

	const [modalOpen, setModalOpen] = useState(false);

  	const openModal = () => {
    	setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};

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
                >
								</Mycanvas>
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
				<Section1div>
				<Main>
					<MainBox>
						<MainDiv>
							<span style={{fontSize: '35px', fontWeight: 'bolder'}}>"손글씨 마스터!"
							<br /><p style={{margin: '7px'}}/>
							</span>
							<MainP>글씨 연습장은 더 나은 글쓰기 경험을 위해 설계된 도구입니다.<br /><p style={{margin: '5px'}}/>
							편안한 자세로 앉아 등과 어깨를 펴고, 팔과 손목을 자연스럽게 위치시켜 최적의 글쓰기 자세를 유지하세요.<br /><p style={{margin: '5px'}}/>
							이렇게 하면 손글씨의 흐름과 정확성을 더욱 개선할 수 있답니다.<br /><p style={{margin: '5px'}}/>
							시작하기 전에 자세와 환경을 체크하고, 손글씨 마스터로의 여정을 시작해보세요!</MainP>
						</MainDiv>
						<MenuBox>
							<FeatureSection>
								<span></span>
								<h3>올바른 자세!</h3>
								<img
          			src="./main/pretty/giphy.gif"
          			width="120"
          			height="150"
          			frameBorder="0"
          			></img>
                <br />
								<FeatureP>글쓰기 연습을 할 때는 언제나 올바른 자세로! 잘못된 자세는 허리에 부담을 줄 수가 있어요!<br/>
								<a style={{color: '#fa7400'}} href='http://www.faber-castell.co.kr/%ED%94%8C%EB%A0%88%EC%9E%89%EB%9F%AC%EB%8B%9D/%EC%93%B0%EA%B8%B0%ED%95%99%EC%8A%B5/%EC%B2%B4%EA%B3%84%EC%A0%81%EC%9D%B8-%EC%93%B0%EA%B8%B0-%ED%95%99%EC%8A%B5%EC%9D%84-%EC%9C%84%ED%95%9C-%EB%AA%87-%EA%B0%80%EC%A7%80-%EC%B6%94%EA%B0%80-%EC%9C%A0%EC%9D%98%EC%82%AC%ED%95%AD/' target='_blank'>"올바른 자세 확인하기"</a>
								</FeatureP>
							</FeatureSection>
							<FeatureSection2>
								<span></span>
								<h3>밝은 장소!</h3>
								<img
          			src="./main/pretty/giphy2.gif"
          			width="120"
          			height="150"
          			frameBorder="0"
          			></img>
                <br />
								<FeatureP>어두운 곳에서 하는 글쓰기 연습은 시력에 안 좋은 영향을 미칠 수 가 있어요!</FeatureP>
							</FeatureSection2>
							<FeatureSection3>
								<span></span>
								<h3>올바른 파지법</h3>
								<img
          			src="./hand_write.png"
          			width="120"
          			height="150"
          			frameBorder="0"
          			></img>
                <br />
								<FeatureP>연필을 잡을 때는 언제나 올바른 파지법으로! 잘못된 파지법은 손에 부담을 줄 수가 있어요!<br />
								<a style={{color: '#fa7400'}} href='http://www.faber-castell.co.kr/%ED%94%8C%EB%A0%88%EC%9E%89%EB%9F%AC%EB%8B%9D/%EC%93%B0%EA%B8%B0%ED%95%99%EC%8A%B5/%EC%98%AC%EB%B0%94%EB%A5%B8-%EC%9E%90%EC%84%B8-%EC%9D%B5%ED%9E%88%EA%B8%B0/' target='_blank'>"올바른 파지법 확인하기"</a></FeatureP>
							</FeatureSection3>
						</MenuBox>
						</MainBox>
        	</Main>
					</Section1div>
				</Section1>
				<Section2 id="part-3">
					<Section2div>
							<Function>
              	<FunctionDiv1>
              	  <FunctionTitle>
										<h3 style={{fontSize: '30px'}}>글씨 연습장</h3>
									</FunctionTitle>
									<img src="/vector/vector1.png" style={{marginBottom: '30px'}}/>
              	  <FunctionContext>
										<p style={{textAlign: 'center', fontSize: '19.4px', marginBottom: '30px'}}>손글씨 연습장은 나만의 글씨체를 교정 및 발전시킬 수 있는 공간입니다.<br/>글씨 연습을 통해 창의적인 생각과 예술적인 재능을 발전시켜 보세요.</p>
									</FunctionContext>
              	</FunctionDiv1>
								<FunctionDiv2>
              	  <FunctionTitle>
										<h3 style={{fontSize: '30px'}}>글씨 놀이터</h3>
									</FunctionTitle>
									<img src="/vector/vector2.png" />
              	  <FunctionContext>
										<p style={{textAlign: 'center', fontSize: '19.4px'}}>손글씨 놀이터는 재미있는 게임을 통해 <br />손글씨 연습을 즐길 수 있도록 만들어졌습니다.<br/>
										게임 속의 다양한 스테이지와 폰트에 도전해 보면서 <br />여러분의 손글씨 실력을 향상시켜 보세요!</p>
										
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
										<p style={{textAlign: 'center', fontSize: '19.4px'}}>열심히 연습한 당신의 손글씨를 여러 사람들에게 자랑해 보세요.<br/>여러 사람들과 글씨체를 공유하고 댓글을 남기면서 소통해보세요.<br/>맘에드는 글씨체에 좋아요를 누르면서 댓글로 칭찬을 남겨보아요!</p>
									</FunctionContext>
              	</FunctionDiv3>
								<FunctionDiv4>
              	  <FunctionTitle>
										<h3 style={{fontSize: '30px'}}>폰트 만들어보기</h3>
									</FunctionTitle>
									<img src="/vector/vector4.png" />
              	  <FunctionContext>
										<p style={{textAlign: 'center', fontSize: '19.4px'}}>당신만의 독특한 폰트를 만들어보세요!<br/>폰트 만들기 서비스에서는 우리 사이트에서 다듬어진 손글씨를 기반으로<br />맞춤형 폰트를 생성할 수 있습니다.</p>
									</FunctionContext>
              	</FunctionDiv4>
							</Function>
							</Section2div>
					</Section2>
					<Section3 id="part-4">
						<Section3div>
						<Section3Img>
							<img src="/main/A.png"/>
						</Section3Img>
						<Section3Div>
							<h1>손글씨 예측을 위한 AI모델 소개{/*합니다.*/} </h1><br />
							<p style={{fontSize: '23px', marginTop: '5px'}}>
								&nbsp;여러분의 손글씨를 분석하여 AI가 정해진 폰트와의 유사도를 예측하고, 판별합니다.
								글씨체의 유사도가 올라감과 동시에 사용자의 글씨도 점점 교정이 되어 예쁜 글씨를 쓸수 있게 됩니다.
								예쁘게 교정된 여러분의 손글씨를 AI를 통해 나만의 폰트로 생성해 보세요. <br />
								<p style={{marginTop: '10px'}}>&nbsp;손글씨 교정과 나만의 폰트생성 멋지지 않나요? 여러분도 한번 체험해 보세요!</p> </p>
								
								<br />
							<button style={{width: '60px', borderRadius: '10px', cursor: 'pointer', fontSize: '15px'}} onClick={openModal}>자세히</button>
							
							<Modal open={modalOpen} setOpen={setModalOpen} close={closeModal} style={{overflow: 'auto', height: 'auto'}}>
								
								<p style={{fontSize: '28px', fontWeight: 'bolder'}}>AI 모델 상세 설명 입니다.</p>
								<br />
								<p style={{fontSize: '20px'}}><p style={{fontWeight: 'bolder'}}>TPS (Thin Plate Spline) 모델:</p><br/>
								TPS 모델은 이미지 변환에 사용되는 비선형 방법입니다. 이 모델은 점들 사이의 미끄럼 변환을 통해 이미지를 정규화시킵니다. 
								이를 통해 손글씨 이미지의 형태를 변경하고 보정하는 데 사용될 수 있습니다.</p>
						  		<br />
								<br />
								<p style={{fontSize: '20px'}}><p style={{fontWeight: 'bolder'}}>ResNet (Residual Neural Network) 모델:</p><br />
								ResNet은 딥러닝 네트워크의 깊이를 극복하기 위해 개발된 네트워크 구조입니다. 
								이 모델은 스킵 연결(skip connection)이라는 개념을 도입하여 신경망의 깊이에 따른 그래디언트 소실 문제를 완화합니다. 
								이를 통해 더 깊은 네트워크를 구성하여 성능을 향상시킬 수 있습니다.</p>
								<br />
								<br />
								<p style={{fontSize: '20px'}}><p style={{fontWeight: 'bolder'}}>BiLSTM (Bidirectional Long Short-Term Memory) 모델:</p><br />
								BiLSTM은 순차적인 데이터(예: 문장, 시계열 데이터)에 대한 처리에 주로 사용되는 모델입니다. 
								LSTM은 순차적인 정보를 기억하고 활용하기 위한 장기 의존성을 처리하는데 효과적입니다. 
								BiLSTM은 입력 시퀀스를 앞뒤로 양방향으로 처리하여 문맥을 더 잘 이해할 수 있게 합니다. 
								이 모델은 손글씨 인식과 같은 순차적인 작업에서 성능을 향상시킬 수 있습니다.</p>
								<br />
								<br />
								<p style={{fontSize: '20px'}}>위의 모델들은 각각 다른 용도와 특성을 가지고 있으며, 
								손글씨 학습 사이트에서 사용된다면 TPS 모델은 이미지 보정, 
								ResNet 모델은 손글씨 인식의 성능 향상, 
								BiLSTM 모델은 순차적인 손글씨 분석과 인식에 활용될 수 있을 것입니다.</p>
							</Modal>
						</Section3Div>
						</Section3div>
					</Section3>
					<Section4 id="part-5">
					<Cover onClick={onClcikTeam}/>
					<Section4Div>
						<h1 style={{fontSize: '95px'}}>Who with us?</h1>
						<br />
						<p style={{fontSize: '22px'}}>-이 사이트는 <span style={{fontWeight: 'bolder', fontSize: '25px'}}>KT AIVLE</span> 에서 만난 인연들이 만들어낸 작품입니다.-</p>
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