import { useEffect, useState } from "react";
import "../styles/App.css";

function AdminPage() {
  const [onibus, setOnibus] = useState([]);

  const [nome, setNome] = useState("");
  const [horarioSaida, setHorarioSaida] = useState("");
  const [quantidadeAssentos, setQuantidadeAssentos] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

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

  const criarOnibus = () => {
    setErro("");
    setSucesso("");

    if (!nome || !horarioSaida || !quantidadeAssentos) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    if (Number(quantidadeAssentos) <= 0) {
      setErro("Quantidade de assentos inválida.");
      return;
    }

    fetch("http://localhost:8080/onibus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        horarioSaida,
        quantidadeAssentos: Number(quantidadeAssentos)
      })
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Erro ao criar ônibus.");
        }
        return res.json();
      })
      .then(() => {
        setSucesso("Ônibus criado com sucesso.");
        setNome("");
        setHorarioSaida("");
        setQuantidadeAssentos("");
        carregarOnibus();
      })
      .catch(err => {
        setErro(err.message);
      });
  };

  // 🔥 FUNÇÃO DELETE (AGORA NO LUGAR CERTO)
  const deletarOnibus = (id) => {
    if (!window.confirm("Deseja realmente excluir este ônibus?")) return;

    fetch(`http://localhost:8080/onibus/${id}`, {
      method: "DELETE"
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Erro ao excluir.");
        }

        setSucesso("Ônibus removido com sucesso.");
        setErro("");
        carregarOnibus();
      })
      .catch(err => {
        setErro(err.message || "Erro ao excluir ônibus.");
      });
  };

  return (
    <div className="container">
      <button onClick={logout} className="logout">Sair</button>

      <h1>Painel Admin</h1>

      <p style={{ opacity: 0.7 }}>
  Logado como: ADMIN
</p>

      <h2>Criar Ônibus</h2>

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

      {sucesso && (
        <p style={{
          color: "#4ade80",
          background: "#14532d",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "10px"
        }}>
          {sucesso}
        </p>
      )}

      <input
        placeholder="Nome do ônibus"
        value={nome}
        onChange={e => {
          setNome(e.target.value);
          setErro("");
          setSucesso("");
        }}
      />

      <input
        placeholder="Horário (ex: 08:00)"
        value={horarioSaida}
        onChange={e => {
          setHorarioSaida(e.target.value);
          setErro("");
          setSucesso("");
        }}
      />

      <input
        placeholder="Quantidade de assentos"
        value={quantidadeAssentos}
        onChange={e => {
          setQuantidadeAssentos(e.target.value);
          setErro("");
          setSucesso("");
        }}
      />

      <br />
      <button onClick={criarOnibus}>Criar</button>

      <h2>Ônibus cadastrados</h2>

      {onibus.map(bus => (
        <div key={bus.id} className="card">
          <h3>{bus.nome}</h3>
          <p>{bus.horarioSaida}</p>
          <p>{bus.quantidadeAssentos} assentos</p>

          {/* 🔥 BOTÃO DELETE */}
          <button onClick={() => deletarOnibus(bus.id)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;