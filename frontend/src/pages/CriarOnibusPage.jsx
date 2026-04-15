import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CriarOnibusPage() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [horarioSaida, setHorarioSaida] = useState("");
  const [quantidadeAssentos, setQuantidadeAssentos] = useState("");
  const [precoTicket, setPrecoTicket] = useState("");
  const [tipo, setTipo] = useState("COMUM");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const navigate = useNavigate();

  const criar = () => {
    setErro("");
    setSucesso("");

    // Validação de todos os campos obrigatórios
    if (!origem || !destino || !horarioSaida || !quantidadeAssentos || !precoTicket) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Nome visual formatado para compatibilidade com o restante do sistema
    const nomeCompleto = `${origem} ➔ ${destino} (${tipo})`;

    fetch("http://localhost:8080/onibus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origem: origem,        // Campo mapeado para Onibus.java
        destino: destino,      // Campo mapeado para Onibus.java
        nome: nomeCompleto,    // Campo reserva (opcional dependendo do seu back)
        horarioSaida: horarioSaida + ":00",
        quantidadeAssentos: Number(quantidadeAssentos),
        precoTicket: parseFloat(precoTicket)
      })
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Erro ao cadastrar veículo.");
        }
        setSucesso("Veículo cadastrado com sucesso!");
        // Redireciona de volta para a lista após um pequeno delay
        setTimeout(() => navigate("/admin/onibus"), 1200);
      })
      .catch(err => setErro(err.message));
  };

  const styles = {
    page: { 
      backgroundColor: "#f0f2f5", 
      minHeight: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      fontFamily: "'Segoe UI', Roboto, sans-serif" 
    },
    card: { 
      backgroundColor: "#ffffff", 
      padding: "40px", 
      borderRadius: "12px", 
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)", 
      width: "100%", 
      maxWidth: "480px" 
    },
    title: { 
      color: "#1e293b", 
      marginBottom: "20px", 
      fontSize: "22px", 
      fontWeight: "600", 
      textAlign: "center" 
    },
    label: { 
      display: "block", 
      marginBottom: "5px", 
      fontSize: "13px", 
      color: "#64748b", 
      fontWeight: "600", 
      textTransform: "uppercase" 
    },
    input: { 
      width: "100%", 
      padding: "12px", 
      marginBottom: "20px", 
      borderRadius: "8px", 
      border: "1px solid #ddd", 
      fontSize: "15px", 
      boxSizing: "border-box", 
      outline: "none" 
    },
    btnPrimary: { 
      width: "100%", 
      padding: "12px", 
      backgroundColor: "#004a87", 
      color: "white", 
      border: "none", 
      borderRadius: "8px", 
      fontSize: "16px", 
      fontWeight: "bold", 
      cursor: "pointer", 
      marginBottom: "10px" 
    },
    btnVoltar: { 
      width: "100%", 
      background: "none", 
      border: "1px solid #cbd5e1", 
      color: "#64748b", 
      padding: "10px", 
      borderRadius: "8px", 
      cursor: "pointer", 
      fontSize: "14px" 
    },
    errorBox: { 
      backgroundColor: "#fee2e2", 
      color: "#b91c1c", 
      padding: "10px", 
      borderRadius: "6px", 
      marginBottom: "20px", 
      fontSize: "14px", 
      border: "1px solid #fecaca" 
    },
    successBox: { 
      backgroundColor: "#dcfce7", 
      color: "#15803d", 
      padding: "10px", 
      borderRadius: "6px", 
      marginBottom: "20px", 
      fontSize: "14px", 
      border: "1px solid #bbf7d0" 
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Cadastrar Novo Ônibus</h1>

        {erro && <div style={styles.errorBox}>⚠️ {erro}</div>}
        {sucesso && <div style={styles.successBox}>✅ {sucesso}</div>}

        <div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Saindo de:</label>
              <input 
                style={styles.input} 
                placeholder="Ex: Rio Pardo" 
                onChange={e => setOrigem(e.target.value)} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Destino:</label>
              <input 
                style={styles.input} 
                placeholder="Ex: Porto Alegre" 
                onChange={e => setDestino(e.target.value)} 
              />
            </div>
          </div>

          <label style={styles.label}>Categoria do Veículo</label>
          <select 
            style={{...styles.input, backgroundColor: "#fff"}} 
            onChange={e => setTipo(e.target.value)}
          >
            <option value="COMUM">🚌 Comum (Standard)</option>
            <option value="EXECUTIVO">⭐ Executivo (Ar/Leito)</option>
          </select>

          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Horário</label>
              <input 
                style={styles.input} 
                type="time"
                onChange={e => setHorarioSaida(e.target.value)} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Preço (R$)</label>
              <input 
                style={styles.input} 
                type="number"
                step="0.01"
                placeholder="14.50"
                onChange={e => setPrecoTicket(e.target.value)} 
              />
            </div>
          </div>

          <label style={styles.label}>Capacidade de Assentos</label>
          <input 
            style={styles.input} 
            type="number"
            placeholder="Ex: 46" 
            onChange={e => setQuantidadeAssentos(e.target.value)} 
          />
        </div>

        <button 
          style={styles.btnPrimary} 
          onClick={criar}
          onMouseOver={(e) => e.target.style.backgroundColor = "#003561"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#004a87"}
        >
          Confirmar Cadastro
        </button>

        <button style={styles.btnVoltar} onClick={() => navigate("/admin/onibus")}>
          Cancelar e Voltar
        </button>
      </div>
    </div>
  );
}

export default CriarOnibusPage;