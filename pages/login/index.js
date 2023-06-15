import { useContext } from "react";
import AuthContext from "../../src/components/AuthContext/AuthContext";

// UI import
import Modal from '@leafygreen-ui/modal';
import { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@leafygreen-ui/button';
import Image from 'next/image';
import { PasswordInput } from '@leafygreen-ui/password-input';
import TextInput from '@leafygreen-ui/text-input';
import { palette } from '@leafygreen-ui/palette';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import Icon from '@leafygreen-ui/icon';

const CustomButton = styled(Button)`
  width: 250px; 
  height: 50px;
  color: #5C6C75;
`
const CustomTextInput = styled(TextInput)`
  width: 250px;
  /* height: 40px; */
`

const CustomPasswordInput = styled(PasswordInput)`
  width: 196.4px; 
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

export default function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  console.log(loginUser)
  return (
    <section >
      <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <hr />
        <CustomButton 
            style={{ marginBottom: 12 }}
            href={"/"}
            variant={"default"}
            baseFontSize={16}
            size={"large"}
            leftGlyph={<Image src="/GoogleLogomark.svg" width={40} height={40}/>}>
            Google
          </CustomButton>
          <CustomButton                  
            href={"/"}
            variant={"default"}
            baseFontSize={16}
            size={"large"}
            leftGlyph={<Image src="/GitHubLogomark.svg" width={40} height={40}/>}>          
            GitHup
          </CustomButton>   
        <CustomTextInput 
          label="아이디"
          id={"username"}
          placeholder="아이디를 입력하세요."
        />
        {/* <label htmlFor="username">아이디</label> */}
        {/* <input type="text" id="username" placeholder="아이디를 입력해주세요" /><br /> */}
        {/* <label htmlFor="password">비밀번호</label> */}
        {/* <input type="password" id="password" placeholder="비밀번호를 입력해주세요" /><br /> */}
        <CustomPasswordInput 
            placeholder={'비밀번호를 입력하세요.'}
            label="비밀번호"
            id={"password"}
            />
        {/* <button type="submit">Login</button> */}
        <Button 
          type={'submit'}
          variant={"default"}
          baseFontSize={16}>
          Login
        </Button>     
      </form>
    </section>
  );

};
