import styled from "@emotion/styled";
import { keyframes } from "@emotion/react"

export const Banner = styled.section`
  background-color: #FAF0E6;
	/* background-image: url('/main/Noise.png'); */
	background-image: url('/main/cover2.png');
  /* color: #fff; 흰색계열이데 좀 이쁨 */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const All = styled.div`
  /* background-image: linear-gradient(to bottom, #f9f8f7 0%, #FAF0E6 100%); */
  /* background-image: linear-gradient(to bottom, #FAF0E6 0%, #f9f8f7 100%); */
  background-color: #FAF0E6;
  /* #f9f8f7 */
`
export const BannerSection = styled.div`
  width: 100vw;
  height: 100vh;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-image: url('/main/cover2.png'); */
  /* background-size: 100% 100%; */
`

export const BannerDiv = styled.div`
  display : flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 50%;
`

export const BannerButtonDiv = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
`

export const BannerButtonDiv2 = styled.div`
  width: 280px;
  display: flex;
  justify-content: center;
`

export const GIFdiv = styled.div`
  /* background-image: url('/main/effect6.png');
  background-repeat: no-repeat;
  background-size: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 250px;
`

export const Section1 = styled.div`
  background-image: url('/main/frame.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  box-shadow:0 0 15px 0 gray;
`
export const Section1div = styled.div`
  background-image: url('/page/caution2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
`

export const Main = styled.section`
  margin: 0 auto 0 auto;
	max-width: calc(100% - 5em);
	width: 80em;
  height: 100%;

`

export const MainBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`

export const MainDiv = styled.div`
  padding-top: 40px;
  text-align: center;
  padding-bottom:30px;
  margin-top: 45px;
`

export const Section2 = styled.div`
  background-image: url('/main/frame.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Section2div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Function = styled.div`
  display: flex;
  flex: row;
  width: 80%;
  height: 35%;
`

export const FunctionDiv1 = styled.div`
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-right: 3px dashed;
  border-bottom: 3px dashed;
`

export const FunctionDiv2 = styled.div`
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 3px dashed;
`

export const FunctionDiv3 = styled.div`
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const FunctionDiv4 = styled.div`
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-left: 3px dashed;
`

export const FunctionTitle = styled.div`

`

export const FunctionContext = styled.div`
  width: 75%;

`

export const MainP = styled.p`
  position: relative;
  font-size: 18px;
`

export const MenuBox = styled.section`
  display: flex;
	max-width: calc(100% - 5em);
	width: 70em;
  height: 55vh;
  margin: 20px;
`

export const FeatureSection = styled.section`
  /* background-image: url('/main/post/post1.png'); */
  background-image: url('/caution/caution3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 550px;
  height: 380px;
  /* margin-left: 50px; */
  padding-left: 30px;
`

export const FeatureSection2 = styled.section`
  /* background-image: url('/main/post/post3.png'); */
  background-image: url('/caution/caution1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 550px;
  height: 380px;
  /* margin-bottom: 20px; */
  padding-left: 10px;
  padding-right: 10px;
`

export const FeatureSection3 = styled.section`
  /* background-image: url('/main/post/post2.png'); */
  background-image: url('/caution/caution2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 550px;
  height: 380px;
  padding-right: 30px
`

export const FeatureSection4 = styled.section`
  /* background-image: url('/main/function/function5-1.png'); */
  background-image: url('/main/post/post3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const FeatureP = styled.p`
  width: 58%;
  font-size: 19px;
`

export const EndBanner1 = styled.div`
  background-image: url('/main/effect9.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 500px;
  width: 100%;
  margin: 0 auto 8em auto;

`
export const EndBanner2 = styled.div`
  background-image: url('/main/effect3-2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100px;
  width: 100%;
`
export const Section3 = styled.div`
  background-image: url('/main/frame.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow:0 0 15px 0 gray;
`

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Section3div = styled.div`
  background-image: url('/page/tech2.png');
  background-size: 100% 90%;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Section3Img = styled.div`
  width: 45%;
  text-align: center;
  img {
    width: 77%;
    animation: ${rotateAnimation} 80s linear infinite;
  }
`

export const Section3Div = styled.div`
  width: 40%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 160px;
`

export const Section4 = styled.div`
  background-image: url('/main/frame.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: left;
  position : relative;
  box-shadow:0 0 15px 0 gray;
`

export const Section4Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 10em;
`

export const Cover = styled.div`
  background-image: url('/main/CoverTeam.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  position : absolute;
`

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: 45vh;
`

export const Profile1 = styled.div`
 width: 90%;
 display: flex;
 justify-content: space-between;
 /* margin-bottom: 20px; */
`
const HoverAnimation = keyframes`
  0% {
    transform: translateY(0);
    box-shadow: 0 0 0 rgba(135, 206, 250, 0);
  }
  100% {
    transform: translateY(-10px);
    box-shadow: 0 4px 8px rgba(135, 206, 250, 0.4);
  }
`;

export const ProfileCircle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  /* background-color: #f5f5f5; */
  width: 135px;
  height: 180px;
  padding-right: 3em;
  &:hover {
    animation: ${HoverAnimation} 0.3s ease-in-out forwards;
  }
`;

export const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const Position = styled.div`
  font-size: 14px;
  color: #777;
`;

export const Footer = styled.footer`
		background: #f9f8f7;
		padding: 4em 0 6em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 3px dashed;
` 

export const FooterUl = styled.div`
		margin: 0 0 2em 0;
    display: flex;
    justify-content: space-between;
    width: 15vw;
`

export const FooterUl2 = styled.div`
  text-align: center;
`
