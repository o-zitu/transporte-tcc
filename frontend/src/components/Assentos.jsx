import React from "react";

function Assentos({ onibus, ocupados, reservar }) {
  const listaAssentos = Array.from({ length: onibus.quantidadeAssentos }, (_, i) => i + 1);
  
  const colunas = [];
  for (let i = 0; i < listaAssentos.length; i += 4) {
    colunas.push(listaAssentos.slice(i, i + 4));
  }
  
  const colunasRender = [...colunas].reverse();

  const COR_BORDA_ONIBUS = "#1e293b"; 
  const COR_FUNDO_ONIBUS = "#f8fafc"; 
  const COR_AZUL_SANTA_CRUZ = "#004a87"; 
  const COR_FAROL = "#64748b"; 

  const styles = {
    busFrame: {
      margin: "40px auto",
      width: "fit-content",
      padding: "25px 120px 25px 30px", 
      backgroundColor: COR_FUNDO_ONIBUS,
      borderRadius: "20px 160px 160px 20px", 
      position: "relative",
      display: "flex",
      gap: "12px",
      border: `3px solid ${COR_BORDA_ONIBUS}`,
      boxShadow: "8px 8px 0px rgba(0,0,0,0.05)", 
    },
    cabin: {
      width: "60px",
      borderLeft: `2px dashed ${COR_BORDA_ONIBUS}44`,
      marginLeft: "15px",
      position: "relative",
    },
    steeringWheel: {
      position: "absolute",
      top: "0px",
      right: "0px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      border: `3px double ${COR_BORDA_ONIBUS}`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10
    },
    headlight: {
      position: "absolute",
      right: "35px", 
      width: "12px",
      height: "30px",
      backgroundColor: COR_FAROL,
      borderRadius: "50%",
      boxShadow: "none", 
      zIndex: 5,
      border: `1px solid ${COR_BORDA_ONIBUS}`,
    },
    coluna: {
      display: "flex",
      flexDirection: "column",
      gap: "10px", 
    },
    corredor: {
      height: "30px", 
    },
    poltrona: (num) => {
      const isOcupado = ocupados.includes(num);
      return {
        width: "44px", // Aumentei levemente para caber o texto do preço
        height: "44px",
        borderRadius: "8px", 
        border: isOcupado ? "none" : `2px solid ${COR_AZUL_SANTA_CRUZ}`,
        backgroundColor: isOcupado ? "#94a3b8" : "#ffffff",
        color: isOcupado ? "#ffffff" : COR_AZUL_SANTA_CRUZ,
        cursor: isOcupado ? "not-allowed" : "pointer",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.2s",
        boxShadow: isOcupado ? "none" : "0 3px 0px #003561",
      };
    }
  };

  return (
    <div style={{ overflowX: "auto", padding: "20px 0" }}>
      <div style={styles.busFrame}>
        
        <div style={{ display: "flex", gap: "10px" }}>
          {colunasRender.map((col, idx) => (
            <div key={idx} style={styles.coluna}>
              {[0, 1].map(i => col[i] && (
                <button 
                  key={col[i]}
                  disabled={ocupados.includes(col[i])}
                  style={styles.poltrona(col[i])}
                  onClick={() => reservar(col[i])}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.1' }}>
                    <span style={{ fontSize: '13px' }}>{col[i]}</span>
                    {!ocupados.includes(col[i]) && (
                      <span style={{ fontSize: '7px', fontWeight: 'normal', opacity: 0.8 }}>R$ 15,50</span>
                    )}
                  </div>
                </button>
              ))}

              <div style={styles.corredor} />

              {[2, 3].map(i => col[i] && (
                <button 
                  key={col[i]}
                  disabled={ocupados.includes(col[i])}
                  style={styles.poltrona(col[i])}
                  onClick={() => reservar(col[i])}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.1' }}>
                    <span style={{ fontSize: '13px' }}>{col[i]}</span>
                    {!ocupados.includes(col[i]) && (
                      <span style={{ fontSize: '7px', fontWeight: 'normal', opacity: 0.8 }}>R$ 15,50</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div style={styles.cabin}>
          <div style={styles.steeringWheel}>
             <div style={{width: 18, height: 18, border: `2px solid ${COR_BORDA_ONIBUS}`, borderRadius: '50%'}} />
          </div>
        </div>

        <div style={{...styles.headlight, top: '45px'}} />
        <div style={{...styles.headlight, bottom: '45px'}} />

      </div>
    </div>
  );
}

export default Assentos;