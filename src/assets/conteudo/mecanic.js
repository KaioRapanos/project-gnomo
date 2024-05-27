

let intervalId;
let count;

// Função para mover a imagem
function moverImagem() {
    imagem.src = 'imagemMovendo.png';

    const { x, y } = gerarNovaPosicao();
    imagem.style.left = `${x}px`;
    imagem.style.top = `${y}px`;

    setTimeout(() => {
        imagem.src = 'imagemParada.png';
    }, 300); // 300 milissegundos de atraso, ajuste conforme necessário
}

// Função para iniciar o movimento automático
function iniciarMovimentoAutomatico() {
    intervalId = setInterval(moverImagem, 1000); // 3000 milissegundos = 3 segundos
}

// Evento para mover a imagem quando o mouse entra
imagem.addEventListener('mouseenter', () => {
    clearInterval(intervalId); // Pausa o movimento automático
    moverImagem();
    count++;
});
console.log(count);
// Evento para reiniciar o movimento automático quando o mouse sai
imagem.addEventListener('mouseleave', iniciarMovimentoAutomatico);

// Função exemplo para gerar novas posições
function gerarNovaPosicao() {
    const x = Math.floor(Math.random() * 500);
    const y = Math.floor(Math.random() * 500);
    return { x, y };
}

// Inicia o movimento automático ao carregar a página
iniciarMovimentoAutomatico();
