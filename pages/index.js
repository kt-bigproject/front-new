import Link from 'next/link';
import {ImageDiv, Footer, Banner, BannerDiv, EndBanner, EndBanner1, EndBanner2, FeatureSection, FeatureSection2, FeatureSection3, FeatureSection4, ImageSpan, Main, MainBox, MainDiv, MainFeatures, MainImage, MainP, MenuBox, FooterUl, Profile, Profile1, ProfileIcon, Name, Position, ProfileCircle, ImageContext, ImageTitle} from '../styles/main/index'
import LayoutHeader from '../src/commons/layout/header/header';
export default function MainPage() {
  return (
    <>
    <body class="landing">
		<div id="page-wrapper">

			{/* Header */}
				{/* <header id="header" class="alt">
					<h1><a href="index.html">Alpha</a> by HTML5 UP</h1>
					<nav id="nav">
						<ul>
							<li><a href="index.html">Home</a></li>
							<li>
								<a href="#" class="icon solid fa-angle-down">Layouts</a>
								<ul>
									<li><a href="generic.html">Generic</a></li>
									<li><a href="contact.html">Contact</a></li>
									<li><a href="elements.html">Elements</a></li>
									<li>
										<a href="#">Submenu</a>
										<ul>
											<li><a href="#">Option One</a></li>
											<li><a href="#">Option Two</a></li>
											<li><a href="#">Option Three</a></li>
											<li><a href="#">Option Four</a></li>
										</ul>
									</li>
								</ul>
							</li>
							<li><a href="#" class="button">Sign Up</a></li>
						</ul>
					</nav>
				</header> */}

			{/* Banner */}
      <LayoutHeader />
				<Banner>
          <BannerDiv>
					  <h1>오늘의 <br/>글씨</h1>
					  <p>Another fine responsive site template freebie by HTML5 UP.</p>
					  <div>
              <button>a</button>
              <button>b</button>
					  </div>
          </BannerDiv>

			{/* Main */}

				<Main id="main" class="container">
					<MainBox class="box special">
						<MainDiv>
							<h2>Introducing the ultimate mobile app
							<br />
							for doing stuff with your phone</h2>
							<MainP>Blandit varius ut praesent nascetur eu penatibus nisi risus faucibus nunc ornare<br />
							adipiscing nunc adipiscing. Condimentum turpis massa.</MainP>
						</MainDiv>
						<ImageSpan class="image featured">
              <ImageDiv>
                <ImageTitle>asdf</ImageTitle>
                <ImageContext>asdf</ImageContext>
              </ImageDiv>
            </ImageSpan>
					</MainBox>
          </Main>
          <EndBanner1 />

					<MenuBox class="box special features">
							<FeatureSection>
								<span class="icon solid major fa-bolt accent2"></span>
								<h3>Magna etiam</h3>
                <br />
								<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
							</FeatureSection>
							<FeatureSection2>
								<span class="icon solid major fa-chart-area accent3"></span>
								<h3>Ipsum dolor</h3>
                <br />
								<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
							</FeatureSection2>
							<FeatureSection3>
								<span class="icon solid major fa-cloud accent4"></span>
								<h3>Sed feugiat</h3>
                <br />
								<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
							</FeatureSection3>
							<FeatureSection4>
								<span class="icon solid major fa-lock accent5"></span>
								<h3>Enim phasellus</h3>
                <br />
								<p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
							</FeatureSection4>
					</MenuBox>
          <button>DO IT DO IT!!!</button>
          <EndBanner2 />
          </Banner>
          
					<div class="row">
          {/* <img
          src="./main/pretty/giphy.gif"
          width="384"
          height="480"
          frameBorder="0"
          ></img> */}
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

			{/* Footer */}
				<Footer id="footer">
					<FooterUl class="icons">
						{/* <li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
						<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
						<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
						<li><a href="#" class="icon brands fa-github"><span class="label">Github</span></a></li>
						<li><a href="#" class="icon brands fa-dribbble"><span class="label">Dribbble</span></a></li>
						<li><a href="#" class="icon brands fa-google-plus"><span class="label">Google+</span></a></li> */}
            <Link href="/"><a>Twitter</a></Link>
            <Link href="/"><a>Google</a></Link>
            <Link href="/"><a>Facebook</a></Link>
            <Link href="/"><a>instagram</a></Link>
            <Link href="/"><a>git</a></Link>
          </FooterUl>
					<ul class="copyright">
						<div>&copy; Untitled. All rights reserved.</div>
					</ul>
				</Footer>

		</div>

	</body>
    </>
  );
}