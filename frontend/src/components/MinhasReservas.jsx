import React from "react";

function MinhasReservas({ reservas, cancelar }) {
  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "15px",
      marginTop: "10px"
    },
    // Estilo dinâmico para o card baseado no status
    ticket: (status) => ({
      backgroundColor: "#ffffff",
      borderLeft: `5px solid ${status === "CONFIRMADA" ? "#16a34a" : "#d97706"}`,
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }),
    headerTicket: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px dashed #e2e8f0",
      paddingBottom: "8px",
      marginBottom: "5px"
    },
    busInfo: {
      fontSize: "13px",
      color: "#1e293b",
      fontWeight: "600",
      margin: "5px 0"
    },
    // Estilo do texto de status
    statusLabel: (status) => ({
      fontSize: "11px",
      fontWeight: "bold",
      color: status === "CONFIRMADA" ? "#16a34a" : "#d97706",
      marginTop: "5px",
      textAlign: "center",
      padding: "4px",
      backgroundColor: status === "CONFIRMADA" ? "#f0fdf4" : "#fffbeb",
      borderRadius: "4px"
    }),
    btnCancelar: {
      marginTop: "10px",
      padding: "6px",
      backgroundColor: "#fff1f1",
      color: "#c53030",
      border: "1px solid #feb2b2",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "11px",
      fontWeight: "bold",
      transition: "0.2s"
    }
  };

  return (
    <div style={styles.container}>
      {reservas.map((res) => {
        const isConfirmada = res.status === "CONFIRMADA";

        return (
          <div key={res.id} style={styles.ticket(res.status)}>
            <div style={styles.headerTicket}>
              <div>
                <p style={{ fontSize: "10px", color: "#64748b", margin: 0, textTransform: "uppercase" }}>Assento</p>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "#004a87" }}>{res.numeroAssento}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "10px", color: "#64748b", margin: 0, textTransform: "uppercase" }}>Tarifa</p>
                <span style={{ 
                    fontSize: "16px", 
                    fontWeight: "bold", 
                    color: isConfirmada ? "#16a34a" : "#d97706" 
                }}>
                  R$ {res.onibus?.precoTicket?.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <div style={styles.busInfo}>
              | 🚌 {res.onibus?.origem} ➔ {res.onibus?.destino}
            </div>
            
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              🕒 Saída: {res.onibus?.horarioSaida}
            </div>

            {/* AVISO DE STATUS DINÂMICO */}
            <div style={styles.statusLabel(res.status)}>
              {isConfirmada ? "✅ EMBARQUE CONFIRMADO" : "⏳ AGUARDANDO COBRADOR"}
            </div>

            {/* Só permite cancelar se não tiver sido confirmada/paga ainda */}
            {!isConfirmada && (
              <button 
                style={styles.btnCancelar}
                onClick={() => cancelar(res.id)}
                onMouseOver={(e) => e.target.style.backgroundColor = "#fee2e2"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#fff1f1"}
              >
                CANCELAR RESERVA
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MinhasReservas;