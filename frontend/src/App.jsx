import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

function App() {
  const [onibus, setOnibus] = useState([]);
  const [onibusSelecionado, setOnibusSelecionado] = useState(null);
  const [assentosOcupados, setAssentosOcupados] = useState([]);
  const [minhasReservas, setMinhasReservas] = useState([]);

  // 🔥 pega usuário logado
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // 🔥 segurança básica (se não tiver logado)
  if (!usuario) {
    window.location.href = "/";
    return null;
  }

  // 🔥 carregar ônibus
  useEffect(() => {
    fetch("http://localhost:8080/onibus")
      .then(res => res.json())
      .then(data => setOnibus(data));
  }, []);

  // 🔥 buscar assentos ocupados
  const buscarAssentos = (id) => {
    fetch(`http://localhost:8080/onibus/${id}/assentos-ocupados`)
      .then(res => res.json())
      .then(data => setAssentosOcupados(data.map(Number)));
  };

  // 🔥 buscar minhas reservas
  const buscarMinhasReservas = () => {
    fetch("http://localhost:8080/reservas")
      .then(res => res.json())
      .then(data => {
        const minhas = data.filter(r => r.usuario?.id === usuario.id);
        setMinhasReservas(minhas);
      });
  };

  // 🔥 selecionar ônibus
  const selecionarOnibus = (bus) => {
    setOnibusSelecionado(bus);
    buscarAssentos(bus.id);
    buscarMinhasReservas();
  };

  // 🔥 reservar assento
  const reservarAssento = (numero) => {
    fetch("http://localhost:8080/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        numeroAssento: numero,
        status: "ATIVA",
        usuario: { id: usuario.id }, // 🔥 AGORA DINÂMICO
        onibus: { id: onibusSelecionado.id }
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => { throw new Error(text) });
        }
        return res.json();
      })
      .then(() => {
        alert("Reservado 😎");
        buscarAssentos(onibusSelecionado.id);
        buscarMinhasReservas();
      })
      .catch(err => alert(err.message));
  };

  // 🔥 cancelar reserva
  const cancelarReserva = (id) => {
    fetch(`http://localhost:8080/reservas/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        alert("Cancelado 👍");
        buscarAssentos(onibusSelecionado.id);
        buscarMinhasReservas();
      });
  };

  // 🔥 logout
  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  // 🔥 tela de assentos
  if (onibusSelecionado) {
    return (
      <div style={styles.container}>
        <h1>Ônibus {onibusSelecionado.nome}</h1>

        <button onClick={() => setOnibusSelecionado(null)}>
          Voltar
        </button>

        <div style={styles.grid}>
          {[...Array(onibusSelecionado.quantidadeAssentos)].map((_, i) => {
            const numero = i + 1;
            const ocupado = assentosOcupados.includes(numero);

            return (
              <button
                key={numero}
                onClick={() => !ocupado && reservarAssento(numero)}
                style={{
                  ...styles.assento,
                  backgroundColor: ocupado ? "red" : "green"
                }}
              >
                {numero}
              </button>
            );
          })}
        </div>

        <h2>Minhas Reservas</h2>

        {minhasReservas.map(r => (
          <div key={r.id}>
            Assento {r.numeroAssento}
            <button onClick={() => cancelarReserva(r.id)}>
              Cancelar
            </button>
          </div>
        ))}
      </div>
    );
  }

  // 🔥 tela inicial
  return (
    <div style={styles.container}>
      <h1>Ônibus disponíveis</h1>

      <button onClick={logout}>Logout</button>

      {onibus.map(bus => (
        <div
          key={bus.id}
          style={styles.card}
          onClick={() => selecionarOnibus(bus)}
        >
          <h2>{bus.nome}</h2>
          <p>Saída: {bus.horarioSaida}</p>
          <p>Assentos: {bus.quantidadeAssentos}</p>
        </div>
      ))}
    </div>
  );
}

// 🎨 estilos básicos
const styles = {
  container: {
    textAlign: "center",
    color: "white",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    padding: "20px"
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    margin: "20px auto",
    width: "300px",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 60px)",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px"
  },
  assento: {
    width: "60px",
    height: "60px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold"
  }
};

export default App;