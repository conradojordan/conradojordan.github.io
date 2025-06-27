const now = new Date();

// Temas
const TEMA = "tema";
const ORIGINAL = "original";
const PINK = "pink";
const DARK = "dark";
const ECO = "eco";

let periodo;
if (now.getHours() < 12) {
    periodo = "dia";
} else if (now.getHours() < 18) {
    periodo = "tarde";
} else {
    periodo = "noite";
}

let mensagem_periodo = document.getElementById("mensagem_periodo");
let prefixo_periodo = periodo == "dia" ? "Bom" : "Boa";
mensagem_periodo.innerHTML = `${prefixo_periodo} ${periodo}`;


let adjetivos = [
    "incomparável",
    "espetacular",
    "sensacional",
    "formidável",
    "incrível",
    "sublime",
    "deslumbrante",
    "muito massa",
    "interessante",
    "fascinante",
    "inesquecível",
];
weekday = now.toLocaleDateString('pt-BR', { weekday: 'long' });

let artigo_weekday = weekday.endsWith("a") ? "uma" : "um";
let possessivo_weekday = artigo_weekday === "uma" ? "tua" : "teu";

let adjetivo = adjetivos[now.getDate() % adjetivos.length];

let mensagem1_texto;
switch (periodo) {
    case "dia":
        mensagem1_texto = `Espero que tu tenhas ${artigo_weekday} ${weekday} ${adjetivo}!`;
        break;
    case "tarde":
        mensagem1_texto = `Espero que tu estejas tendo ${artigo_weekday} ${weekday} ${adjetivo}!`;
        break;
    case "noite":
        mensagem1_texto = `Espero que ${possessivo_weekday} ${weekday} tenha sido ${adjetivo}!`;
        break;
}

let mensagem1 = document.getElementById("mensagem1");
mensagem1.innerHTML = mensagem1_texto;


function jogarDado() {
    let resultadoDado = Math.floor(Math.random() * 6) + 1;
    let resultadoDiv = document.getElementById("resultado");

    resultado = `Resultado: ${resultadoDado}`;
    if (resultadoDado === 1) {
        resultado = resultado + " 😭";
    } else if (resultadoDado === 6) {
        resultado = resultado + " 🥳";
    }
    resultadoDiv.innerHTML = `${resultado}`;
}

let dado = document.getElementById("dado");
dado.addEventListener("click", jogarDado);

function coresDoTema(tema) {
    switch (tema) {
        case ORIGINAL:
            return ["#e4e4e4", "#ff66b2", "#3a8d3d", "#555", "#111"];
        case PINK:
            return ["#ffccff", "#ff66b2", "#27bff7", "#a12eff", "#27bff7"];
        case DARK:
            return ["#080808", "#111", "#700", "#aaa", "#A00"];
        case ECO:
            return ["#c8e3c5", "#693526", "#552315", "#693526", "#552315"];
        default:
            return ["#e4e4e4", "#ff66b2", "#3a8d3d", "#555", "#111"];
    }
}

function aplicarTema(tema) {
    [background, color, h1color, h3color, divcolor] = coresDoTema(tema)

    let body = document.body;
    body.style.backgroundColor = background;
    body.style.color = color;


    let divs = document.querySelectorAll("div");
    divs.forEach((element) => {
        element.style.color = divcolor;
    });
    let h1 = document.querySelectorAll("h1");
    h1.forEach((element) => {
        element.style.color = h1color;
    });
    let h3 = document.querySelectorAll("h3");
    h3.forEach((element) => {
        element.style.color = h3color;
    });
    let h1_div = document.querySelectorAll("h1 div");
    h1_div.forEach((element) => {
        element.style.color = h1color;
    });
    let h3_div = document.querySelectorAll("h3 div");
    h3_div.forEach((element) => {
        element.style.color = h3color;
    });
}

function mudarTema() {
    let tema = document.getElementById("tema").value;
    aplicarTema(tema);
    localStorage.setItem(TEMA, tema);
}

let tema = localStorage.getItem(TEMA) ? localStorage.getItem(TEMA) : ORIGINAL;
aplicarTema(tema);
document.getElementById("tema").value = tema;

// let mensagens2 = [
//     "E que tua vida seja tão iluminada quanto os teus olhos",
//     "E que vai um nariz: 👃 que é pra inspirar teu dia (ba dum tss)",
//     "E que tu sempre lembre que tu és muito massa",
// ];

// let mensagem2 = document.getElementById("mensagem2");
// mensagem2.innerHTML = mensagens2[now.getDate() % mensagens2.length];