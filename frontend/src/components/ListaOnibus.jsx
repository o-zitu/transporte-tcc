function ListaOnibus({ onibus, selecionar }) {
  return (
    <div>
      <h1>Ônibus disponíveis</h1>

      {onibus.map(bus => (
        <div
          key={bus.id}
          className="card"
          onClick={() => selecionar(bus)}
        >
          <h2>{bus.nome}</h2>
          <p>{bus.horarioSaida}</p>
        </div>
      ))}
    </div>
  );
}

export default ListaOnibus;