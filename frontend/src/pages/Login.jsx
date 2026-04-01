import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const logar = () => {
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    })
      .then(res => {
        if (!res.ok) throw new Error("Login inválido");
        return res.json();
      })
      .then(data => {
        localStorage.setItem("usuario", JSON.stringify(data));
        alert("Login feito 😎");
        navigate("/onibus");
      })
      .catch(err => alert(err.message));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Senha"
        onChange={e => setSenha(e.target.value)}
      />
      <br />

      <button onClick={logar}>Entrar</button>

      <br /><br />

      <button onClick={() => navigate("/register")}>
        Criar conta
      </button>
    </div>
  );
}

export default Login;