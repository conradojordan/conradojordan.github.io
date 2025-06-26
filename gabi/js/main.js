const now = new Date();

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
        mensagem1_texto = `Espero que tu tenha ${artigo_weekday} ${weekday} ${adjetivo}!`;
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


// let mensagens2 = [
//     "E que tua vida seja tão iluminada quanto os teus olhos",
//     "E que vai um nariz: 👃 que é pra inspirar teu dia (ba dum tss)",
//     "E que tu sempre lembre que tu és muito massa",
// ];

// let mensagem2 = document.getElementById("mensagem2");
// mensagem2.innerHTML = mensagens2[now.getDate() % mensagens2.length];