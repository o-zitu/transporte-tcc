import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function MotoristaPage() {
  const [onibusLista, setOnibusLista] = useState([]); 
  const [idOnibusSelecionado, setIdOnibusSelecionado] = useState(""); 
  const [reservas, setReservas] = useState([]); 
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  // 1. Busca os ônibus disponíveis
  useEffect(() => {
    fetch("http://localhost:8080/onibus")
      .then(res => res.json())
      .then(setOnibusLista)
      .catch(err => console.error("Erro ao carregar ônibus:", err));
  }, []);

  // 2. Busca as reservas do ônibus selecionado
  const buscarPassageiros = (id) => {
    if (!id) return;
    fetch(`http://localhost:8080/reservas/onibus/${id}`)
      .then(res => res.json())
      .then(dados => setReservas(dados))
      .catch(err => console.error("Erro ao carregar passageiros:", err));
  };

  const handleSelectOnibus = (e) => {
    const id = e.target.value;
    setIdOnibusSelecionado(id);
    buscarPassageiros(id);
  };

  // 3. Função para Confirmar o Embarque (Check-in)
  const confirmarEmbarque = (reserva) => {
    const reservaAtualizada = {
      id: reserva.id,
      dataReserva: reserva.dataReserva,
      numeroAssento: reserva.numeroAssento,
      status: "CONFIRMADA", 
      usuario: { id: reserva.usuario.id },
      onibus: { id: idOnibusSelecionado }
    };

    fetch("http://localhost:8080/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservaAtualizada)
    })
    .then(async (res) => {
      if (res.ok) {
        alert("Embarque confirmado!");
        
        // Atualiza o estado local para o card mudar de cor e sumir o botão
        setReservas(prev => prev.map(r => 
          r.id === reserva.id ? { ...r, status: "CONFIRMADA" } : r
        ));
      } else {
        // Se der erro 400 ou 500, lemos a mensagem de texto do Java
        const msgErro = await res.text();
        console.error("Erro do Servidor:", msgErro);
        alert(`Não foi possível confirmar: ${msgErro}`);
      }
    })
    .catch(err => {
      console.error("Erro na requisição:", err);
      alert("Erro de conexão com o servidor.");
    });
  };

  const styles = {
    page: { backgroundColor: "#f0f2f5", minHeight: "100vh", fontFamily: "'Segoe UI', Roboto, sans-serif" },
    navbar: { backgroundColor: "#ffffff", padding: "15px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "30px" },
    content: { maxWidth: "800px", margin: "0 auto", padding: "0 20px" },
    selectContainer: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
    select: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", outline: "none" },
    card: (status) => ({
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      borderLeft: `6px solid ${status === "CONFIRMADA" ? "#16a34a" : "#d97706"}`,
      transition: "all 0.3s ease"
    }),
    seatBadge: { backgroundColor: "#004a87", color: "white", padding: "10px 15px", borderRadius: "8px", fontSize: "18px", fontWeight: "bold" },
    btnCheckin: { backgroundColor: "#16a34a", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
    label: { fontSize: "11px", color: "#64748b", textTransform: "uppercase", display: "block" },
    value: { fontSize: "17px", color: "#1e293b", fontWeight: "600" }
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={{ color: "#004a87", margin: 0 }}>ZTRANSPORTES - Motorista</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span>👤 {usuarioLogado?.nome}</span>
          <button onClick={logout} style={{ padding: "8px 16px", backgroundColor: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "6px", cursor: "pointer" }}>Sair</button>
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.selectContainer}>
          <label style={{...styles.label, marginBottom: "8px"}}>Selecione sua Linha Atual:</label>
          <select style={styles.select} value={idOnibusSelecionado} onChange={handleSelectOnibus}>
            <option value="">-- Selecione o Ônibus --</option>
            {onibusLista.map(bus => (
              <option key={bus.id} value={bus.id}>
                {bus.origem} ➔ {bus.destino} ({bus.horarioSaida})
              </option>
            ))}
          </select>
        </div>

        {idOnibusSelecionado && (
          <>
            <h3 style={{ marginBottom: "20px", color: "#1e293b" }}>Passageiros para esta Viagem</h3>
            {reservas.length === 0 ? (
              <p style={{ textAlign: "center", opacity: 0.5 }}>Nenhuma reserva ativa para este ônibus.</p>
            ) : (
              reservas.map(r => (
                <div key={r.id} style={styles.card(r.status)}>
                  <div style={{ textAlign: "left" }}>
                    <span style={styles.label}>Passageiro</span>
                    <span style={styles.value}>{r.usuario?.nome}</span>
                    <span style={{ 
                      fontSize: "12px", 
                      color: r.status === "CONFIRMADA" ? "#16a34a" : "#d97706", 
                      fontWeight: "bold", 
                      display: "block", 
                      marginTop: "5px" 
                    }}>
                      {r.status === "CONFIRMADA" ? "● EMBARCADO" : "○ AGUARDANDO"}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ textAlign: "center" }}>
                      <span style={styles.label}>Assento</span>
                      <div style={styles.seatBadge}>{r.numeroAssento}</div>
                    </div>

                    {r.status !== "CONFIRMADA" && (
                      <button style={styles.btnCheckin} onClick={() => confirmarEmbarque(r)}>
                        CONFIRMAR
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MotoristaPage;