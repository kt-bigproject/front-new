import styled from "@emotion/styled";

export const Banner = styled.section`
  background-image: url('/main/bg2.jpg');
  background-size: 100vw 100vh;
  background-attachment: fixed;
	background-repeat: no-repeat;
  background-color: #fff;
	/* color: #fff; 흰색계열이데 좀 이쁨 */
	padding: 12em 0 0 0;
	text-align: center;
`

export const BannerDiv = styled.div`
`


export const Main = styled.section`
  margin: 25rem auto 8rem auto;
	max-width: calc(100% - 5em);
	width: 60em;
`

export const MainBox = styled.section`
	border-radius: 6px;
	box-shadow: 0 2px 0 0 #e5e5e5;
	padding: 3em 3em 0 3em;
`

export const MainDiv = styled.div`
  background-image: url('/main/effect2.png');
	background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 100px 100px;
  text-align: center;
`

export const ImageSpan = styled.div`
  background-image: url('/main/effect6.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 0;
	display: flex;
	margin: 0;
	position: relative;
	width: calc(100%);
`

export const ImageDiv = styled.div`
  border: 1px solid;
  height: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ImageTitle = styled.div`

`

export const ImageContext = styled.div`
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
`

export const FeatureSection = styled.section`
  background-image: url('/main/post/post1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const FeatureSection2 = styled.section`
  background-image: url('/main/post/post2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const FeatureSection3 = styled.section`
  background-image: url('/main/post/post3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const FeatureSection4 = styled.section`
  /* background-image: url('/main/function/function5-1.png'); */
  background-image: url('/main/post/post4.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const EndBanner1 = styled.div`
  background-image: url('/main/effect3-1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100px;
`
export const EndBanner2 = styled.div`
  background-image: url('/main/effect3-2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100px;
`
export const Profile = styled.div`
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Profile1 = styled.div`
 border: 1px solid;
 display: flex;
 justify-content: space-between;
 width: 40%;
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
		background: #f0f0
    f0;
		padding: 4em 0 6em 0;
		text-align: center;
` 

export const FooterUl = styled.div`
		margin: 0 0 2em 0;
    display: flex;
    justify-content: space-around;
    padding: 0 50rem
`