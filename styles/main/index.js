import styled from "@emotion/styled";

export const Banner = styled.section`
  background-image: url('/main/bg2.jpg');
  background-size: 100vw 100vh;
  background-attachment: fixed;
	background-repeat: no-repeat;
  background-color: #FAF0E6;
	/* color: #fff; 흰색계열이데 좀 이쁨 */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid;
`
export const BannerSection = styled.div`
  width: 100vw;
  height: 100vh;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const BannerDiv = styled.div`
  /* background-image: url('/main/function/function3.png'); */
  /* background-repeat: no-repeat; */
  /* background-size: 100%; */
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 70%;
`

export const BannerButtonDiv = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
`

export const GIFdiv = styled.div`
  background-image: url('/main/effect6.png');
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 250px;
`


export const Main = styled.section`
  background-image: url('/main/effect16.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0 auto 14em auto;
	max-width: calc(100% - 5em);
	width: 80em;
  border:1px solid;
`

export const MainBox = styled.section`

	border-radius: 6px;
	box-shadow: 0 2px 0 0 #e5e5e5;
	padding: 3em 3em 0 3em;
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const MainDiv = styled.div`
  border:1px solid;
  padding: 100px 100px;
  text-align: center;
`

export const FunctionSpan = styled.div`
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 0;
	display: flex;
  flex-direction: column;
	width: calc(100%);
  padding: 0 0 6em 0;
`
export const Function = styled.div`
  display: flex;
  flex: row;
`

export const FunctionDiv = styled.div`
  border: 1px solid;
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FunctionTitle = styled.div`

`

export const FunctionContext = styled.div`
  width: 75%;
  border-top: 1px solid;

`

export const MainP = styled.p`
  border-top: solid 2px #e5e5e5;
  position: relative;
`

export const MainImage = styled.img`
	border-radius: 0 0 6px 6px;
	display: block;
	/* margin: 3em 0 0 -3em; */
	position: relative;
	width: calc(100% + 6em);
`
export const MenuBox = styled.section`
	padding: 3em 0;
  margin-bottom: 3em;
  display: flex;
  margin: 0 auto 14em auto;
	max-width: calc(100% - 5em);
	width: 80em;
  border:1px solid;
`

export const FeatureSection = styled.section`
  /* background-image: url('/main/post/post1.png'); */
  background-image: url('/caution/caution3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`

export const EndBanner1 = styled.div`
  background-image: url('/main/effect9.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 500px;
  width: 100%;
  border: 1px solid;
  margin: 0 auto 8em auto;

`
export const EndBanner2 = styled.div`
  background-image: url('/main/effect3-2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100px;
  width: 100%;

`
export const Profile = styled.div`
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 8em auto;
  width: auto;

`

export const Profile1 = styled.div`
 border: 1px solid;
 display: flex;
 justify-content: space-between;
`
export const ProfileCircle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #f5f5f5; */
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid;
`;

export const ProfileIcon = styled.div`
  width: 80px;
  height: 80px;
  /* object-fit: cover; */
  /* border-radius: 50%; */
  margin-bottom: 10px;
`;

export const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Position = styled.div`
  font-size: 14px;
  color: #777;
`;

export const Footer = styled.footer`
		background: #f0f0f0;
		padding: 4em 0 6em 0;
		text-align: center;
` 

export const FooterUl = styled.div`
		margin: 0 0 2em 0;
    display: flex;
    justify-content: space-around;
    padding: 0 50rem;
`
