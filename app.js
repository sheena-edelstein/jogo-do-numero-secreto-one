let limiteTentativas = 30;
let listaSorteados = [];
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do Número Secreto');
  exibirTextoNaTela('p', `Escolha um número entre 1 e ${limiteTentativas}!`);
}
exibirMensagemInicial();

function limparTela() {
  const input = document.querySelector('input');
  if (input) {
    input.value = '';
    input.focus();
  }
}

function verificarChute() {
  const input = document.querySelector('input');
  const chute = Number(input?.value);

  if (!Number.isInteger(chute) || chute < 1 || chute > limiteTentativas) {
    exibirTextoNaTela('h1', 'Número inválido');
    exibirTextoNaTela('p', `Digite um número entre 1 e ${limiteTentativas}.`);
    return;
  }

  if (chute === numeroSecreto) {
    const palavraTentativa = tentativas > 1 ? 'vezes' : 'vez';
    const mensagemTentativas = `O número secreto é ${numeroSecreto}. Você tentou ${tentativas} ${palavraTentativa}.`;
    exibirTextoNaTela('h1', 'Você acertou!');
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    exibirTextoNaTela('h1', 'Você errou!');
    if (chute < numeroSecreto) {
      exibirTextoNaTela('p', `O número secreto é maior que ${chute}. Tente novamente!`);
    } else {
      exibirTextoNaTela('p', `O número secreto é menor que ${chute}. Tente novamente!`);
    }
    tentativas++;
    limparTela();
  }
}

function gerarNumeroAleatorio() {
  if (listaSorteados.length >= limiteTentativas) {
    listaSorteados = [];
  }

  let numeroSecreto;
  do {
    numeroSecreto = Math.floor(Math.random() * limiteTentativas) + 1; // 1..limite
  } while (listaSorteados.includes(numeroSecreto));

  listaSorteados.push(numeroSecreto);
  console.log('Já sorteados:', listaSorteados);
  return numeroSecreto;
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
  limparTela();
}
