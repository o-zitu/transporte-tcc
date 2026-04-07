function Assentos({ onibus, ocupados, reservar }) {
  return (
    <div>
      <h1>{onibus.nome}</h1>

      <div className="grid">
        {[...Array(onibus.quantidadeAssentos)].map((_, i) => {
          const numero = i + 1;
          const ocupado = ocupados.includes(numero);

          return (
            <button
              key={numero}
              onClick={() => !ocupado && reservar(numero)}
              className={`assento ${ocupado ? "ocupado" : "livre"}`}
            >
              {numero}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Assentos;