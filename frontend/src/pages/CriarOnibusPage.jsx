import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function CriarOnibusPage() {
  const [nome, setNome] = useState("");
  const [horarioSaida, setHorarioSaida] = useState("");
  const [quantidadeAssentos, setQuantidadeAssentos] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const navigate = useNavigate();

  const criar = () => {
    setErro("");
    setSucesso("");

    if (!nome || !horarioSaida || !quantidadeAssentos) {
      setErro("Preenche tudo aí né meu parceiro 😡");
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
          throw new Error(text);
        }

        setSucesso("Ônibus criado 😎");

        setTimeout(() => {
          navigate("/admin/onibus");
        }, 800);
      })
      .catch(err => setErro(err.message));
  };

  return (
    <div className="container">
      <h1>Criar Ônibus</h1>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}

      <input placeholder="Nome" onChange={e => setNome(e.target.value)} />
      <input placeholder="Horário (ex: 08:00)" onChange={e => setHorarioSaida(e.target.value)} />
      <input placeholder="Assentos" onChange={e => setQuantidadeAssentos(e.target.value)} />

      <br />
      <button onClick={criar}>Criar</button>
      <button onClick={() => navigate("/admin/onibus")}>Voltar</button>
    </div>
  );
}

export default CriarOnibusPage;