// import { useRouter } from "next/router"
// import { useContext } from "react"
// import AuthContext from "../src/components/AuthContext/AuthContext"
// import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Check from "./boardcheck"

// export default function Page() {
//   const aaa = useRouter()

  // const { user } = useContext(AuthContext)
//   // console.log(localStorage)
//   // console.log(localStorage)
//   const onclickbutton = () => {
//     aaa.push("/login")
//   }
//   return(
//     <>
    
//     {/* <p>{localStorage.authTokens ? "김무연님 환영합니다" :""}</p> */}
//     <div>
//       <button onClick={onclickbutton}>로그인페이지로 이동하기</button>
//     </div>
//     </>
//   )
// }


//-----------------------------------------------------------------------------------
// 위에는 기존, 밑에는 테스트

import React from 'react';
import Routing from "../src/Routing/index";
import { useState, useEffect } from 'react';

export default function Page () {
  if(typeof window === 'undefined'){
    return null}
  // const { user } = useContext(AuthContext)
  // console.log(user)
  // console.log(localStorage)
  const onclickbutton = () => {
    aaa.push("/login")
  }
  return (
    <div>
    
      <Routing />
      <div>
    
    </div>
    </div>
    
    
  )
}