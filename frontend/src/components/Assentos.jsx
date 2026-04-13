import React from "react";
import busImage from "../assets/onibus_silhueta.png"; 

function Assentos({ onibus, ocupados, reservar }) {
  // Criamos a lista de assentos de 1 até o limite
  const listaAssentos = Array.from({ length: onibus.quantidadeAssentos }, (_, i) => i + 1);
  
  // Agrupa os assentos em colunas de 4
  const colunas = [];
  for (let i = 0; i < listaAssentos.length; i += 4) {
    colunas.push(listaAssentos.slice(i, i + 4));
  }
  
  // Invertemos a ordem das colunas para o "1" começar na frente (lado direito da imagem)
  const colunasParaRenderizar = [...colunas].reverse();

  const styles = {
    wrapper: {
      width: "100%",
      overflowX: "auto",
      padding: "10px 0",
      display: "flex",
      justifyContent: "center"
    },
    stage: {
      position: "relative",
      width: "820px", 
      height: "300px",
      backgroundImage: `url(${busImage})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      // Ajuste fino para alinhar as poltronas dentro do desenho
      paddingRight: "85px", 
      paddingLeft: "30px",
    },
    coluna: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginRight: "10px", 
    },
    corredor: {
      height: "32px", 
    },
    poltrona: (isOcupado) => ({
      width: "34px",
      height: "34px",
      borderRadius: "6px",
      border: isOcupado ? "1px solid #cbd5e1" : "1px solid #004a87",
      backgroundColor: isOcupado ? "#94a3b8" : "#ffffff",
      color: isOcupado ? "#ffffff" : "#004a87",
      cursor: isOcupado ? "not-allowed" : "pointer",
      fontWeight: "bold",
      fontSize: "11px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      transition: "0.2s"
    })
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.stage}>
        {colunasParaRenderizar.map((col, idx) => (
          <div key={idx} style={styles.coluna}>
            {/* Linha 1 (Janela Superior) */}
            <button 
              style={styles.poltrona(ocupados.includes(col[0]))}
              onClick={() => !ocupados.includes(col[0]) && reservar(col[0])}
            >
              {col[0]}
            </button>
            
            {/* Linha 2 (Corredor Superior) */}
            {col[1] && (
              <button 
                style={styles.poltrona(ocupados.includes(col[1]))}
                onClick={() => !ocupados.includes(col[1]) && reservar(col[1])}
              >
                {col[1]}
              </button>
            )}

            {/* Vão do Corredor Central */}
            <div style={styles.corredor} />

            {/* Linha 3 (Corredor Inferior) */}
            {col[2] && (
              <button 
                style={styles.poltrona(ocupados.includes(col[2]))}
                onClick={() => !ocupados.includes(col[2]) && reservar(col[2])}
              >
                {col[2]}
              </button>
            )}

            {/* Linha 4 (Janela Inferior) */}
            {col[3] && (
              <button 
                style={styles.poltrona(ocupados.includes(col[3]))}
                onClick={() => !ocupados.includes(col[3]) && reservar(col[3])}
              >
                {col[3]}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assentos;