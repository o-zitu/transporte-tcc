import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const logar = () => {
    // validação
    if (!email || !senha) {
      setErro("Informe email e senha.");
      return;
    }

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Falha no login.");
        }
        return res.json();
      })
      .then(data => {
        setErro("");
        localStorage.setItem("usuario", JSON.stringify(data));
        window.location.href = "/onibus";
      })
      .catch(err => {
        setErro(err.message);
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login</h1>

      {/* mensagem de erro */}
      {erro && (
        <p style={{
          color: "#f87171",
          background: "#7f1d1d",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "10px"
        }}>
          {erro}
        </p>
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          setErro("");
        }}
      />
      <br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => {
          setSenha(e.target.value);
          setErro("");
        }}
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