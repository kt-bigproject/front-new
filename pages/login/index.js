import { useContext } from "react";
import AuthContext from "../../src/components/AuthContext/AuthContext";



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
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <hr />
        <label htmlFor="username">아이디</label>
        <input type="text" id="username" placeholder="아이디를 입력해주세요" /><br />
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호를 입력해주세요" /><br />
        <button type="submit">Login</button>
      </form>
    </section>
  );

};
