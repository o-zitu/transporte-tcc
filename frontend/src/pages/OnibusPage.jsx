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
  const [busca, setBusca] = useState("");
  const [assentoPrePretendido, setAssentoPrePretendido] = useState(null);
  const [voucher, setVoucher] = useState(null);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

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
    buscarAssentos(bus.id);
    buscarReservas();
  };

  // Abre o modal de confirmação de reserva (em vez de pagamento)
  const abrirConfirmacao = (numero) => {
    setAssentoPrePretendido(numero);
  };

  const realizarReserva = () => {
    fetch("http://localhost:8080/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numeroAssento: assentoPrePretendido,
        status: "ATIVA", // Status inicial conforme seu Enum
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
      buscarReservas();
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
        buscarAssentos(onibusSelecionado.id);
        buscarReservas();
      });
  };

  const onibusFiltrados = onibus.filter(bus => {
    const termo = busca.toLowerCase();
    const nomeSeguro = (bus.nome || "").toLowerCase();
    const origemSegura = (bus.origem || "").toLowerCase();
    const destinoSeguro = (bus.destino || "").toLowerCase();
    return nomeSeguro.includes(termo) || origemSegura.includes(termo) || destinoSeguro.includes(termo);
  });

  const styles = {
    page: { backgroundColor: "#f0f2f5", minHeight: "100vh", fontFamily: "'Segoe UI', Roboto, sans-serif", paddingBottom: "40px" },
    navbar: { backgroundColor: "#ffffff", padding: "15px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "30px" },
    content: { maxWidth: "1100px", margin: "0 auto", padding: "0 20px" },
    sectionCard: { backgroundColor: "#ffffff", borderRadius: "12px", padding: "25px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", marginBottom: "25px" },
    btnVoltar: { backgroundColor: "#64748b", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", marginBottom: "20px", fontWeight: "bold" },
    searchContainer: { position: 'relative', marginBottom: '20px' },
    inputBusca: { width: "100%", padding: "12px 15px 12px 40px", borderRadius: "25px", border: "1px solid #e2e8f0", fontSize: "15px", outline: "none" },
    searchIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' },
    modalConfirm: { backgroundColor: '#fff', width: '350px', padding: '30px', borderRadius: '16px', textAlign: 'center' },
    ticket: { backgroundColor: '#fff', width: '300px', padding: '20px', borderRadius: '10px', fontFamily: 'monospace', border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
    btnReserva: { width: '100%', padding: '14px', backgroundColor: '#004a87', color: 'white', border: 'none', borderRadius: '8px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }
  };

  const Header = () => (
    <nav style={styles.navbar}>
      <h2 style={{ color: "#004a87", margin: 0 }}>ZTRANSPORTES</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span style={{ fontWeight: "500" }}>👤 {usuario?.nome}</span>
        <button onClick={logout} style={{ padding: "8px 16px", backgroundColor: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "6px", cursor: "pointer" }}>Sair</button>
      </div>
    </nav>
  );

  return (
    <div style={styles.page}>
      <Header />

      {/* MODAL DE CONFIRMAÇÃO DE RESERVA */}
      {assentoPrePretendido && (
        <div style={styles.overlay}>
          <div style={styles.modalConfirm}>
            <h3 style={{marginTop: 0}}>Confirmar Reserva?</h3>
            <p>Assento: <strong>{assentoPrePretendido}</strong></p>
            <p style={{fontSize: '14px', color: '#64748b'}}>Ao confirmar, seu lugar ficará reservado. O pagamento será validado pelo motorista no embarque.</p>
            <button style={styles.btnReserva} onClick={realizarReserva}>
              CONFIRMAR LUGAR
            </button>
            <button 
              style={{background: 'none', border: 'none', color: '#64748b', marginTop: '15px', cursor: 'pointer'}} 
              onClick={() => setAssentoPrePretendido(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* VOUCHER DE RESERVA (RECIBO PENDENTE) */}
      {voucher && (
        <div style={styles.overlay}>
          <div style={styles.ticket}>
            <div style={{textAlign: 'center', borderBottom: '2px dashed #ccc', paddingBottom: '10px', marginBottom: '15px'}}>
              <h3 style={{margin:0}}>ZTRANSPORTES</h3>
              <small>VOUCHER DE RESERVA</small>
            </div>
            <p><strong>LINHA:</strong> {voucher.onibus?.nome || `${voucher.onibus?.origem} ➔ ${voucher.onibus?.destino}`}</p>
            <p><strong>ASSENTO:</strong> {voucher.numeroAssento}</p>
            <p><strong>VALOR:</strong> R$ {voucher.onibus?.precoTicket?.toFixed(2).replace('.', ',')}</p>
            <div style={{borderTop: '1px solid #eee', margin: '10px 0', paddingTop: '10px', textAlign: 'center'}}>
                <span style={{color: '#d97706', fontWeight: 'bold'}}>AGUARDANDO EMBARQUE</span>
            </div>
            <button style={{...styles.btnReserva, backgroundColor: '#64748b'}} onClick={() => setVoucher(null)}>
              FECHAR
            </button>
          </div>
        </div>
      )}
      
      <div style={styles.content}>
        {!onibusSelecionado ? (
          <div style={styles.sectionCard}>
            <h3 style={{ marginTop: 0 }}>Para onde vamos hoje?</h3>
            <div style={styles.searchContainer}>
              <span style={styles.searchIcon}>🔍</span>
              <input style={styles.inputBusca} placeholder="Busque por destino..." value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>
            <ListaOnibus onibus={onibusFiltrados} selecionar={selecionarOnibus} />
          </div>
        ) : (
          <>
            <button onClick={() => setOnibusSelecionado(null)} style={styles.btnVoltar}>← Voltar</button>
            
            <div style={styles.sectionCard}>
              <h3 style={{ marginTop: 0 }}>Localização atual deste ônibus</h3>
              <div style={{ height: "250px", borderRadius: "8px", overflow: "hidden", border: "1px solid #ddd", marginBottom: "10px" }}>
                <MapaPage />
              </div>
            </div>

            <div style={styles.sectionCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
                <h3 style={{ margin: 0 }}>Passagem: {onibusSelecionado.nome || `${onibusSelecionado.origem} ➔ ${onibusSelecionado.destino}`}</h3>
                <div style={{ textAlign: 'right' }}>
                   <small style={{color: '#64748b'}}>VALOR DA TARIFA</small>
                   <div style={{fontSize: '22px', fontWeight: 'bold', color: '#004a87'}}>R$ {onibusSelecionado.precoTicket?.toFixed(2).replace('.', ',')}</div>
                </div>
              </div>
              <Assentos onibus={onibusSelecionado} ocupados={assentosOcupados} reservar={abrirConfirmacao} />
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