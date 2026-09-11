function OptionsForm({
  longitud, setLongitud,
  conMayusculas, setConMayusculas,
  conMinusculas, setConMinusculas,
  conNumeros, setConNumeros,
  conSimbolos, setConSimbolos,
}) {
  return (
    <div className="formulario">
      <div className="fila">
        <span>Longitud</span>
        <span className="numero-grande">{longitud}</span>
      </div>
      <input
        type="range"
        min="0"
        max="20"
        value={longitud}
        onChange={(e) => setLongitud(Number(e.target.value))}
      />

      <label>
        <input
          type="checkbox"
          checked={conMayusculas}
          onChange={(e) => setConMayusculas(e.target.checked)}
        />
        Incluir mayúsculas
      </label>

      <label>
        <input
          type="checkbox"
          checked={conMinusculas}
          onChange={(e) => setConMinusculas(e.target.checked)}
        />
        Incluir minúsculas
      </label>

      <label>
        <input
          type="checkbox"
          checked={conNumeros}
          onChange={(e) => setConNumeros(e.target.checked)}
        />
        Incluir números
      </label>

      <label>
        <input
          type="checkbox"
          checked={conSimbolos}
          onChange={(e) => setConSimbolos(e.target.checked)}
        />
        Incluir símbolos
      </label>
    </div>
  );
}

export default OptionsForm;