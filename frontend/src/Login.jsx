import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const fazerLogin = () => {
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
        // 🔥 salva no estado + storage
        setUsuario(data);
        localStorage.setItem("usuario", JSON.stringify(data));

        navigate("/onibus");
      })
      .catch(err => alert(err.message));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />

      <br />

      <button onClick={fazerLogin}>Entrar</button>
    </div>
  );
}

export default Login;