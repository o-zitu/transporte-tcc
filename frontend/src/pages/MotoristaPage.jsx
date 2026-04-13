import { useEffect, useState } from "react";
import "../styles/App.css";

function MotoristaPage() {
  const [reservas, setReservas] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  useEffect(() => {
    fetch("http://localhost:8080/reservas")
      .then(res => res.json())
      .then(setReservas);
  }, []);

  // --- ESTILOS "SANTA CRUZ" ---
  const styles = {
    page: {
      backgroundColor: "#f0f2f5",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Roboto, sans-serif",
    },
    navbar: {
      backgroundColor: "#ffffff",
      padding: "15px 5%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "30px"
    },
    content: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "0 20px"
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      borderLeft: "5px solid #004a87" // Detalhe em azul para destacar
    },
    infoGroup: {
      textAlign: "left"
    },
    seatBadge: {
      backgroundColor: "#004a87",
      color: "white",
      padding: "10px 20px",
      borderRadius: "8px",
      fontSize: "20px",
      fontWeight: "bold"
    },
    label: {
      fontSize: "12px",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "1px",
      display: "block",
      marginBottom: "4px"
    },
    value: {
      fontSize: "18px",
      color: "#1e293b",
      fontWeight: "600"
    },
    btnLogout: {
      padding: "8px 16px",
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      border: "1px solid #fecaca",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold"
    }
  };

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={{ color: "#004a87", margin: 0 }}>Painel do Motorista</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "14px", fontWeight: "500" }}>
            👤 {usuario?.nome}
          </span>
          <button onClick={logout} style={styles.btnLogout}>Sair</button>
        </div>
      </nav>

      <div style={styles.content}>
        <h3 style={{ marginBottom: "20px", color: "#1e293b" }}>Passageiros Confirmados</h3>
        
        {reservas.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.5 }}>Nenhuma reserva encontrada no momento.</p>
        )}

        {reservas.map(r => (
          <div key={r.id} style={styles.card}>
            <div style={styles.infoGroup}>
              <span style={styles.label}>Passageiro</span>
              <span style={styles.value}>{r.usuario?.nome}</span>
              
              <div style={{ marginTop: "10px" }}>
                <span style={styles.label}>Ônibus</span>
                <span style={{ fontSize: "14px", color: "#64748b" }}>{r.onibus?.nome}</span>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <span style={styles.label}>Assento</span>
              <div style={styles.seatBadge}>{r.numeroAssento}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MotoristaPage;