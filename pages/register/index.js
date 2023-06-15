import { useState } from "react";

const pstyle = {
  fontSize: 10,
  color : 'red',
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [password1, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("")


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
        router.push("/login");
      } else {
        const data = await response.json();
        setError(data)
      }
      };
  
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <div>
          <label htmlFor="username">id</label>
          <input
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <p style={pstyle}>{error.username? error.username[0]:""}</p>
        </div>
        <div>
          <label htmlFor="Email">이메일</label>
          <input
            type="text"
            id="Email"
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
            required
          />
          <p style={pstyle}>{error.email? error.email[0]:""}</p>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">비밀번호 확인</label>
          <input
            type="password"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p style={pstyle}>{error.password1? error.password1[0]:""}</p>
          <p style={pstyle}>{password2 !== password1 ? "비밀번호가 올바르지 않습니다" : ""}</p>
        </div>
        <button>Register</button>
      </form>
    </section>
  );
}
