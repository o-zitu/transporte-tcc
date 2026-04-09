import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function CriarUsuarioPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("ADMIN");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const navigate = useNavigate();

  const criar = () => {
    setErro("");
    setSucesso("");

    if (!nome || !email || !senha) {
      setErro("Preenche tudo né meu rei 😡");
      return;
    }

    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
        role
      })
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        setSucesso(`Usuário ${role} criado 😎`);

        setTimeout(() => {
          navigate("/admin/onibus");
        }, 800);
      })
      .catch(err => setErro(err.message));
  };

  return (
    <div className="container">
      <h1>Criar Usuário</h1>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}

      <input placeholder="Nome" onChange={e => setNome(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" onChange={e => setSenha(e.target.value)} />

      <select onChange={e => setRole(e.target.value)}>
        <option value="ADMIN">Admin</option>
        <option value="MOTORISTA">Motorista</option>
      </select>

      <br />
      <button onClick={criar}>Criar</button>
      <button onClick={() => navigate("/admin/onibus")}>Voltar</button>
    </div>
  );
}

export default CriarUsuarioPage;