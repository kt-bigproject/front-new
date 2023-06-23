import styled from "@emotion/styled";

export const Banner = styled.section`
  background-image: url('/main/bg2.jpg');
  background-size: 100vw 100vh;
  background-attachment: fixed;
	background-position: top left,center center;
	background-repeat: no-repeat;
  background-color: #fff;
	/* color: #fff; 흰색계열이데 좀 이쁨 */
	padding: 12em 0 20em 0;
	text-align: center;
`


export const Main = styled.section`
  background-size: 100% 100%;
	background-repeat: no-repeat;
  border: 1px solid;
  margin: 25rem auto;
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
  background-size: 900px 500px;
  padding: 159px 159px 55px 159px;
  text-align: center;
`

export const ImageSpan = styled.div`
  border-radius: 0;
	display: flex;
	margin: 0;
	position: relative;
	width: calc(100%);
`

export const MainP = styled.p`
  border-top: solid 2px #e5e5e5;
  position: relative;
`

export const MainImage = styled.img`
	border-radius: 0 0 6px 6px;
	display: block;
	margin: 3em 0 0 -3em;
	position: relative;
	width: calc(100% + 6em);
`
export const MenuBox = styled.section`
	padding: 3em 2em;
  border: 1px solid;
  margin-bottom: 3em;
	margin-top: 3em;
  display: flex;
`

export const MainFeatures = styled.div`
  clear: both;
	content: '';
	display: block;
  float: left;
	width: 50%;
`

export const FeatureSection = styled.section`
  border:1px solid gray;
`

export const FeatureSection2 = styled.section`
  border:1px solid gray;
`

export const FeatureSection3 = styled.section`
  border:1px solid gray;
`

export const FeatureSection4 = styled.section`
  border:1px solid gray;
  width: auto;
  height: auto
`