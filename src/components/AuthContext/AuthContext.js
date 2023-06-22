import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

const AuthContext = createContext(); // Context 생성

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1)

  const router = useRouter();

  // useEffect(() => {
  //   const getToken = localStorage.getItem("authTokens");
  //   if (getToken) {
  //     setAuthTokens(JSON.parse(getToken));
  //     setUser(jwt_decode(JSON.parse(getToken).access));
  //   }
  //   setLoading(false);
  // }, []);

  const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();

    // 로그인에 성공했을 경우 홈으로 이동
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      console.log(jwt_decode(data.access))
      console.log(data)
      router.push("/");
    } else {
      alert("아이디 또는 비밀번호가 맞지 않습니다.");
      console.log(data)
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    router.push("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
    count,
    setCount,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
