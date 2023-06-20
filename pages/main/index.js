import { useRouter } from "next/router"
import { useContext } from "react"
// import AuthContext from "../src/components/AuthContext/AuthContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Check from "./boardcheck"

export default function Pages() {
  const aaa = useRouter()

  // const { user } = useContext(AuthContext)
  // console.log(localStorage)
  // console.log(localStorage)
  const onclickbutton = () => {
    aaa.push("/login")
  }
  return(
    <>
    
    {/* <p>{localStorage.authTokens ? "김무연님 환영합니다" :""}</p> */}
    <div>
      <button onClick={onclickbutton}>로그인페이지로 이동하기</button>
      <button onClick={e => aaa.push("/rank")}>랭크 페이지로 이동하기</button>
    </div>
    </>
  )
}

