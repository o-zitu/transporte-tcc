import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

const iconOnibus = L.divIcon({
  className: "custom-div-icon",
  html: `
    <div style="
      background-color: #004a87; 
      width: 32px; 
      height: 32px; 
      border-radius: 50%; 
      border: 3px solid white; 
      box-shadow: 0 2px 8px rgba(0,0,0,0.3); 
      display: flex; 
      justify-content: center; 
      align-items: center;
      color: white;
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="4" width="16" height="12" rx="2"></rect>
        <path d="M7 20h.01"></path>
        <path d="M17 20h.01"></path>
        <path d="M16 8H8"></path>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const interpolar = (pA, pB, pct) => [
  pA[0] + (pB[0] - pA[0]) * pct,
  pA[1] + (pB[1] - pA[1]) * pct
];

function MapaPage() {
  const rotaReal = [
    [-29.719772406198786, -52.446986638352], [-29.717681912495806, -52.445569692484185],
    [-29.715887908009208, -52.4444941793559], [-29.715027960607244, -52.444203961527094],
    [-29.714004910137085, -52.444186889890545], [-29.71320425467099, -52.444460036081736],
    [-29.71318549221003, -52.444494795845756], [-29.71171760699786, -52.445041088228166],
    [-29.711080034008077, -52.44522887623452], [-29.709226601164467, -52.44538252096771],
    [-29.708900393443848, -52.44521180459796], [-29.708084869504255, -52.44514351804963],
    [-29.708084869504255, -52.44341928271645], [-29.708084869504255, -52.44143897282861],
    [-29.70808700097286, -52.44141754498915], [-29.708057345433467, -52.439129945635926],
    [-29.708057345433467, -52.4365862717291], [-29.70796837875988, -52.435613188422266],
    [-29.706811804838978, -52.43586926297587], [-29.70592212352789, -52.43624483898958],
    [-29.705506936218512, -52.43703013429007], [-29.705254857372402, -52.43749106848762],
    [-29.703653400509673, -52.438566581615916], [-29.70325303230353, -52.43901044417687],
    [-29.70289714811453, -52.44058103477789], [-29.70274886266335, -52.44122975698278],
    [-29.70141428375217, -52.44288570576768], [-29.700761816497483, -52.443261281781346],
    [-29.700669678132662, -52.44322714040878], [-29.700298955873976, -52.44317592549807],
    [-29.69983925837232, -52.44261256147803], [-29.698756736590056, -52.44203212582144],
    [-29.69862327419319, -52.44169069308194], [-29.698623508418855, -52.44050848019481],
    [-29.698662236944415, -52.43877857925614], [-29.698724202553002, -52.438359479544275],
    [-29.69915021508153, -52.43805630102881], [-29.69950651508006, -52.43745886101439],
    [-29.699537497629215, -52.43675441681745], [-29.69953608268621, -52.43675666143233], 
    [-29.69953608268621, -52.43572537713493], [-29.699526552789955, -52.43549498383463], 
    [-29.699421723875425, -52.43530573219529], [-29.69932642476654, -52.43513842277453], 
    [-29.699185858416065, -52.435141165552], [-29.699078646660652, -52.43521522054152], 
    [-29.699059586780308, -52.43535235941057], [-29.699078646660652, -52.43540721495832], 
    [-29.69937645681008, -52.435444353827396], [-29.699440783685887, -52.43572811991241], 
    [-29.699438401210223, -52.43604353931215], [-29.699350249551976, -52.43613953652023], 
    [-29.69916203359054, -52.43628490372177]
  ];

  const [posicao, setPosicao] = useState(rotaReal[0]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const totalPassos = 100; 
    const intervaloMs = 250; 

    const mover = setInterval(() => {
      setStep((prev) => {
        const proximo = prev + 1;
        const totalPontos = rotaReal.length - 1;
        const pontoAtualIdx = Math.floor(proximo / totalPassos) % totalPontos;
        const pct = (proximo % totalPassos) / totalPassos;

        const p1 = rotaReal[pontoAtualIdx];
        const p2 = rotaReal[pontoAtualIdx + 1];
        
        setPosicao(interpolar(p1, p2, pct));
        return proximo;
      });
    }, intervaloMs);

    return () => clearInterval(mover);
  }, []);

  return (
    <div style={{ height: "400px", width: "100%", position: "relative", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
      

      <div style={{
        position: "absolute",
        top: "15px",
        right: "15px",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "12px 18px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        borderLeft: "6px solid #004a87",
        fontFamily: "sans-serif"
      }}>
        <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>Linha Atual</div>
        <div style={{ fontSize: "15px", color: "#1e293b", fontWeight: "bold" }}>Rio Pardo ↔ UNISC</div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "5px", gap: '6px' }}>
          <span style={{ height: "10px", width: "10px", backgroundColor: "#22c55e", borderRadius: "50%", boxShadow: '0 0 5px #22c55e' }}></span>
          <span style={{ fontSize: "12px", color: "#15803d", fontWeight: "600" }}>Monitoramento Ativo</span>
        </div>
      </div>

      <MapContainer 
        center={[-29.708, -52.440]} 
        zoom={15} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

        <Polyline positions={rotaReal} color="#cbd5e1" weight={8} opacity={0.4} />
        <Polyline positions={rotaReal} color="#004a87" weight={4} opacity={0.8} />

        <Marker position={posicao} icon={iconOnibus} />
      </MapContainer>
    </div>
  );
}

export default MapaPage;