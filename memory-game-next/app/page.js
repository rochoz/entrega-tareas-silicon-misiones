"use client";

import { useState, useEffect, useCallback } from "react";

const VALORES_BASE = [1, 2, 3, 4, 5, 6, 7, 8];

function crearTableroMezclado() {
  const cartas = [...VALORES_BASE, ...VALORES_BASE];
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas.map((valor, index) => ({
    id: index,
    valor,
    dadaVuelta: false,
    encontrada: false,
  }));
}

function formatearTiempo(segundosTotales) {
  const minutos = Math.floor(segundosTotales / 60);
  const segundos = segundosTotales % 60;
  return `${minutos}:${segundos.toString().padStart(2, "0")}`;
}

const EMOJIS = ["🍎", "🍋", "🍇", "🍉", "🍓", "🍒", "🍑", "🥝"];

export default function Page() {
  const [tablero, setTablero] = useState(() => crearTableroMezclado());
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [evaluando, setEvaluando] = useState(false);
  const [movimientos, setMovimientos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [partidaIniciada, setPartidaIniciada] = useState(false);
  const [victoria, setVictoria] = useState(false);

  useEffect(() => {
    if (!partidaIniciada || victoria) return;
    const intervalo = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [partidaIniciada, victoria]);

  useEffect(() => {
    if (seleccionadas.length !== 2) return;

    setEvaluando(true);
    const [primeraId, segundaId] = seleccionadas;
    const primera = tablero.find((f) => f.id === primeraId);
    const segunda = tablero.find((f) => f.id === segundaId);

    if (primera.valor === segunda.valor) {
      setTablero((prev) =>
        prev.map((f) =>
          f.id === primeraId || f.id === segundaId
            ? { ...f, encontrada: true }
            : f
        )
      );
      setMovimientos((prev) => prev + 1);
      setSeleccionadas([]);
      setEvaluando(false);
    } else {
      const timeout = setTimeout(() => {
        setTablero((prev) =>
          prev.map((f) =>
            f.id === primeraId || f.id === segundaId
              ? { ...f, dadaVuelta: false }
              : f
          )
        );
        setMovimientos((prev) => prev + 1);
        setSeleccionadas([]);
        setEvaluando(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [seleccionadas, tablero]);

  useEffect(() => {
    if (tablero.length > 0 && tablero.every((f) => f.encontrada)) {
      setVictoria(true);
    }
  }, [tablero]);

  const manejarClic = useCallback(
    (id) => {
      if (evaluando || victoria) return;

      const carta = tablero.find((f) => f.id === id);
      if (!carta || carta.dadaVuelta || carta.encontrada) return;
      if (seleccionadas.length >= 2) return;

      if (!partidaIniciada) {
        setPartidaIniciada(true);
      }

      setTablero((prev) =>
        prev.map((f) => (f.id === id ? { ...f, dadaVuelta: true } : f))
      );
      setSeleccionadas((prev) => [...prev, id]);
    },
    [evaluando, victoria, tablero, seleccionadas, partidaIniciada]
  );

  const reiniciarPartida = useCallback(() => {
    setTablero(crearTableroMezclado());
    setSeleccionadas([]);
    setEvaluando(false);
    setMovimientos(0);
    setSegundos(0);
    setPartidaIniciada(false);
    setVictoria(false);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex flex-col items-center px-4 py-6 sm:py-10">
      <header className="w-full max-w-2xl flex items-center justify-between gap-4 mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
          Memory Game
        </h1>
        <button
          onClick={reiniciarPartida}
          className="rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 px-4 py-2 text-sm font-medium hover:bg-cyan-500/20 hover:border-cyan-400/60 active:scale-95 transition-all duration-150"
        >
          Nueva partida
        </button>
      </header>

      <section
        className="grid gap-3 sm:gap-4 w-full max-w-2xl"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        aria-label="Tablero de juego"
      >
        {tablero.map((ficha) => {
          const visible = ficha.dadaVuelta || ficha.encontrada;
          return (
            <button
              key={ficha.id}
              onClick={() => manejarClic(ficha.id)}
              disabled={visible || evaluando || victoria}
              aria-label={
                visible ? `Carta ${EMOJIS[ficha.valor - 1]}` : "Carta oculta"
              }
              className="relative aspect-square w-full [perspective:1000px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
            >
              <div
                className="relative w-full h-full rounded-xl transition-transform duration-500 [transform-style:preserve-3d]"
                style={{
                  transform: visible ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-xl sm:text-2xl font-bold text-slate-500 [backface-visibility:hidden] shadow-md"
                >
                  ?
                </div>
                <div
                  className={`absolute inset-0 rounded-xl flex items-center justify-center text-3xl sm:text-4xl border shadow-md [backface-visibility:hidden] ${
                    ficha.encontrada
                      ? "bg-emerald-500/20 border-emerald-400/60"
                      : "bg-cyan-500/10 border-cyan-400/40"
                  }`}
                  style={{ transform: "rotateY(180deg)" }}
                >
                  {EMOJIS[ficha.valor - 1]}
                </div>
              </div>
            </button>
          );
        })}
      </section>

      <footer className="w-full max-w-2xl mt-8 sm:mt-10 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-5 py-4 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            Tiempo
          </p>
          <p className="text-2xl font-semibold text-cyan-300 tabular-nums">
            {formatearTiempo(segundos)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-5 py-4 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            Movimientos
          </p>
          <p className="text-2xl font-semibold text-emerald-300 tabular-nums">
            {movimientos}
          </p>
        </div>
      </footer>

      {victoria && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-victoria"
        >
          <div className="bg-slate-800 border border-slate-600 rounded-2xl px-8 py-10 max-w-sm w-full text-center shadow-2xl">
            <p className="text-4xl mb-3">🎉</p>
            <h2
              id="titulo-victoria"
              className="text-2xl font-bold text-emerald-300 mb-2"
            >
              ¡Lo lograste!
            </h2>
            <p className="text-slate-300 mb-6">
              Completaste el tablero en{" "}
              <span className="font-semibold text-cyan-300">
                {formatearTiempo(segundos)}
              </span>{" "}
              con{" "}
              <span className="font-semibold text-emerald-300">
                {movimientos}
              </span>{" "}
              movimientos.
            </p>
            <button
              onClick={reiniciarPartida}
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold px-4 py-3 hover:brightness-110 active:scale-95 transition-all duration-150"
            >
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}
    </main>
  );
}