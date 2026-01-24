document.getElementById('pedra').addEventListener('click', () => {
    jogar('pedra');
});

document.getElementById('papel').addEventListener('click', () => {
    jogar('papel');
});

document.getElementById('tesoura').addEventListener('click', () => {
    jogar('tesoura');
});

const div = document.querySelector('.div');
const escolhaDoComputador = document.querySelector('.escolha-do-computador');
const pResulatdo = document.querySelector('.quem-venceu');
const pontosDoUsuario = document.querySelector('.pontoUsuario');
const pontosDoComputador = document.querySelector('.ponto-computador');
const OK = document.querySelector('#OK');
const robo = document.querySelector('.robo');
const user = document.querySelector('.user');
let pontosUsuario = 0;
let pontosComputador = 0;
let nivelAtual = 1;
const imagemRobo = document.querySelector('.imagem-de-perfil');
let modalAberto = false;
let acaoDoBotaoOK = 'fechar';
const divFinal = document.querySelector('.div-final');

function jogar(escolhaUsuario) {
    const opcoes = ['pedra', 'papel', 'tesoura'];
    const escolhaComputador = opcoes[Math.floor(Math.random() * 3)];
    if (modalAberto) return;

    div.style.display = 'block';
    modalAberto = true;
    escolhaDoComputador.src = `assets/${escolhaComputador}.png`;

    if (escolhaUsuario === escolhaComputador) {
        pResulatdo.innerHTML = 'Empatou';
    }
    else if (
        (escolhaUsuario === 'pedra' && escolhaComputador === 'tesoura') ||
        (escolhaUsuario === 'papel' && escolhaComputador === 'pedra') ||
        (escolhaUsuario === 'tesoura' && escolhaComputador === 'papel')
    ) {
        pResulatdo.innerHTML = 'Você venceu!';
        pontosUsuario++;
    }
    else {
        pResulatdo.innerHTML = 'Você perdeu!';
        pontosComputador++;
    }

    pontosDoUsuario.innerHTML = pontosUsuario;
    pontosDoComputador.innerHTML = pontosComputador;

    robo.innerHTML = pontosComputador;
    user.innerHTML = pontosUsuario;

    verificarFimDaRodada();
}

function verificarFimDaRodada() {
    if (pontosUsuario === 5) {
        subirNivel();
    }

    if (pontosComputador === 5) {
        resetarJogo();
    }
}

function subirNivel() {
    nivelAtual++;

    if (nivelAtual > 3) {
        div.style.display = 'none';
        divFinal.style.display = 'block';
        modalAberto = true;
        acaoDoBotaoOK = 'finalizar';
        return;
    }

    resetarPontos();

    document.querySelector('.nivel-do-robo').innerHTML = `NÍVEL ${nivelAtual}`;

    if (nivelAtual === 2) {
        imagemRobo.src = 'assets/robo2.png';
    }

    if (nivelAtual === 3) {
        imagemRobo.src = 'assets/robo3.png';
    }
}

function resetarJogo() {
    nivelAtual = 1;
    resetarPontos();
    document.querySelector('.nivel-do-robo').innerHTML = 'NÍVEL 1';
    imagemRobo.src = 'assets/perfil-do-computador.png';
}

function resetarPontos() {
    pontosUsuario = 0;
    pontosComputador = 0;
    robo.innerHTML = 0;
    user.innerHTML = 0;
    pontosDoUsuario.innerHTML = 0;
    pontosDoComputador.innerHTML = 0;
}

function fecharJanela() {
    div.style.display = 'none';
    modalAberto = false;
}

function concluirJogo() {
    divFinal.style.display = 'none';
    modalAberto = false;
    resetarJogo();
}