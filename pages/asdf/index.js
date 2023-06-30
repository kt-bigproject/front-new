import axios from "axios"
import Link from "next/link"
import {useState} from 'react'

export default function Login() {
  const Logined = () => {
    const response = axios.get('http://localhost:8000/api/naver/login/')
    console.log(response)
  }

  return (
    <>
      <div>
        <button onClick={Logined}>asdf</button>
        {/* <Link href="http://localhost:8000/api/naver/login/"><a>구글로그인</a></Link> */}
      </div>
    </>
  )
}