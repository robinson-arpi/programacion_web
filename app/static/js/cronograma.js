const calendario = document.querySelector(".calendario"),
    fecha = document.querySelector(".fecha"),
    diasContenedor = document.querySelector(".dias");
prev = document.querySelector(".prev");
next = document.querySelector(".next");
hoyBtn = document.querySelector(".hoy-boton");
irBtn = document.querySelector(".ir-boton");
dateInput = document.querySelector(".date-input");

let hoy = new Date();
let activarDia;
let mes = hoy.getMonth();
let anio = hoy.getFullYear();

const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

const ArrayDeEventos = [
    {
        day: 13,
        month: 11,
        year: 2022,
        events: [
            {
                title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
                time: "10:00 AM",
            },
            {
                title: "Event 2",
                time: "11:00 AM",
            },
        ],
    },
    {
        day: 18,
        month: 11,
        year: 2022,
        events: [
            {
                title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
                time: "10:00 AM",
            },
            {
                title: "Event 2",
                time: "11:00 AM",
            },
        ],
    },
]
///creamos una función para agregar dias
function iniciarCalendario() {
    const primerDia = new Date(anio, mes, 1);
    const ultimoDia = new Date(anio, mes + 1, 0);
    const ultimoDiaAnterior = new Date(anio, mes, 0);
    const diaAnterior = ultimoDiaAnterior.getDate();
    const ultimaFecha = ultimoDia.getDate();
    const dia = primerDia.getDay();
    const siguientesDias = 7 - ultimoDia.getDay() - 1;
    fecha.innerHTML = meses[mes] + "   " + anio;
    //agregando dias
    let dias = "";

    for (let x = dia; x > 0; x--) {
        dias += `<div class="dia anterior-fecha"> ${diaAnterior - x + 1}</div>`
    }

    for (let i = 1; i <= ultimaFecha; i++) {
        if (i === new Date().getDate() && anio === new Date().getFullYear() && mes === new Date().getMonth()) {
            dias += `<div class="dia hoy"> ${i}</div>`;
        } else {
            dias += `<div class="dia"> ${i}</div>`;
        }
    }

    for (let j = 1; j <= siguientesDias; j++) {
        dias += `<div class="dia proximo-fecha"> ${j}</div>`;
    }

    diasContenedor.innerHTML = dias;

    addListener();
}

iniciarCalendario();

//mes anterior
function mesAnterior() {
    mes--;
    if (mes < 0) {
        mes = 11;
        year--;
    }
    iniciarCalendario()
}
//siguiente mes
function mesSiguiente() {
    mes++;
    if (mes > 11) {
        mes = 0;
        anio++;
    }
    iniciarCalendario()
}

//agregar un evento para los meses anteriores y meses siguients
prev.addEventListener('click', mesAnterior)
next.addEventListener('click', mesSiguiente)

//agregando funcionalidad a los botones 
hoyBtn.addEventListener('click', () => {
    hoy = new Date();
    mes = hoy.getMonth();
    anio = hoy.getFullYear();
    iniciarCalendario();
})
dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    //si agrega dos primeros caracteres que se agregue un "/"
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    //Si agrega mas de 7 caracteres que se corte los 7 caracteres
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
})



function irFecha() {
    const datoIngreso = dateInput.value.split("/");
    console.log(datoIngreso)
    if (datoIngreso.length === 2) {
        if (datoIngreso[0] > 0 && datoIngreso[0] < 13 && datoIngreso[1].length === 4) {
            mes = datoIngreso[0] - 1;
            anio = datoIngreso[1];
            iniciarCalendario();
            return
        }
    }
    alert('Fecha invalida')
}
irBtn.addEventListener('click', irFecha);


function addListener() {
    const dias = document.querySelectorAll(".dia");
    dias.forEach((dia) => {
        dia.addEventListener("click", (e) => {
            activarDia = Number(e.target.innerHTML);
            dias.forEach((dia) => {
                dia.classList.remove("activar");
            })

            if (e.target.classList.contains("anterior-fecha")) {

            }


        })


    });
}


function salir(event) {
    window.location.href = "../index.html";
}