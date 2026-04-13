import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Ícone de Ônibus Vermelho (mais visível no mapa)
const iconOnibus = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png", 
  iconSize: [35, 35],
  iconAnchor: [17, 17],
});

function MapaPage() {
  // ROTA REAL: Centro -> UNISC (seguindo ruas principais como a Marechal Floriano/Av. Independência)
  const rotaUnisc = [
    [-29.7183, -52.4267], // Início (Centro - Marechal Floriano)
    [-29.7155, -52.4230], // Subindo a Marechal
    [-29.7128, -52.4195], // Cruzamento Galvão Costa
    [-29.7085, -52.4140], // Av. Independência
    [-29.7040, -52.4100], // Próximo ao Monumento do Imigrante
    [-29.7010, -52.4065], // Chegando na UNISC
    [-29.6995, -52.4045], // Entrada Principal UNISC
  ];

  const [index, setIndex] = useState(0);
  const [posicaoAtual, setPosicaoAtual] = useState(rotaUnisc[0]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % rotaUnisc.length);
    }, 2500); // Velocidade da simulação
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    setPosicaoAtual(rotaUnisc[index]);
  }, [index]);

  return (
    <div style={{ height: "400px", width: "100%", position: "relative", borderRadius: "12px", overflow: "hidden" }}>
      
      {/* Legenda Customizada (Estilo Santa Cruz) */}
      <div style={{
        position: "absolute",
        top: "15px",
        right: "15px",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "12px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderLeft: "5px solid #004a87",
        fontFamily: "sans-serif"
      }}>
        <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>Linha Atual</div>
        <div style={{ fontSize: "14px", color: "#1e293b", fontWeight: "bold" }}>Centro ↔ UNISC</div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
          <span style={{ height: "8px", width: "8px", backgroundColor: "#22c55e", borderRadius: "50%", marginRight: "6px" }}></span>
          <span style={{ fontSize: "12px", color: "#15803d", fontWeight: "600" }}>Em trânsito</span>
        </div>
      </div>

      <MapContainer 
        center={[-29.710, -52.415]} 
        zoom={14} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Linha tracejada da rota para ficar profissional */}
        <Polyline positions={rotaUnisc} color="#004a87" weight={3} opacity={0.6} dashArray="5, 10" />

        <Marker position={posicaoAtual} icon={iconOnibus}>
          <Popup>
            <strong>Transporte Universitário</strong><br />
            Próxima parada: UNISC
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapaPage;