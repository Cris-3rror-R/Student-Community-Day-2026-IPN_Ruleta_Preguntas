const BotonGirar = document.getElementById("BotonGirar");
const EstadoJuego = document.getElementById("EstadoJuego");
const SeccionRuleta = document.getElementById("SeccionRuleta");
const SeccionPregunta = document.getElementById("SeccionPregunta");
const TextoPregunta = document.getElementById("TextoPregunta");
const ContenedorRespuestas = document.getElementById("ContenedorRespuestas");
const MensajeResultado = document.getElementById("MensajeResultado");
const BarraTemporizador = document.getElementById("BarraTemporizador");
const ProgresoTemporizador = BarraTemporizador.querySelector(".ProgresoTemporizador");
const Enfriamientos = new Map();
const GirosDeEspera = 5;
const DuracionRespuesta = 20;
let PreguntaActiva = false;
let IntervaloTemporizador = null;
let TiempoInicioPregunta = 0;
let TemporizadorResultado = null;

function MostrarError(Mensaje) {
    EstadoJuego.textContent = Mensaje;
    EstadoJuego.classList.add("EstadoError");
    BotonGirar.disabled = true;
    console.error(Mensaje);
}

function ValidarPreguntas() {
    if (!Array.isArray(Preguntas) || Preguntas.length < GirosDeEspera + 1) {
        return "Se necesitan al menos seis preguntas para respetar los cinco giros de espera.";
    }

    const Identificadores = new Set(Preguntas.map((Pregunta) => Pregunta.IdPregunta));
    if (Identificadores.size !== Preguntas.length) {
        return "Hay identificadores de preguntas repetidos en Preguntas.js.";
    }

    for (const Pregunta of Preguntas) {
        const RespuestasPregunta = Respuestas.filter(
            (Respuesta) => Respuesta.IdPregunta === Pregunta.IdPregunta
        );
        if (
            RespuestasPregunta.length !== 4
            || RespuestasPregunta.filter((Respuesta) => Respuesta.Correcta === true).length !== 1
        ) {
            return `La pregunta ${Pregunta.IdPregunta} debe tener cuatro respuestas y exactamente una correcta.`;
        }
    }

    return "";
}

function MezclarRespuestas(ListaRespuestas) {
    const RespuestasMezcladas = [...ListaRespuestas];
    for (let Indice = RespuestasMezcladas.length - 1; Indice > 0; Indice--) {
        const IndiceAleatorio = Math.floor(Math.random() * (Indice + 1));
        [RespuestasMezcladas[Indice], RespuestasMezcladas[IndiceAleatorio]] =
            [RespuestasMezcladas[IndiceAleatorio], RespuestasMezcladas[Indice]];
    }
    return RespuestasMezcladas;
}

function RegistrarPreguntaElegida(IndicePregunta) {
    for (const [IdPregunta, GirosRestantes] of Enfriamientos) {
        if (GirosRestantes <= 1) {
            Enfriamientos.delete(IdPregunta);
        } else {
            Enfriamientos.set(IdPregunta, GirosRestantes - 1);
        }
    }

    const Pregunta = Preguntas[IndicePregunta];
    Enfriamientos.set(Pregunta.IdPregunta, GirosDeEspera);
    MostrarPregunta(Pregunta);
}

function MostrarPregunta(Pregunta) {
    PreguntaActiva = true;
    TextoPregunta.textContent = Pregunta.Descripcion;
    MensajeResultado.textContent = "";
    MensajeResultado.className = "MensajeResultado";
    BarraTemporizador.setAttribute("aria-valuenow", DuracionRespuesta);
    ProgresoTemporizador.style.transform = "scaleX(1)";
    ActualizarColorTemporizador(DuracionRespuesta);
    ContenedorRespuestas.replaceChildren();

    const RespuestasPregunta = Respuestas.filter(
        (Respuesta) => Respuesta.IdPregunta === Pregunta.IdPregunta
    );

    MezclarRespuestas(RespuestasPregunta).forEach((Respuesta, Indice) => {
        const BotonRespuesta = document.createElement("button");
        BotonRespuesta.type = "button";
        BotonRespuesta.className = "BotonRespuesta";
        BotonRespuesta.textContent = Respuesta.Descripcion;
        BotonRespuesta.setAttribute("aria-label", `Respuesta ${Indice + 1}: ${Respuesta.Descripcion}`);
        BotonRespuesta.addEventListener("click", () => EvaluarRespuesta(Respuesta));
        ContenedorRespuestas.append(BotonRespuesta);
    });

    SeccionRuleta.hidden = true;
    SeccionPregunta.hidden = false;
    ContenedorRespuestas.querySelector("button")?.focus();
    IniciarTemporizador();
}

