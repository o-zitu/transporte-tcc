import { useEffect, useState } from "react";
import "../styles/App.css";

function MotoristaPage() {
  const [reservas, setReservas] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  useEffect(() => {
    fetch("http://localhost:8080/reservas")
      .then(res => res.json())
      .then(setReservas);
  }, []);

  return (
    <div className="container">
      <button onClick={logout} className="logout">Sair</button>

      <h1>Painel do Motorista</h1>

      <p style={{ opacity: 0.7 }}>
        Logado como: {usuario?.nome} ({usuario?.role})
      </p>

      {reservas.map(r => (
        <div key={r.id} className="card">
          <p><strong>Passageiro:</strong> {r.usuario?.nome}</p>
          <p><strong>Assento:</strong> {r.numeroAssento}</p>
          <p><strong>Ônibus:</strong> {r.onibus?.nome}</p>
        </div>
      ))}
    </div>
  );
}

export default MotoristaPage;