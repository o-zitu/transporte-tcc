import React from "react";

function MinhasReservas({ reservas, cancelar }) {
  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "15px",
      marginTop: "10px"
    },
    ticket: {
      backgroundColor: "#ffffff",
      borderLeft: "5px solid #004a87",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    },
    headerTicket: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px dashed #e2e8f0",
      paddingBottom: "8px",
      marginBottom: "5px"
    },
    btnCancelar: {
      marginTop: "5px",
      padding: "6px",
      backgroundColor: "#fff1f1",
      color: "#c53030",
      border: "1px solid #feb2b2",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "11px",
      fontWeight: "bold"
    }
  };

  return (
    <div style={styles.container}>
      {reservas.map((res) => (
        <div key={res.id} style={styles.ticket}>
          <div style={styles.headerTicket}>
            <div>
              <p style={{ fontSize: "11px", color: "#64748b", margin: 0, textTransform: "uppercase" }}>Assento</p>
              <span style={{ fontSize: "20px", fontWeight: "bold", color: "#004a87" }}>{res.numeroAssento}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "11px", color: "#64748b", margin: 0, textTransform: "uppercase" }}>Tarifa</p>
              <span style={{ fontSize: "16px", fontWeight: "bold", color: "#16a34a" }}>R$ 15,50</span>
            </div>
          </div>
          <button 
            style={styles.btnCancelar}
            onClick={() => cancelar(res.id)}
          >
            CANCELAR RESERVA
          </button>
        </div>
      ))}
    </div>
  );
}

export default MinhasReservas;