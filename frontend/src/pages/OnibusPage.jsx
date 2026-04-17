import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import ListaOnibus from "../components/ListaOnibus";
import Assentos from "../components/Assentos";
import MinhasReservas from "../components/MinhasReservas";
import MapaPage from "../pages/MapaPage";

function OnibusPage() {
  const [onibus, setOnibus] = useState([]);
  const [onibusSelecionado, setOnibusSelecionado] = useState(null);
  const [assentosOcupados, setAssentosOcupados] = useState([]);
  const [minhasReservas, setMinhasReservas] = useState([]);
  // Removi o estado de busca aqui
  const [assentoPrePretendido, setAssentoPrePretendido] = useState(null);
  const [voucher, setVoucher] = useState(null);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  // BUSCAR RESERVAS (Criada fora para ser reutilizada)
  const buscarReservas = () => {
    fetch("http://localhost:8080/reservas")
      .then(res => res.json())
      .then(data => {
        const minhas = data.filter(r => r.usuario?.id === usuario.id);
        setMinhasReservas(minhas);
      })
      .catch(err => console.error("Erro ao buscar reservas:", err));
  };

  // Carrega ônibus e reservas assim que a página abre
  useEffect(() => {
    fetch("http://localhost:8080/onibus")
      .then(res => res.json())
      .then(setOnibus);
    
    buscarReservas(); // <-- CHAMADA ADICIONADA AQUI PARA CARREGAR NO LOGIN
  }, []);

  const buscarAssentos = (id) => {
    fetch(`http://localhost:8080/reservas/onibus/${id}`)
      .then(res => res.json())
      .then(data => {
        const numeros = data.map(reserva => Number(reserva.numeroAssento));
        setAssentosOcupados(numeros);
      });
  };

  const selecionarOnibus = (bus) => {
    setOnibusSelecionado(bus);
    buscarAssentos(bus.id);
    // buscarReservas() já foi chamada no início, mas pode manter aqui se quiser atualizar
  };

  const realizarReserva = () => {
    fetch("http://localhost:8080/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numeroAssento: assentoPrePretendido,
        status: "ATIVA",
        usuario: { id: usuario.id },
        onibus: { id: onibusSelecionado.id }
      })
    })
    .then(async res => {
      if (!res.ok) {
        const erroMsg = await res.text();
        throw new Error(erroMsg || "Erro ao processar reserva");
      }
      return res.json();
    })
    .then((reservaSalva) => {
      const reservaCompleta = { ...reservaSalva, onibus: onibusSelecionado };
      buscarAssentos(onibusSelecionado.id);
      buscarReservas(); // Atualiza a lista após reservar
      setVoucher(reservaCompleta);
      setAssentoPrePretendido(null);
    })
    .catch(err => {
      alert("Erro ao realizar reserva: " + err.message);
    });
  };

  const cancelar = (id) => {
    fetch(`http://localhost:8080/reservas/${id}`, { method: "DELETE" })
      .then(() => {
        if(onibusSelecionado) buscarAssentos(onibusSelecionado.id);
        buscarReservas();
      });
  };

  const styles = {
    page: { backgroundColor: "#f0f2f5", minHeight: "100vh", fontFamily: "'Segoe UI', Roboto, sans-serif", paddingBottom: "40px" },
    navbar: { backgroundColor: "#ffffff", padding: "15px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "30px" },
    content: { maxWidth: "1100px", margin: "0 auto", padding: "0 20px" },
    sectionCard: { backgroundColor: "#ffffff", borderRadius: "12px", padding: "25px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", marginBottom: "25px" },
    btnVoltar: { backgroundColor: "#64748b", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", marginBottom: "20px", fontWeight: "bold" },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' },
    modalConfirm: { backgroundColor: '#fff', width: '350px', padding: '30px', borderRadius: '16px', textAlign: 'center' },
    ticket: { backgroundColor: '#fff', width: '300px', padding: '20px', borderRadius: '10px', fontFamily: 'monospace', border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
    btnReserva: { width: '100%', padding: '14px', backgroundColor: '#004a87', color: 'white', border: 'none', borderRadius: '8px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={{ color: "#004a87", margin: 0 }}>ZTRANSPORTES</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontWeight: "500" }}>👤 {usuario?.nome}</span>
          <button onClick={logout} style={{ padding: "8px 16px", backgroundColor: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "6px", cursor: "pointer" }}>Sair</button>
        </div>
      </nav>

      {/* MODAL CONFIRMAÇÃO */}
      {assentoPrePretendido && (
        <div style={styles.overlay}>
          <div style={styles.modalConfirm}>
            <h3 style={{marginTop: 0}}>Confirmar Reserva?</h3>
            <p>Assento: <strong>{assentoPrePretendido}</strong></p>
            <button style={styles.btnReserva} onClick={realizarReserva}>CONFIRMAR LUGAR</button>
            <button style={{background: 'none', border: 'none', color: '#64748b', marginTop: '15px', cursor: 'pointer'}} onClick={() => setAssentoPrePretendido(null)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* VOUCHER */}
      {voucher && (
        <div style={styles.overlay}>
          <div style={styles.ticket}>
            <h3 style={{textAlign: 'center'}}>VOUCHER</h3>
            <p><strong>LINHA:</strong> {voucher.onibus?.nome || `${voucher.onibus?.origem} ➔ ${voucher.onibus?.destino}`}</p>
            <p><strong>ASSENTO:</strong> {voucher.numeroAssento}</p>
            <button style={{...styles.btnReserva, backgroundColor: '#64748b'}} onClick={() => setVoucher(null)}>FECHAR</button>
          </div>
        </div>
      )}
      
      <div style={styles.content}>
        {!onibusSelecionado ? (
          <div style={styles.sectionCard}>
            <h3 style={{ marginTop: 0 }}>Para onde vamos hoje?</h3>
            {/* INPUT DE BUSCA REMOVIDO DAQUI */}
            <ListaOnibus onibus={onibus} selecionar={selecionarOnibus} />
          </div>
        ) : (
          <>
            <button onClick={() => setOnibusSelecionado(null)} style={styles.btnVoltar}>← Voltar</button>
            
            <div style={styles.sectionCard}>
              <h3 style={{ marginTop: 0 }}>Localização atual</h3>
              <div style={{ height: "250px", borderRadius: "8px", overflow: "hidden", border: "1px solid #ddd" }}>
                <MapaPage />
              </div>
            </div>

            <div style={styles.sectionCard}>
              <h3 style={{ margin: 0 }}>Passagem: {onibusSelecionado.origem} ➔ {onibusSelecionado.destino}</h3>
              <Assentos onibus={onibusSelecionado} ocupados={assentosOcupados} reservar={setAssentoPrePretendido} />
            </div>
          </>
        )}

        <div style={styles.sectionCard}>
          <h3 style={{ marginTop: 0 }}>Minhas Reservas</h3>
          <MinhasReservas reservas={minhasReservas} cancelar={cancelar} />
        </div>
      </div>
    </div>
  );
}

export default OnibusPage;