import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function GerenciarUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = () => {
    fetch("http://localhost:8080/usuarios")
      .then(res => res.json())
      .then(setUsuarios);
  };

  const deletarUsuario = (id) => {
    if (!window.confirm("Excluir usuário?")) return;

    fetch(`http://localhost:8080/usuarios/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setSucesso("Usuário removido 😈");
        carregarUsuarios();
      })
      .catch(() => setErro("Erro ao excluir"));
  };

  const alterarRole = (id, roleAtual) => {
    let novaRole = "PASSAGEIRO";

    if (roleAtual === "PASSAGEIRO") novaRole = "MOTORISTA";
    else if (roleAtual === "MOTORISTA") novaRole = "ADMIN";
    else if (roleAtual === "ADMIN") novaRole = "PASSAGEIRO";

    fetch(`http://localhost:8080/usuarios/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ role: novaRole })
    })
      .then(() => {
        setSucesso(`Role alterada para ${novaRole}`);
        carregarUsuarios();
      })
      .catch(() => setErro("Erro ao alterar role"));
  };

  return (
    <div className="container">
      <h1>Gerenciar Usuários</h1>

      {erro && (
        <p style={{
          color: "#f87171",
          background: "#7f1d1d",
          padding: "10px",
          borderRadius: "6px"
        }}>
          {erro}
        </p>
      )}

      {sucesso && (
        <p style={{
          color: "#4ade80",
          background: "#14532d",
          padding: "10px",
          borderRadius: "6px"
        }}>
          {sucesso}
        </p>
      )}

      <button onClick={() => navigate("/admin/onibus")}>
        Voltar
      </button>

      <h2>Usuários</h2>

      {usuarios.map(user => (
        <div key={user.id} className="card">
          <h3>{user.nome}</h3>
          <p>{user.email}</p>
          <p><strong>{user.role}</strong></p>

          <button onClick={() => alterarRole(user.id, user.role)}>
            Alterar Role
          </button>

          <button onClick={() => deletarUsuario(user.id)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default GerenciarUsuariosPage;