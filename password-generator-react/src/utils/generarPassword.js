export function generarPassword(longitud, opciones) {
  let permitidos = "";

  if (opciones.conMayusculas) permitidos += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (opciones.conMinusculas) permitidos += "abcdefghijklmnopqrstuvwxyz";
  if (opciones.conNumeros) permitidos += "0123456789";
  if (opciones.conSimbolos) permitidos += "!@#$%^&*";

  let resultado = "";
  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * permitidos.length);
    resultado += permitidos[indice];
  }

  return resultado;
}