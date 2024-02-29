const nombre = document.getElementById("name");
const ci = document.getElementById("cedula");
const edad = document.getElementById("edad");
const municipio = document.getElementById("municipio")
const registerbutton = document.getElementById("register");
const listaAsistencia= document.getElementById("lista_Asistencia")
const seleccion = document.getElementById("seleccionados");
const btn = document.getElementById("agregar");
const btnSelecciona = document.getElementById("btnSeleccionar");
const podio = document.getElementById("podio");
const btnSimular = document.getElementById("btnSimular");
const labelHFinalizacion = document.getElementById("horaFinalPrimero")
const labelTCompetencia = document.getElementById("tiempoCompePrimero")
const labelNombre = document.getElementById("nombrep1");
const seleccionados = document.getElementById("seleccionados");
let tiempoInicioCaminata;
let tiempoInicioNatacion;
let tiempoInicioCiclismo;
let participantes = [];
let number =0;
let nuevo_participante= []

registerbutton.addEventListener("click", registrar)

function registrar() {
    
    if((nombre.value&&ci.value&&edad.value&&municipio.value) !== ""){
        number = number + 1;
    nuevo_participante = [nombre.value,ci.value,edad.value,municipio.value,number]
    participantes.push(nuevo_participante)
    } else{
        alert("Datos faltantes")
    }
    AgregarAsistencia(participantes)

}
function AgregarAsistencia(participantes) {
    listaAsistencia.innerHTML=""
    participantes.forEach(e => {
        listaAsistencia.innerHTML = listaAsistencia.innerHTML + `<span> #${e[4]} ${e[0]} </span>`
        console.log(listaAsistencia.innerHTML, participantes)
    });
}    

function seleccionarAleatorio() {
  // Validaciones...
  const items = listaAsistencia.querySelectorAll("span");
  const participantesSeleccionados = [];
  
  items.forEach(item => {
    const random = Math.random();
    if (random < 0.5) {  
      const nombreParticipante = item.textContent; // Obtener el nombre del participante
      const horaFinalizacion = obtenerHoraFinalizacion();
      const duracionCompetencia = obtenerDuracionCompetencia();
      
      const participanteSeleccionado = {
        nombre: nombreParticipante,
        horaFinalizacion: horaFinalizacion,
        duracionCompetencia: duracionCompetencia

      };
      
      participantesSeleccionados.push(participanteSeleccionado);
    }
  });
  
  mostrarSeleccionados(participantesSeleccionados);

}
function obtenerHoraFinalizacion() {
  const tiempoInicial = 8 * 3600; // Hora inicial: 8:00 a.m.
  const tiempoAleatorio = Math.floor(Math.random() * 3600); // Generar un tiempo aleatorio entre 0 y 1 hora en segundos
  const tiempoFinal = tiempoInicial + tiempoTotal + tiempoAleatorio; // Calcular la hora final sumando el tiempo aleatorio

  const horas = Math.floor(tiempoFinal / 3600);
  const minutos = Math.floor((tiempoFinal % 3600) / 60);
  const segundos = Math.round(tiempoFinal % 60);

  return `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}
 
function obtenerDuracionCompetencia() {
  const horas = Math.floor(tiempoTotal / 3600);
  const minutos = Math.floor((tiempoTotal % 3600) / 60);
  const segundos = Math.round(tiempoTotal % 60);

  return `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}

function mostrarSeleccionados(participantesSeleccionados) {
  seleccionados.innerHTML = "";
  
  participantesSeleccionados.forEach(participante => {
    const nombre = participante.nombre;
    const horaFinalizacion = participante.horaFinalizacion;
    const duracionCompetencia = participante.duracionCompetencia;
    
    seleccionados.innerHTML += `<span>Nombre: ${nombre} | Hora de finalización: ${horaFinalizacion} | Duración de competencia: ${duracionCompetencia}</span>`;
  });
}

document.getElementById("btnSeleccionar").addEventListener("click", seleccionarAleatorio);

const CAMINATA_VEL = 7; // en km/h
const NATACION_VEL = 1.72; // en m/s (aproximadamente 6.192 km/h)
const CICLISMO_VEL = 45; // en km/h

const CAMINATA_DIST = 10; // en km
const NATACION_DIST = 10; // en km
const CICLISMO_DIST = 30; // en km

// Función para simular cada etapa
function simularEtapa(velocidad, distancia) {
  let tiempoEnSegundos = (distancia / velocidad) * 3600; // Calcular el tiempo en segundos
  return tiempoEnSegundos;
}

// Calcular el tiempo para cada etapa
const tiempoCaminata = simularEtapa(CAMINATA_VEL, CAMINATA_DIST);
const tiempoNatacion = simularEtapa(NATACION_VEL, NATACION_DIST);
const tiempoCiclismo = simularEtapa(CICLISMO_VEL, CICLISMO_DIST);

// Sumar los tiempos de las tres etapas
const tiempoTotal = tiempoCaminata + tiempoNatacion + tiempoCiclismo;

// Generar una hora final aleatoria
/*const tiempoInicial = 8 * 3600; // Hora inicial: 8:00 a.m.
const tiempoAleatorio = Math.floor(Math.random() * 3600); // Generar un tiempo aleatorio entre 0 y 1 hora en segundos
const tiempoFinal = tiempoInicial + tiempoTotal + tiempoAleatorio; // Calcular la hora final sumando el tiempo aleatorio

// Calcular horas, minutos y segundos
const horas2 = Math.floor(tiempoTotal / 3600);
const minutos2 = Math.floor((tiempoTotal % 3600) / 60);
const segundos2 = Math.round(tiempoTotal % 60);

const horas = Math.floor(tiempoFinal / 3600);
const minutos = Math.floor((tiempoFinal % 3600) / 60);
const segundos = Math.round(tiempoFinal % 60);

*/// Formatear el tiempo final a formato de hora legible (hh:mm:ss)
const horaFinal = `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
const horaTotal = `${horas2.toString().padStart(2, "0")}:${minutos2.toString().padStart(2, "0")}:${segundos2.toString().padStart(2, "0")}`;

function mostrar() {
  labelNombre.innerHTML = nuevo_participante
  labelHFinalizacion .innerHTML = "Hora de finalización : " + horaFinal
  labelTCompetencia.innerHTML = "Tiempo de competencia : " + horaTotal
}
  btnSimular.addEventListener("click", () => {

    // Simular
    mostrar()
    });