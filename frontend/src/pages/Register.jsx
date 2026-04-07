import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const registrar = () => {
    // validação
    if (!nome || !email || !senha) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Erro ao cadastrar.");
        }
        return res.json();
      })
      .then(() => {
        setErro("");
        navigate("/");
      })
      .catch(err => {
       if (err.message.includes("Duplicate")) {
  setErro("Já existe uma conta com este email.");
} else {
  setErro("Erro ao cadastrar usuário.");
}
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Cadastro</h1>

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
        placeholder="Nome"
        value={nome}
        onChange={e => {
          setNome(e.target.value);
          setErro("");
        }}
      />
      <br />

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

      <button onClick={registrar}>Cadastrar</button>

      <br /><br />

      <button onClick={() => navigate("/")}>
        Voltar pro login
      </button>
    </div>
  );
}

export default Register;