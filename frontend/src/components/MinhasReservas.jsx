function MinhasReservas({ reservas, cancelar }) {
  return (
    <div>
      <h2>Minhas Reservas</h2>

      {reservas.map(r => (
        <div key={r.id}>
          Assento {r.numeroAssento}
          <button onClick={() => cancelar(r.id)}>
            Cancelar
          </button>
        </div>
      ))}
    </div>
  );
}

export default MinhasReservas;