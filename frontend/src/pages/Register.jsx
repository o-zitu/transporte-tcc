import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const registrar = () => {
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao cadastrar");
        return res.json();
      })
      .then(() => {
        alert("Conta criada 😎");
        navigate("/");
      })
      .catch(err => alert(err.message));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Cadastro</h1>

      <input
        placeholder="Nome"
        onChange={e => setNome(e.target.value)}
      />
      <br />

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

      <button onClick={registrar}>Cadastrar</button>

      <br /><br />

      <button onClick={() => navigate("/")}>
        Voltar pro login
      </button>
    </div>
  );
}

export default Register;