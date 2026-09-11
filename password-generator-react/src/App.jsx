import { useState } from 'react'
import './App.css'

import PasswordDisplay from "./components/PasswordDisplay";
import OptionsForm from "./components/OptionsForm";
import StrengthMeter from "./components/StrengthMeter";
import { generarPassword as generar } from "./utils/generarPassword";

function App() {
  const [password, setPassword] = useState("");
  const [longitud, setLongitud] = useState(10);
  const [conMayusculas, setConMayusculas] = useState(true);
  const [conMinusculas, setConMinusculas] = useState(true);
  const [conNumeros, setConNumeros] = useState(true);
  const [conSimbolos, setConSimbolos] = useState(false);
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [historial, setHistorial] = useState([]);

  function generarPassword() {
    const ningunaOpcion = !conMayusculas && !conMinusculas && !conNumeros && !conSimbolos;

    if (ningunaOpcion || longitud === 0) {
      setError("Marcá al menos una opción");
      return;
    }

    setError("");

    const nueva = generar(longitud, {
      conMayusculas, conMinusculas, conNumeros, conSimbolos,
    });
    setPassword(nueva);
    setHistorial((anterior) => [nueva, ...anterior].slice(0, 5));
  }

  function copiarPassword() {
    if (!password) return;

    navigator.clipboard.writeText(password);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <main className="pagina">
      <h1>Generador de contraseñas</h1>
      <section className="tarjeta">
        <PasswordDisplay password={password} onCopiar={copiarPassword} copiado={copiado} />

        <OptionsForm
          longitud={longitud} setLongitud={setLongitud}
          conMayusculas={conMayusculas} setConMayusculas={setConMayusculas}
          conMinusculas={conMinusculas} setConMinusculas={setConMinusculas}
          conNumeros={conNumeros} setConNumeros={setConNumeros}
          conSimbolos={conSimbolos} setConSimbolos={setConSimbolos}
        />

        <StrengthMeter
          password={password}
          longitud={longitud}
          opciones={{ conMayusculas, conMinusculas, conNumeros, conSimbolos }}
        />

        {error && <p className="error">{error}</p>}

        <button className="boton-generar" onClick={generarPassword}>
          GENERAR →
        </button>

        <ul>
          {historial.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
