import React from "react";

function ListaOnibus({ onibus, selecionar }) {
  const styles = {
    container: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "10px" },
    card: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" },
    infoContainer: { textAlign: "left" },
    nomeOnibus: { margin: 0, fontSize: "18px", color: "#004a87", fontWeight: "bold" },
    horario: { margin: "5px 0 0 0", fontSize: "14px", color: "#64748b", display: "flex", alignItems: "center", gap: "5px" },
    seta: { color: "#004a87", fontSize: "20px", fontWeight: "bold" }
  };

  return (
    <div style={styles.container}>
      {onibus.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>Nenhum ônibus encontrado para esta rota.</p>
      ) : (
        onibus.map((bus) => (
          <div
            key={bus.id}
            style={styles.card}
            onClick={() => selecionar(bus)}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#004a87";
              e.currentTarget.style.backgroundColor = "#f8fafc";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.04)";
            }}
          >
            <div style={styles.infoContainer}>
              {/* AJUSTE AQUI: Se bus.nome não existir, usamos origem e destino */}
              <h2 style={styles.nomeOnibus}>
                {bus.nome ? bus.nome : `${bus.origem} ➔ ${bus.destino}`}
              </h2>
              
              <p style={styles.horario}>
                🕒 Saída: <strong>{bus.horarioSaida}</strong>
              </p>
            </div>
            
            <div style={styles.seta}>→</div>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaOnibus;