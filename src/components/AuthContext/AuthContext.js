import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

const AuthContext = createContext(); // Context 생성

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();

  const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:8000/rest-auth/login/", {
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
      // setAuthTokens(data);
      console.log(data['token'])
      console.log(jwt_decode(data['token'])) // 
      setUser(jwt_decode(data['token'])); // user정보는 여기 담김
      // localStorage.setItem("user", JSON.stringify(data));
      // localStorage.setItem("user", jwt_decode(data['token'])); user정보는 굳이 여기서 담지말고 setUser에 담자
      localStorage.setItem("tokens", data['token']);
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
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
