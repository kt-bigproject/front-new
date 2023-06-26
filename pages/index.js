import Link from 'next/link';
import {BannerButtonDiv, Footer, Banner, BannerDiv, EndBanner, EndBanner1, EndBanner2, FeatureSection, FeatureSection2, FeatureSection3, Main, MainBox, MainDiv, MainFeatures, MainImage, MainP, MenuBox, FooterUl, Profile, Profile1, ProfileIcon, Name, Position, ProfileCircle, FunctionSpan, FunctionDiv, FunctionTitle, FunctionContext, Function, GIFdiv, FeatureP, BannerSection} from '../styles/main/index'
import LayoutHeader from '../src/commons/layout/header2/header';
import { MyButton1, MyButton2 } from '../styles/practice/pracitce';
import { Anchor } from "@codecademy/gamut"

export default function MainPage() {
  return (
    <>
				<Banner>
					<BannerSection>
          	<BannerDiv>
						  <h1>오늘의 글씨</h1>
							<br />
							<GIFdiv>
								<img
          			src="./main/pretty/giphy.gif"
          			width="180"
          			height="240"
          			frameBorder="0"
          			></img>
							</GIFdiv>
							<br />
						  <p>Another fine responsive site template freebie by HTML5 UP.</p>
						  <br />
							<BannerButtonDiv>
          	    <MyButton1>Sign Up</MyButton1>
          	    <MyButton2>About</MyButton2>
						  </BannerButtonDiv>
          	</BannerDiv>
					</BannerSection>


			{/* Main */}
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

				<Main>
					<MainBox>
						<MainDiv>
							<h2>Introducing the ultimate mobile app
							<br />
							for doing stuff with your phone</h2>
							<MainP>Blandit varius ut praesent nascetur eu penatibus nisi risus faucibus nunc ornare<br />
							adipiscing nunc adipiscing. Condimentum turpis massa.</MainP>
						</MainDiv>
						<FunctionSpan>
							<Function>
              	<FunctionDiv>
              	  <FunctionTitle>
										<h3>글씨 연습장</h3>
									</FunctionTitle>
              	  <FunctionContext>
										<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
									</FunctionContext>
              	</FunctionDiv>
								<FunctionDiv>
              	  <FunctionTitle>
										<h3>글씨 놀이터</h3>
									</FunctionTitle>
              	  <FunctionContext>
										<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
									</FunctionContext>
              	</FunctionDiv>
							</Function>
							<Function>
								<FunctionDiv>
              	  <FunctionTitle>
										<h3>손글씨 자랑하기</h3>
									</FunctionTitle>
              	  <FunctionContext>
										<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
									</FunctionContext>
              	</FunctionDiv>
								<FunctionDiv>
              	  <FunctionTitle>
										<h3>폰트 만들어보기</h3>
									</FunctionTitle>
              	  <FunctionContext>
										<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
									</FunctionContext>
              	</FunctionDiv>
							</Function>
            </FunctionSpan>
					</MainBox>
          </Main>


					<EndBanner1 />



          
					<div>
          <Profile>
            <p>팀원소개</p>
          <Profile1>
            <ProfileCircle>
              <ProfileIcon>아이콘</ProfileIcon>
              <Name>김무연</Name>
              <Position>프론트엔드</Position>
            </ProfileCircle>
            <ProfileCircle>
              <ProfileIcon>아이콘</ProfileIcon>
              <Name>김힘찬</Name>
              <Position>프론트엔드</Position>
            </ProfileCircle>
            <ProfileCircle>
              <ProfileIcon>아이콘</ProfileIcon>
              <Name>김규민</Name>
              <Position>프론트엔드</Position>
            </ProfileCircle>
            <ProfileCircle>
              <ProfileIcon>아이콘</ProfileIcon>
              <Name>박규정</Name>
              <Position>프론트엔드</Position>
            </ProfileCircle>
          </Profile1>
          <Profile1>
          <ProfileCircle>
              <ProfileIcon>아이콘</ProfileIcon>
              <Name>박윤수</Name>
              <Position>AI</Position>
            </ProfileCircle>
            <ProfileCircle>
              <ProfileIcon>아이콘</ProfileIcon>
              <Name>김혜민</Name>
              <Position>백엔드</Position>
            </ProfileCircle>
            <ProfileCircle>
              <ProfileIcon>아이콘</ProfileIcon>
              <Name>문석호</Name>
              <Position>백엔드</Position>
            </ProfileCircle>
            <ProfileCircle>
              <ProfileIcon>아이콘</ProfileIcon>
              <Name>이창영</Name>
              <Position>백엔드</Position>
            </ProfileCircle>
          </Profile1>
          </Profile>

		</div>
		</Banner>
		<EndBanner2 />


			{/* Footer */}
				<Footer>
					<FooterUl>						
            <Link href="/"><a>Twitter</a></Link>
            <Link href="/"><a>Google</a></Link>
            <Link href="/"><a>Facebook</a></Link>
            <Link href="/"><a>instagram</a></Link>
            <Link href="/"><a>git</a></Link>
          </FooterUl>
					<ul>
						<div>&copy; Untitled. All rights reserved.</div>
					</ul>
				</Footer>

    </>
  );
}