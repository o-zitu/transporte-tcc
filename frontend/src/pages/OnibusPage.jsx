import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importado useNavigate
import "../styles/App.css";
import ListaOnibus from "../components/ListaOnibus";
import Assentos from "../components/Assentos";
import MinhasReservas from "../components/MinhasReservas";
import MapaPage from "../pages/MapaPage";

function OnibusPage() {
  const [onibus, setOnibus] = useState([]);
  const [onibusSelecionado, setOnibusSelecionado] = useState(null);
  const [assentosOcupados, setAssentosOcupados] = useState([]);
  const [assentosSelecionados, setAssentosSelecionados] = useState([]);
  const [minhasReservas, setMinhasReservas] = useState([]);

  const navigate = useNavigate(); // Inicializado useNavigate
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // --- LOGOUT ATUALIZADO PARA MANDAR PRO LOGIN ---
  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login"); 
  };

  useEffect(() => {
    fetch("http://localhost:8080/onibus")
      .then(res => res.json())
      .then(setOnibus);
  }, []);

  const buscarAssentos = (id) => {
    fetch(`http://localhost:8080/onibus/${id}/assentos-ocupados`)
      .then(res => res.json())
      .then(data => setAssentosOcupados(data.map(Number)));
  };

  const buscarReservas = () => {
    fetch("http://localhost:8080/reservas")
      .then(res => res.json())
      .then(data => {
        const minhas = data.filter(r => r.usuario?.id === usuario.id);
        setMinhasReservas(minhas);
      });
  };

  const selecionarOnibus = (bus) => {
    setOnibusSelecionado(bus);
    setAssentosSelecionados([]);
    buscarAssentos(bus.id);
    buscarReservas();
  };

  const reservar = (numero) => {
    setAssentosSelecionados([numero]);
    fetch("http://localhost:8080/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numeroAssento: numero,
        status: "ATIVA",
        usuario: { id: usuario.id },
        onibus: { id: onibusSelecionado.id }
      })
    }).then(() => {
      buscarAssentos(onibusSelecionado.id);
      buscarReservas();
      setAssentosSelecionados([]);
    });
  };

  const cancelar = (id) => {
    fetch(`http://localhost:8080/reservas/${id}`, {
      method: "DELETE"
    }).then(() => {
      buscarAssentos(onibusSelecionado.id);
      buscarReservas();
    });
  };

  const styles = {
    page: {
      backgroundColor: "#f0f2f5",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      paddingBottom: "40px"
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
    userName: { color: "#1e293b", fontSize: "14px", fontWeight: "500" },
    btnLogout: {
      padding: "8px 16px",
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      border: "1px solid #fecaca",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    content: { maxWidth: "1100px", margin: "0 auto", padding: "0 20px" },
    sectionCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "25px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      marginBottom: "25px"
    },
    btnVoltar: {
      backgroundColor: "#64748b",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      marginBottom: "20px",
      fontWeight: "bold"
    },
    emptyReservas: {
      textAlign: "center",
      color: "#94a3b8",
      padding: "20px",
      border: "2px dashed #e2e8f0",
      borderRadius: "8px"
    }
  };

  const Header = () => (
    <nav style={styles.navbar}>
      <h2 style={{ color: "#004a87", margin: 0 }}>ZTRANSPORTES</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span style={styles.userName}>
          👤 {usuario?.nome} <span style={{ opacity: 0.6 }}>({usuario?.role})</span>
        </span>
        <button onClick={logout} style={styles.btnLogout}>Sair</button>
      </div>
    </nav>
  );

  if (!onibusSelecionado) {
    return (
      <div style={styles.page}>
        <Header />
        <div style={styles.content}>
          <div style={styles.sectionCard}>
            <h3 style={{ marginTop: 0, color: "#1e293b" }}>Ônibus Disponíveis</h3>
            <ListaOnibus onibus={onibus} selecionar={selecionarOnibus} />
          </div>
          <div style={styles.sectionCard}>
            <h3 style={{ color: "#1e293b" }}>Localização em Tempo Real</h3>
            <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #ddd" }}>
              <MapaPage />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Header />
      <div style={styles.content}>
        <button onClick={() => setOnibusSelecionado(null)} style={styles.btnVoltar}>
          ← Voltar para a Lista
        </button>

        <div style={styles.sectionCard}>
          <h3 style={{ marginTop: 0 }}>Passagem para: {onibusSelecionado.nome}</h3>

          <Assentos
            onibus={onibusSelecionado}
            ocupados={assentosOcupados}
            selecionados={assentosSelecionados}
            reservar={reservar}
          />
        </div>

        <div style={styles.sectionCard}>
          <h3 style={{ marginTop: 0, color: "#1e293b" }}>Minhas Reservas</h3>
          {minhasReservas.length > 0 ? (
            <MinhasReservas reservas={minhasReservas} cancelar={cancelar} />
          ) : (
            <div style={styles.emptyReservas}>
              Nenhum assento selecionado ainda. Clique em uma poltrona livre para reservar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OnibusPage;