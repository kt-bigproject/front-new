import { useContext } from "react";
import AuthContext from "../../src/components/AuthContext/AuthContext";

// UI import
import Modal from '@leafygreen-ui/modal';
// import { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@leafygreen-ui/button';
import { PasswordInput } from '@leafygreen-ui/password-input';
import TextInput from '@leafygreen-ui/text-input';
// import { palette } from '@leafygreen-ui/palette';
// import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
// import Icon from '@leafygreen-ui/icon';
import Link from 'next/link';
import Image from 'next/image';

import styles from './LoginPage.module.css';

const CustomButton = styled(Button)`
  width: 300px; 
  height: 45px;
  color: #5C6C75;

`
const CustomTextInput = styled(TextInput)`
  width: 300px;
  margin-bottom: 10px;

  [class^="leafygreen-ui"] * {
    font-family: inherit;
  } 
`

const CustomPasswordInput = styled(PasswordInput)`
  width: 246px; 

  .leafygreen-ui-1gffv4b {
    font-family: inherit;
  }

  [class^="leafygreen-ui"] * {
    font-family: inherit;
  } 

  .leafygreen-ui-fr3m1 {
    right: -45px;
  }
`

const CustomModal = styled(Modal)`
  /* background-color: black; */
  .leafygreen-ui-ym7ixr {
    
    padding: 0px;
}
`

const LoginButton = styled(Button)`
  width: 300px; 
  /* float: right; */
`

export default function LoginPage() {

  const baseURL = "http://127.0.0.1:8000/api";

  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };
  return (
    <div className={styles.box} >
    <div className={styles.boxL}>
      <div className={styles.boxLwrap}>

        <div className={styles.headerLogo}>
          <Image src='/logo.png' width={150} height={40}/>
        </div>
        <h2 className={styles.headerText}>로그인</h2>
        <span className={styles.accountQuery}>"계정이 없으신가요?"
          <a className={styles.signLink} href='/register'>&nbsp;가입하기</a>
        </span>
          <section>
            <form onSubmit={handleSubmit}>
                <Link href={`${baseURL}/naver/login`}>
                  <a>
                    <img 
                      style={{border: '1px solid #889397', borderRadius: '6px'}}
                      src="/login/naver_login.svg" 
                      alt="Naver Sign-In" 
                      width="300"
                  />
                  </a>
                </Link>
                <Link href={`${baseURL}/kakao/login`}>
                  <a>
                    <img 
                      style={{border: '1px solid #889397', borderRadius: '6px'}}
                      src="/login/kakao_login_large_wide.png" 
                      alt="Kakao Sign-In" 
                      width="300"
                  />
                  </a>
                </Link>

              <CustomButton 
                  style={{ marginBottom: 12 }}
                  href={"/"}
                  variant={"default"}
                  baseFontSize={16}
                  size={"large"}
                  leftGlyph={<Image src="/GoogleLogomark.svg" width={30} height={30}/>}>
                  Google
                </CustomButton>
                {/* <CustomButton                  
                  href={"/"}
                  variant={"default"}
                  baseFontSize={16}
                  size={"large"}
                  leftGlyph={<Image src="/GitHubLogomark.svg" width={40} height={40}/>}>          
                  GitHub
                </CustomButton>    */}

              <div className={styles.hr_sect}>또는</div>

              <CustomTextInput 
                label="아이디"
                id={"username"}
                placeholder="아이디를 입력해주세요."
              />
              {/* <label htmlFor="username">아이디</label> */}
              {/* <input type="text" id="username" placeholder="아이디를 입력해주세요" /><br /> */}
              {/* <label htmlFor="password">비밀번호</label> */}
              {/* <input type="password" id="password" placeholder="비밀번호를 입력해주세요" /><br /> */}
              
              <CustomPasswordInput 
                  label="비밀번호"
                  id={"password"}
                  placeholder={'비밀번호를 입력해주세요.'}
                  />
              {/* <button type="submit">Login</button> */}
              <br/>
              
              <LoginButton 
                type={'submit'}
                variant={"default"}
                baseFontSize={16}>
                로그인
              </LoginButton>     
             
            </form>
          </section>
          </div>
          </div>
          <div className={styles.boxR}>            
          </div>
      </div>
  );

};
