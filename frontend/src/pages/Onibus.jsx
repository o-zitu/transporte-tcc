import { useEffect, useState } from "react";
import "../styles/app.css";

function Onibus() {
  const [reservas, setReservas] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(user);
    carregarReservas();
  }, []);

  function carregarReservas() {
    fetch("http://localhost:8080/reservas")
      .then(res => res.json())
      .then(data => setReservas(data));
  }

  function reservarAssento(numero) {
    fetch("http://localhost:8080/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        assento: numero,
        usuario: usuario
      })
    }).then(() => carregarReservas());
  }

  function cancelarReserva(id) {
    fetch(`http://localhost:8080/reservas/${id}`, {
      method: "DELETE"
    }).then(() => carregarReservas());
  }

  function estaOcupado(numero) {
    return reservas.some(r => r.assento === numero);
  }

  return (
    <div className="container">
      <h1>Ônibus disponíveis</h1>

      <div className="assentos">
        {[...Array(40)].map((_, i) => {
          const numero = i + 1;
          const ocupado = estaOcupado(numero);

          return (
            <button
              key={numero}
              onClick={() => reservarAssento(numero)}
              className={ocupado ? "ocupado" : "livre"}
            >
              {numero}
            </button>
          );
        })}
      </div>

      <h2>Minhas Reservas</h2>

      <div className="reservas">
        {reservas
          .filter(r => r.usuario?.id === usuario?.id)
          .map(r => (
            <div key={r.id} className="reserva">
              Assento {r.assento}
              <button onClick={() => cancelarReserva(r.id)}>
                Cancelar
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Onibus;