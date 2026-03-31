import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [onibus, setOnibus] = useState([]);
  const [onibusSelecionado, setOnibusSelecionado] = useState(null);
  const [assentosOcupados, setAssentosOcupados] = useState([]);
  const [reservas, setReservas] = useState([]);

  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // 🔥 proteção básica
  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, []);

  // 🔥 carregar ônibus
  useEffect(() => {
    fetch("http://localhost:8080/onibus")
      .then(res => res.json())
      .then(data => setOnibus(data));
  }, []);

  // 🔥 carregar reservas do usuário
  const carregarReservas = () => {
    fetch("http://localhost:8080/reservas")
      .then(res => res.json())
      .then(data => {
        const minhas = data.filter(r => r.usuario?.id === usuario?.id);
        setReservas(minhas);
      });
  };

  useEffect(() => {
    if (usuario) carregarReservas();
  }, []);

  // 🔥 buscar assentos ocupados
  const buscarAssentos = (id) => {
    fetch(`http://localhost:8080/onibus/${id}/assentos-ocupados`)
      .then(res => res.json())
      .then(data => setAssentosOcupados(data.map(Number)));
  };

  // 🔥 selecionar ônibus
  const selecionarOnibus = (bus) => {
    setOnibusSelecionado(bus);
    buscarAssentos(bus.id);
  };

  // 🔥 reservar
  const reservarAssento = (numero) => {
    fetch("http://localhost:8080/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        numeroAssento: numero,
        status: "ATIVA",
        usuario: { id: usuario.id },
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
        alert("Reservado!");
        buscarAssentos(onibusSelecionado.id);
        carregarReservas();
      })
      .catch(err => alert(err.message));
  };

  // 🔥 cancelar reserva
  const cancelarReserva = (id) => {
    fetch(`http://localhost:8080/reservas/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        alert("Cancelado!");
        carregarReservas();
        if (onibusSelecionado) {
          buscarAssentos(onibusSelecionado.id);
        }
      });
  };

  // 🔥 logout
  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  // 🔥 tela de assentos
  if (onibusSelecionado) {
    return (
      <div style={styles.container}>
        <h1>Assentos do ônibus {onibusSelecionado.nome}</h1>

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
      </div>
    );
  }

  // 🔥 tela principal
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

      <h2>Minhas Reservas</h2>

      {reservas.map(r => (
        <div key={r.id} style={{ margin: "10px" }}>
          Assento {r.numeroAssento}
          <button onClick={() => cancelarReserva(r.id)}>
            Cancelar
          </button>
        </div>
      ))}
    </div>
  );
}

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