function EvaluarRespuesta(RespuestaElegida) {
    if (!PreguntaActiva) {
        return;
    }

    PreguntaActiva = false;
    DetenerTemporizador();
    DeshabilitarRespuestas();

    if (RespuestaElegida.Correcta) {
        MostrarResultado("¡RESPUESTA CORRECTA!", "RespuestaCorrecta");
    } else {
        MostrarResultado("RESPUESTA INCORRECTA", "RespuestaIncorrecta");
    }

    TemporizadorResultado = window.setTimeout(() => {
        SeccionPregunta.hidden = true;
        SeccionRuleta.hidden = false;
        BotonGirar.disabled = false;
        EstadoJuego.textContent = "Presiona el botón para elegir otra pregunta.";
        BotonGirar.focus();
    }, 1400);
}

function IniciarTemporizador() {
    DetenerTemporizador();
    TiempoInicioPregunta = performance.now();
    ActualizarTemporizador();
    IntervaloTemporizador = window.setInterval(ActualizarTemporizador, 100);
}

function ActualizarTemporizador() {
    const SegundosTranscurridos = (performance.now() - TiempoInicioPregunta) / 1000;
    const SegundosRestantes = Math.max(0, DuracionRespuesta - SegundosTranscurridos);
    const ProporcionRestante = SegundosRestantes / DuracionRespuesta;

    BarraTemporizador.setAttribute("aria-valuenow", Math.ceil(SegundosRestantes));
    ProgresoTemporizador.style.transform = `scaleX(${ProporcionRestante})`;
    ActualizarColorTemporizador(SegundosRestantes);

    if (SegundosRestantes === 0) {
        PreguntaActiva = false;
        DetenerTemporizador();
        MostrarResultado("TIEMPO AGOTADO", "RespuestaIncorrecta");
        DeshabilitarRespuestas();
        TemporizadorResultado = window.setTimeout(() => {
            SeccionPregunta.hidden = true;
            SeccionRuleta.hidden = false;
            BotonGirar.disabled = false;
            EstadoJuego.textContent = "Presiona el botón para elegir otra pregunta.";
            BotonGirar.focus();
        }, 1400);
    }
}

function ActualizarColorTemporizador(SegundosRestantes) {
    const ClasesColor = [
        "ProgresoVerde",
        "ProgresoAmarillo",
        "ProgresoRojo"
    ];
    ProgresoTemporizador.classList.remove(...ClasesColor);

    let ClaseColor;
    if (SegundosRestantes > 8) {
        ClaseColor = "ProgresoVerde";
    } else if (SegundosRestantes > 4) {
        ClaseColor = "ProgresoAmarillo";
    } else {
        ClaseColor = "ProgresoRojo";
    }
    ProgresoTemporizador.classList.add(ClaseColor);
    ProgresoTemporizador.classList.add(ClaseColor);
}

function DetenerTemporizador() {
    if (IntervaloTemporizador !== null) {
        window.clearInterval(IntervaloTemporizador);
        IntervaloTemporizador = null;
    }
}

function MostrarResultado(Texto, ClaseResultado) {
    MensajeResultado.textContent = Texto;
    MensajeResultado.classList.add(ClaseResultado);
}

function DeshabilitarRespuestas() {
    const BotonesRespuesta = ContenedorRespuestas.querySelectorAll("button");
    BotonesRespuesta.forEach((BotonRespuesta) => {
        BotonRespuesta.disabled = true;
    });
}

function GirarRuleta() {
    if (PreguntaActiva || BotonGirar.disabled) {
        return;
    }

    const IndicesDisponibles = Preguntas
        .map((Pregunta, Indice) => ({ Pregunta, Indice }))
        .filter(({ Pregunta }) => !Enfriamientos.has(Pregunta.IdPregunta))
        .map(({ Indice }) => Indice);

    if (IndicesDisponibles.length === 0) {
        MostrarError("No hay preguntas disponibles. Agrega más preguntas para continuar.");
        return;
    }

    BotonGirar.disabled = true;
    EstadoJuego.textContent = "La ruleta está girando...";
    const GiroIniciado = Ruleta.Girar(IndicesDisponibles, RegistrarPreguntaElegida);
    if (!GiroIniciado) {
        MostrarError("No se pudo iniciar la ruleta. Recarga la página e inténtalo de nuevo.");
    }
}

const ErrorDeValidacion = ValidarPreguntas();
if (ErrorDeValidacion) {
    MostrarError(ErrorDeValidacion);
} else if (!Ruleta.Inicializar(Preguntas)) {
    MostrarError("No se pudo iniciar el lienzo de la ruleta en este navegador.");
} else {
    BotonGirar.addEventListener("click", GirarRuleta);
}
