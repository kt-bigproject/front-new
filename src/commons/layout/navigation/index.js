import styled from "@emotion/styled"
import { useRouter } from "next/router";
import { ExportOutlined } from "@ant-design/icons"; 


const NavbarWrapper = styled.nav`
  background-color: white;
  padding: 2px 20px;
  font-size: 16px;
  margin: 0;
  width: 97vw;
  overflow-x: hidden;
  margin-top: 10px;
  
  
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
  
`;


const NavbarLinks = styled.div`
  list-style-type: none;
  display: flex;
  align-items: center;
  padding-left: 0;
`;

const NavbarLink = styled.div`
  margin-left: 90px;
  display: flex;
  align-items: center;
  padding-left: 0;
  
  div {
    color: inherit;
    text-decoration: none;
    border-bottom: none;
    font-weight: bolder;
    font-size: 17px;
    cursor: pointer;


    &:hover {
        text-decoration: underline;
        text-decoration-thickness: 2px;
    }
  }

  .logout-icon {
    position: relative;
    right: 1px;
  }

`;

const NavbarTitle = styled.h1`
    font-size: 12px;
    margin: 0;

    span {
    font-size: 32px;
    font-weight: bold;
    color: orange;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;



export default function LayoutNavigation() {

    const a1 = useRouter()

    const onClickbutton1 = () => {
        a1.push('./핸드 라이팅 연습')
    }

    const a2 = useRouter()

    const onClickbutton2 = () => {
        a2.push('./단어 맞추기')
    }

    const a3 = useRouter()

    const onClickbutton3 = () => {
        a3.push('./시그니처 핸드라이팅')
    }

    const a4 = useRouter()

    const onClickbutton4 = () => {
        a4.push('./랜덤 펜팔')
    }

    const a5 = useRouter()

    const onClickbutton5 = () => {
        a5.push('./login')
    }



  return (
    
    <NavbarWrapper>
        <NavbarContainer>
            <NavbarTitle>
            <span>오</span>늘의 손 <span>글</span>씨
            </NavbarTitle>
            <NavbarLinks>
            <NavbarLink>
                <div onClick={onClickbutton1}>핸드 라이팅 연습</div>
            </NavbarLink>
            <NavbarLink>
                <div onClick={onClickbutton2}>단어 맞추기</div>
            </NavbarLink>
            <NavbarLink>
                <div onClick={onClickbutton3}>시그니처 핸드라이팅</div>
            </NavbarLink>
            <NavbarLink>
                <div onClick={onClickbutton4}>랜덤 펜팔</div>
            </NavbarLink>
            </NavbarLinks>
            <NavbarLink>
            
            <ExportOutlined className="logout-icon" />
            <div onClick={onClickbutton5}>로그아웃</div>
                
            </NavbarLink>
            
        </NavbarContainer>
    </NavbarWrapper>
    
  );
}