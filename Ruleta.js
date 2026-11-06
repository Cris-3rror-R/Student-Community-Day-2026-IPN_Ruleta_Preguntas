const Ruleta = (() => {
    const Lienzo = document.getElementById("LienzoRuleta");
    const Contexto = Lienzo ? Lienzo.getContext("2d") : null;
    const Centro = 250;
    const RadioExterior = 230;
    const RadioInterior = 68;
    let PreguntasRuleta = [];
    let AnguloInicial = 0;
    let EstaGirando = false;

    function Dibujar() {
        if (!Contexto || PreguntasRuleta.length === 0) {
            return;
        }

        const AnchoSector = (Math.PI * 2) / PreguntasRuleta.length;
        Contexto.clearRect(0, 0, Lienzo.width, Lienzo.height);

        PreguntasRuleta.forEach((Pregunta, Indice) => {
            const AnguloInicio = AnguloInicial + Indice * AnchoSector - Math.PI / 2;
            const AnguloFin = AnguloInicio + AnchoSector;
            Contexto.beginPath();
            Contexto.moveTo(Centro, Centro);
            Contexto.arc(Centro, Centro, RadioExterior, AnguloInicio, AnguloFin);
            Contexto.closePath();
            Contexto.fillStyle = `hsl(${(Indice * 360) / PreguntasRuleta.length}, 78%, 56%)`;
            Contexto.fill();
            Contexto.strokeStyle = "#10172a";
            Contexto.lineWidth = 3;
            Contexto.stroke();

            const AnguloTexto = AnguloInicio + AnchoSector / 2;
            const RadioTexto = (RadioExterior + RadioInterior) / 2;
            Contexto.save();
            Contexto.translate(
                Centro + Math.cos(AnguloTexto) * RadioTexto,
                Centro + Math.sin(AnguloTexto) * RadioTexto
            );
            Contexto.fillStyle = "#ffffff";
            Contexto.font = "700 18px Inter, Arial, sans-serif";
            Contexto.textAlign = "center";
            Contexto.textBaseline = "middle";
            Contexto.fillText(
                `Pregunta ${Pregunta.IdPregunta}`,
                0,
                0,
                Math.max(80, RadioTexto * AnchoSector * 1.8)
            );
            Contexto.restore();
        });

        Contexto.beginPath();
        Contexto.arc(Centro, Centro, RadioInterior, 0, Math.PI * 2);
        Contexto.fillStyle = "#ffffff";
        Contexto.fill();
        Contexto.strokeStyle = "#ffffff";
        Contexto.lineWidth = 3;
        Contexto.stroke();
    }

    function NormalizarAngulo(Angulo) {
        return ((Angulo % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    }

    function Inicializar(ListaPreguntas) {
        if (!Lienzo || !Contexto) {
            return false;
        }
        PreguntasRuleta = ListaPreguntas;
        Dibujar();
        return true;
    }

    function Girar(IndicesDisponibles, AlDetenerse) {
        if (EstaGirando || IndicesDisponibles.length === 0) {
            return false;
        }

        EstaGirando = true;
        const IndiceElegido = IndicesDisponibles[
            Math.floor(Math.random() * IndicesDisponibles.length)
        ];
        const AnchoSector = (Math.PI * 2) / PreguntasRuleta.length;
        const AnguloObjetivo = NormalizarAngulo(-(IndiceElegido + 0.5) * AnchoSector);
        const Diferencia = NormalizarAngulo(AnguloObjetivo - NormalizarAngulo(AnguloInicial));
        const AnguloFinal = AnguloInicial + (5 + Math.floor(Math.random() * 3)) * Math.PI * 2 + Diferencia;
        const AnguloInicio = AnguloInicial;
        const Duracion = 4300 + Math.random() * 700;
        const InicioAnimacion = performance.now();

        function Animar(MarcaDeTiempo) {
            const Progreso = Math.min((MarcaDeTiempo - InicioAnimacion) / Duracion, 1);
            const ProgresoSuave = 1 - Math.pow(1 - Progreso, 4);
            AnguloInicial = AnguloInicio + (AnguloFinal - AnguloInicio) * ProgresoSuave;
            Dibujar();

            if (Progreso < 1) {
                requestAnimationFrame(Animar);
                return;
            }

            AnguloInicial = NormalizarAngulo(AnguloFinal);
            EstaGirando = false;
            Dibujar();
            AlDetenerse(IndiceElegido);
        }

        requestAnimationFrame(Animar);
        return true;
    }

    return { Inicializar, Girar };
})();
