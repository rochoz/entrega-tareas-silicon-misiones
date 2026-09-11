const area = document.querySelector("#texto");
const caracteres = document.querySelector("#caracteres");
const palabras = document.querySelector("#palabras");
const sinEspacios = document.querySelector("#sinEspacios");
const restantes = document.querySelector("#restantes");

console.log(area);
console.log(caracteres);
console.log(palabras);
console.log(sinEspacios);
console.log(restantes);

area.addEventListener("input", actualizar);

function actualizar() {
  console.log(area.value);
}


const LIMITE = 20;

function actualizar() {
  caracteres.textContent = area.value.length;

  const t = area.value.trim();
  if (t === "") {
    palabras.textContent = 0;
  } else {
    palabras.textContent = t.split(/\s+/).length;
  }

  sinEspacios.textContent = area.value.replaceAll(" ", "").length;

  restantes.textContent = LIMITE - area.value.length;

  if (area.value.length > LIMITE) {
    restantes.classList.add("excedido");
  } else {
    restantes.classList.remove("excedido");
  }
}


const boton = document.querySelector("#limpiar");

boton.addEventListener("click", function () {
  area.value = "";
  actualizar();
});

