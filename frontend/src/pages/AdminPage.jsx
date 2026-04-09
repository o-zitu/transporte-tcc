import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function AdminPage() {
  const [onibus, setOnibus] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  useEffect(() => {
    carregarOnibus();
  }, []);

  const carregarOnibus = () => {
    fetch("http://localhost:8080/onibus")
      .then(res => res.json())
      .then(setOnibus);
  };

  const deletarOnibus = (id) => {
    if (!window.confirm("Deseja realmente excluir este ônibus?")) return;

    fetch(`http://localhost:8080/onibus/${id}`, {
      method: "DELETE"
    }).then(() => carregarOnibus());
  };

  return (
    <div className="container">
      <button onClick={logout} className="logout">Sair</button>

      <h1>Painel Admin</h1>

      <p style={{ opacity: 0.7 }}>
        Logado como: ADMIN
      </p>

      {/* 🔥 BOTÕES DE NAVEGAÇÃO */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => navigate("/admin/criar-onibus")}>
          Criar Ônibus
        </button>

        <button onClick={() => navigate("/admin/criar-usuario")}>
          Criar Usuário
        </button>

        <button onClick={() => navigate("/admin/usuarios")}>
  Gerenciar Usuários
</button>
      </div>

      <h2>Ônibus cadastrados</h2>

      {onibus.map(bus => (
        <div key={bus.id} className="card">
          <h3>{bus.nome}</h3>
          <p>{bus.horarioSaida}</p>
          <p>{bus.quantidadeAssentos} assentos</p>

          <button onClick={() => deletarOnibus(bus.id)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;