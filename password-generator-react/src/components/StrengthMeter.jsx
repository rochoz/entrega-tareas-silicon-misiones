function StrengthMeter({ password, longitud, opciones }) {
  function calcularFortaleza() {
    let puntos = 0;
    if (opciones.conMayusculas) puntos++;
    if (opciones.conMinusculas) puntos++;
    if (opciones.conNumeros) puntos++;
    if (opciones.conSimbolos) puntos++;
    if (longitud >= 12) puntos++;

    if (puntos <= 1) return "Muy débil";
    if (puntos === 2) return "Débil";
    if (puntos === 3) return "Media";
    return "Fuerte";
  }

  if (!password) return null;

  return (
    <div className="fila">
      <span>FORTALEZA</span>
      <span>{calcularFortaleza()}</span>
    </div>
  );
}
export default StrengthMeter;

function calcularColor(puntos) {
  if (puntos <= 1) return "#ff6b6b";
  if (puntos === 2) return "#ffa94d";
  if (puntos === 3) return "#ffd43b";
  return "#69db7c";
}


