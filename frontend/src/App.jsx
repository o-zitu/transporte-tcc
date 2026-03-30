import { useEffect, useState } from "react";

function App() {
  const [onibus, setOnibus] = useState([]);
  const [onibusSelecionado, setOnibusSelecionado] = useState(null);
  const [assentosOcupados, setAssentosOcupados] = useState([]);

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
      .then(data => {
        console.log("ASSENTOS OCUPADOS:", data);
        setAssentosOcupados(data.map(Number)); // 🔥 garante número
      });
  };

  // 🔥 clicar no ônibus
  const selecionarOnibus = (bus) => {
    setOnibusSelecionado(bus);
    buscarAssentos(bus.id);
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
        usuario: { id: 1 }, // 🔥 fixo por enquanto
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
        alert("Reservado com sucesso!");
        buscarAssentos(onibusSelecionado.id); // 🔥 atualiza
      })
      .catch(err => alert(err.message));
  };

  // 🔥 tela de assentos
  if (onibusSelecionado) {
    return (
      <div style={styles.container}>
        <h1>Assentos do ônibus {onibusSelecionado.id}</h1>

        <button onClick={() => setOnibusSelecionado(null)}>
          Voltar
        </button>

        <div style={styles.grid}>
          {[...Array(onibusSelecionado.quantidadeAssentos)].map((_, i) => {
            const numero = i + 1;

            const ocupado = assentosOcupados.includes(Number(numero));

            return (
              <button
                key={numero}
                onClick={() => !ocupado && reservarAssento(numero)}
                style={{
                  ...styles.assento,
                  backgroundColor: ocupado ? "red" : "green",
                  cursor: ocupado ? "not-allowed" : "pointer"
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

  // 🔥 tela inicial (ônibus)
  return (
    <div style={styles.container}>
      <h1>Ônibus disponíveis</h1>

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

// 🎨 estilos (pra não sofrer com CSS kkkkk)
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