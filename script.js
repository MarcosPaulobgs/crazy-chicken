// ======================================================
// JOGO DA GALINHA - SCRIPT PRINCIPAL
// ======================================================
// Regras do jogo:
//
// 🐣 (pintinho) -> 1 clique -> 🐓 (galo)
// 🐓 (galo)     -> 1 clique -> 🍗 (frango)
// 🍗 (frango)   -> 1 clique -> 🦴 (osso)
//
// Características:
// - Tela inteira
// - Bichos se movem livremente pela tela
// - Passam por trás do HUD (títulos e galinha)
// - Botão direito funciona igual ao esquerdo
// - Menu do botão direito é desativado
// ======================================================


// Aguarda o HTML terminar de carregar antes de executar o código
document.addEventListener("DOMContentLoaded", () => {

  // Captura o elemento da galinha no HTML
  const chicken = document.getElementById("chicken")

  // Captura o container onde os animais irão se mover
  const mundo = document.getElementById("mundo")

  // Captura o contador exibido na tela
  const scoreDisplay = document.getElementById("score")

  // Verificação de segurança caso algum ID não exista
  if (!chicken || !mundo || !scoreDisplay) {

    // Mostra erro para o usuário
    alert("IDs faltando no HTML: chicken, mundo, score.")

    // Interrompe execução do script
    return
  }


  // =========================================
  // BLOQUEAR MENU DO BOTÃO DIREITO
  // =========================================

  // Quando o menu de contexto tentar abrir
  document.addEventListener("contextmenu", (e) => {

    // Cancela o comportamento padrão do navegador
    e.preventDefault()

  })


  // =========================================
  // CONTADOR DE ANIMAIS CRIADOS
  // =========================================

  // Variável que armazena o total de pintinhos criados
  let score = 0


  // =========================================
  // FUNÇÃO AUXILIAR PARA LIMITAR VALORES
  // =========================================

  // Mantém um valor sempre entre mínimo e máximo
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))


  // =========================================
  // FUNÇÃO PRINCIPAL QUE CRIA UM PINTINHO
  // =========================================

  function criarAnimal(){

    // Incrementa o contador
    score++

    // Atualiza o número na interface
    scoreDisplay.textContent = score


    // Cria um novo elemento HTML (div)
    const animal = document.createElement("div")

    // Define a classe inicial do animal
    animal.className = "pinto"

    // Define o emoji inicial
    animal.textContent = "🐣"

    // Define posicionamento absoluto para permitir movimentação livre
    animal.style.position = "absolute"

    // Adiciona o animal ao "mundo" (tela inteira)
    mundo.appendChild(animal)


    // =========================================
    // DEFINIÇÕES DE TAMANHO E POSIÇÃO
    // =========================================

    // Tamanho aproximado do animal em pixels
    const size = 40

    // Largura da janela do navegador
    let W = window.innerWidth

    // Altura da janela do navegador
    let H = window.innerHeight

    // Posição inicial aleatória no eixo X
    let x = Math.random() * (W - size)

    // Posição inicial aleatória no eixo Y
    let y = Math.random() * (H - size)

    // Aplica posição no elemento
    animal.style.left = x + "px"
    animal.style.top = y + "px"


    // =========================================
    // VELOCIDADE INICIAL
    // =========================================

    // Velocidade horizontal aleatória
    let dx = (Math.random()*2-1)*6

    // Velocidade vertical aleatória
    let dy = (Math.random()*2-1)*6

    // Garante que não fique quase parado
    if(Math.abs(dx) < 1) dx = 2
    if(Math.abs(dy) < 1) dy = -2


    // =========================================
    // ESTADO ATUAL DO ANIMAL
    // =========================================

    // Estados possíveis:
    // pinto -> galo -> frango -> osso
    let estado = "pinto"


    // =========================================
    // CLIQUE NO ANIMAL
    // =========================================

    animal.addEventListener("mousedown",(e)=>{

      // Impede o clique de atingir outros elementos
      e.stopPropagation()


      // EVOLUÇÃO DO PINTINHO
      if(estado === "pinto"){

        // Troca emoji
        animal.textContent = "🐓"

        // Atualiza classe
        animal.className = "galo"

        // Atualiza estado
        estado = "galo"

        return
      }


      // EVOLUÇÃO DO GALO
      if(estado === "galo"){

        animal.textContent = "🍗"
        animal.className = "frango"
        estado = "frango"

        return
      }


      // EVOLUÇÃO DO FRANGO
      if(estado === "frango"){

        animal.textContent = "🦴"
        animal.className = "osso"
        estado = "osso"

        return
      }

      // O osso é o estágio final

    })


    // =========================================
    // MOVIMENTO CONTÍNUO DOS ANIMAIS
    // =========================================

    const tick = setInterval(()=>{

      // Atualiza tamanho da janela caso o usuário redimensione
      W = window.innerWidth
      H = window.innerHeight


      // Adiciona pequena aleatoriedade na direção
      dx += (Math.random()*2-1)*0.8
      dy += (Math.random()*2-1)*0.8


      // Limita velocidade máxima
      const vmax = 10

      dx = clamp(dx,-vmax,vmax)
      dy = clamp(dy,-vmax,vmax)


      // Atualiza posição
      x += dx
      y += dy


      // Colisão com borda esquerda
      if(x <= 0){
        x = 0
        dx *= -1
      }

      // Colisão com topo
      if(y <= 0){
        y = 0
        dy *= -1
      }

      // Colisão com borda direita
      if(x >= W-size){
        x = W-size
        dx *= -1
      }

      // Colisão com parte inferior
      if(y >= H-size){
        y = H-size
        dy *= -1
      }


      // Atualiza posição visual do animal
      animal.style.left = x + "px"
      animal.style.top = y + "px"

    },60)

  }


  // =========================================
  // CLIQUE NA GALINHA CRIA UM PINTINHO
  // =========================================

  // mousedown permite usar qualquer botão do mouse
  chicken.addEventListener("mousedown", criarAnimal)

})