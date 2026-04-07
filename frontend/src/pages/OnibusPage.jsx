import { useEffect, useState } from "react";
import "../styles/App.css";
import ListaOnibus from "../components/ListaOnibus";
import Assentos from "../components/Assentos";
import MinhasReservas from "../components/MinhasReservas";

function OnibusPage() {
  const [onibus, setOnibus] = useState([]);
  const [onibusSelecionado, setOnibusSelecionado] = useState(null);
  const [assentosOcupados, setAssentosOcupados] = useState([]);
  const [minhasReservas, setMinhasReservas] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
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

  const reservar = (numero) => {
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
    }).then(() => {
      buscarAssentos(onibusSelecionado.id);
      buscarReservas();
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

  // 🔥 TELA INICIAL (LISTA DE ÔNIBUS)
  if (!onibusSelecionado) {
    return (
      <div className="container">
        <button onClick={logout} className="logout">Sair</button>

        {/* 🔥 AQUI QUE FICA O USUÁRIO */}
        <p style={{ opacity: 0.7 }}>
          Logado como: {usuario?.nome} ({usuario?.role})
        </p>

        <ListaOnibus onibus={onibus} selecionar={selecionarOnibus} />
      </div>
    );
  }

  // 🔥 TELA DE ASSENTOS
  return (
    <div className="container">
      <button onClick={logout} className="logout">Sair</button>

      {/* 🔥 TAMBÉM AQUI */}
      <p style={{ opacity: 0.7 }}>
        Logado como: {usuario?.nome} ({usuario?.role})
      </p>

      <button onClick={() => setOnibusSelecionado(null)} className="voltar">
        Voltar
      </button>

      <Assentos
        onibus={onibusSelecionado}
        ocupados={assentosOcupados}
        reservar={reservar}
      />

      <MinhasReservas reservas={minhasReservas} cancelar={cancelar} />
    </div>
  );
}

export default OnibusPage;