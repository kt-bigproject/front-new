import { useState } from "react";

// UI import
import Modal from '@leafygreen-ui/modal';
import styled from '@emotion/styled';
import Button from '@leafygreen-ui/button';
import Image from 'next/image';
import { PasswordInput } from '@leafygreen-ui/password-input';
import TextInput from '@leafygreen-ui/text-input';
import { palette } from '@leafygreen-ui/palette';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import Icon from '@leafygreen-ui/icon';
import styles from './RegisterPage.module.css';

const pstyle = {
  fontSize: 10,
  color : 'red',
}

const CustomButton = styled(Button)`
  width: 300px; 
  height: 50px;
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
  margin-bottom: 10px;

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
const SignupButton = styled(Button)`
  width: 300px; 
  /* float: right; */
`

export default function Register() {
  const [username, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("")

  const [confirm, setConfirm] = useState("none")

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password1,
        password2,
      }),
      });
    if (response.status === 201) {
      router.push("/");
    } else {
      const data = await response.json();
      setError(data)
      setConfirm((password1 !== password2)?"error":"none")
      console.log(error.email)
    }
    };
  
  return (
    <div className={styles.container} >
      <div className={styles.col1}/>
      <div className={styles.box}>
      <div className={styles.col2}>        
        <div className={styles.boxLwrap}>
          <div className={styles.headerLogo}>
            <Image src='/Logo.svg' width={150} height={40}/>
          </div>
          <h2 className={styles.headerText}>회원가입</h2>
          <span className={styles.accountQuery}>"이미 계정이 있으신가요?"
            <a className={styles.signLink} href='/login'>&nbsp;로그인</a>
          </span>
          <section>
            <form onSubmit={handleSubmit}>
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

              <div className={styles.hr_sect}>또는</div>

              <CustomTextInput 
                    label="아이디"
                    id={"username"}
                    placeholder="아이디를 입력하세요."
                    state={error.username?"error": "none"}
                    errorMessage={error.username? error.username[0]:""}
                    onChange={e => setUsername(e.target.value)}
              />

              <CustomTextInput 
                label="이메일"
                id={"email"}
                placeholder="이메일을 입력해주세요."
                state={error.email?"error": "none"}
                errorMessage={error.email? error.email[0]:""}
                onChange={e => setEmail(e.target.value)}
              />

              <CustomPasswordInput 
                  label="비밀번호"
                  id={"password"}
                  placeholder={'비밀번호를 입력해주세요.'}
                  onChange={e => setPassword(e.target.value)}
                  stateNotifications={
                    error.password1
                    ? error.password1.map((a)=>{
                      return {
                      notification: a,
                      state: 'error'
                      }})
                    : []
                    }                                      
              />

             <CustomPasswordInput 
                label="비밀번호 확인"
                id={"confirm-password"}
                placeholder={'확인을 위하여 위와 동일하게 입력해주세요.'}
                onChange={e => setPassword2(e.target.value)}
                stateNotifications={
                  confirm == "error"
                  ? [{notification: "비밀번호가 일치하지 않습니다.",
                    state: confirm }]
                  :[]
                }
                />            
              <SignupButton 
                type={'submit'}
                variant={"default"}
                baseFontSize={16}>
                회원가입
              </SignupButton>    
            </form>
          </section>
          </div>
          </div>
          <div className={styles.col3}>          
        </div>
      </div>
    </div>
  );
}


// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [password1, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [email, setEmail] = useState("");

//   const [error, setError] = useState("")


//   const handleSubmit = async e => {
//     e.preventDefault();
//       const response = await fetch("http://localhost:8000/rest-auth/registration/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password1,
//           password2,
//         }),
//         });
//       if (response.status === 201) {
//         router.push("/login");
//       } else {
//         const data = await response.json();
//         setError(data)
//       }
//       };
  
//   return (
//     <section>
//       <form onSubmit={handleSubmit}>
//         <h1>Register</h1>
//         <hr />
//         <div>
//           <label htmlFor="username">id</label>
//           <input
//             type="text"
//             id="username"
//             onChange={e => setUsername(e.target.value)}
//             placeholder="Username"
//             required
//           />
//           <p style={pstyle}>{error.username? error.username[0]:""}</p>
//         </div>
//         <div>
//           <label htmlFor="Email">이메일</label>
//           <input
//             type="text"
//             id="Email"
//             onChange={e => setEmail(e.target.value)}
//             placeholder="email"
//             required
//           />
//           <p style={pstyle}>{error.email? error.email[0]:""}</p>
//         </div>
//         <div>
//           <label htmlFor="password">비밀번호</label>
//           <input
//             type="password"
//             id="password"
//             onChange={e => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="confirm-password">비밀번호 확인</label>
//           <input
//             type="password"
//             id="confirm-password"
//             onChange={e => setPassword2(e.target.value)}
//             placeholder="Confirm Password"
//             required
//           />
//           <p style={pstyle}>{error.password1? error.password1[0]:""}</p>
//           <p style={pstyle}>{password2 !== password1 ? "비밀번호가 올바르지 않습니다" : ""}</p>
//         </div>
//         <button>Register</button>
//       </form>
//     </section>
//   );
// }
