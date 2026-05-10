/* ============================================================
   PORTFÓLIO PESSOAL - JAVASCRIPT
   Arquivo de scripts principal (sem frameworks ou bibliotecas)
   ============================================================ */

// Espera o HTML carregar completamente antes de executar o código
document.addEventListener('DOMContentLoaded', function () {

  // ========== SELEÇÃO DE ELEMENTOS DO DOM ==========
  // Pega os elementos que vamos manipular com JavaScript
  var btnTema = document.getElementById('btn-tema');
  var btnMenu = document.getElementById('btn-menu');
  var menu = document.getElementById('menu');
  var formulario = document.getElementById('formulario-contato');
  var modal = document.getElementById('modal');
  var btnFecharModal = document.getElementById('btn-fechar-modal');
  var btnTopo = document.getElementById('btn-topo');
  var header = document.getElementById('header');

  // ========== ALTERNÂNCIA DE TEMA (CLARO / ESCURO) ==========
  // Verifica se o usuário já tinha escolhido um tema antes (salvo no localStorage)
  var temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') {
    document.body.classList.add('tema-escuro');
    btnTema.textContent = '☀️';
  }

  // Quando o botão de tema é clicado, alterna entre claro e escuro
  btnTema.addEventListener('click', function () {
    document.body.classList.toggle('tema-escuro');

    // Muda o ícone do botão conforme o tema
    if (document.body.classList.contains('tema-escuro')) {
      btnTema.textContent = '☀️'; // Sol = clique para voltar ao claro
      localStorage.setItem('tema', 'escuro'); // Salva a escolha
    } else {
      btnTema.textContent = '🌙'; // Lua = clique para ir ao escuro
      localStorage.setItem('tema', 'claro'); // Salva a escolha
    }
  });

  // ========== MENU RESPONSIVO (MOBILE) ==========
  // Abre e fecha o menu no celular ao clicar no botão hambúrguer
  btnMenu.addEventListener('click', function () {
    menu.classList.toggle('menu-aberto');
  });

  // Fecha o menu quando o usuário clica em um link do menu
  var linksMenu = document.querySelectorAll('.menu-link');
  for (var i = 0; i < linksMenu.length; i++) {
    linksMenu[i].addEventListener('click', function () {
      menu.classList.remove('menu-aberto');
    });
  }

  // ========== BOTÃO VOLTAR AO TOPO ==========
  // Mostra ou esconde o botão conforme a rolagem da página
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btnTopo.style.display = 'flex';
    } else {
      btnTopo.style.display = 'none';
    }
  });

  // Quando clica no botão, volta para o topo da página
  btnTopo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== VALIDAÇÃO DO FORMULÁRIO DE CONTATO ==========
  // Quando o formulário é enviado, faz a validação dos campos
  formulario.addEventListener('submit', function (evento) {
    // Previne o envio padrão do formulário (recarregar a página)
    evento.preventDefault();

    // Pega os valores dos campos
    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('email').value.trim();
    var mensagem = document.getElementById('mensagem').value.trim();

    // Pega os elementos de erro
    var erroNome = document.getElementById('erro-nome');
    var erroEmail = document.getElementById('erro-email');
    var erroMensagem = document.getElementById('erro-mensagem');

    // Limpa erros anteriores
    erroNome.textContent = '';
    erroEmail.textContent = '';
    erroMensagem.textContent = '';
    document.getElementById('nome').parentElement.classList.remove('campo-invalido');
    document.getElementById('email').parentElement.classList.remove('campo-invalido');
    document.getElementById('mensagem').parentElement.classList.remove('campo-invalido');

    // Variável para controlar se o formulário é válido
    var formularioValido = true;

    // Validação do campo Nome: não pode estar vazio
    if (nome === '') {
      erroNome.textContent = 'Por favor, digite seu nome.';
      document.getElementById('nome').parentElement.classList.add('campo-invalido');
      formularioValido = false;
    }

    // Validação do campo E-mail: não pode estar vazio e deve ter formato válido
    if (email === '') {
      erroEmail.textContent = 'Por favor, digite seu e-mail.';
      document.getElementById('email').parentElement.classList.add('campo-invalido');
      formularioValido = false;
    } else if (!validarEmail(email)) {
      // Verifica se o e-mail tem formato correto (ex: usuario@dominio.com)
      erroEmail.textContent = 'Por favor, digite um e-mail válido (ex: usuario@dominio.com).';
      document.getElementById('email').parentElement.classList.add('campo-invalido');
      formularioValido = false;
    }

    // Validação do campo Mensagem: não pode estar vazio
    if (mensagem === '') {
      erroMensagem.textContent = 'Por favor, escreva uma mensagem.';
      document.getElementById('mensagem').parentElement.classList.add('campo-invalido');
      formularioValido = false;
    }

    // Se todos os campos estiverem válidos, simula o envio
    if (formularioValido) {
      // Limpa os campos do formulário
      formulario.reset();

      // Mostra o modal de confirmação
      modal.style.display = 'flex';
    }
  });

  // ========== FUNÇÃO PARA VALIDAR FORMATO DO E-MAIL ==========
  // Usa uma expressão regular simples para verificar o formato
  function validarEmail(email) {
    // Regex simples: texto@texto.texto
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // ========== FECHAR MODAL ==========
  // Fecha o modal quando clica no botão "Fechar"
  btnFecharModal.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // Fecha o modal quando clica no fundo escuro
  var modalFundo = document.querySelector('.modal-fundo');
  modalFundo.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // ========== DESTAQUE DO LINK ATIVO NO MENU ==========
  // Ao rolar a página, destaca o link do menu correspondente à seção visível
  var secoes = document.querySelectorAll('.secao');
  window.addEventListener('scroll', function () {
    var posicaoAtual = window.scrollY + 100;

    for (var i = 0; i < secoes.length; i++) {
      var secao = secoes[i];
      var topoSecao = secao.offsetTop;
      var alturaSecao = secao.offsetHeight;

      if (posicaoAtual >= topoSecao && posicaoAtual < topoSecao + alturaSecao) {
        // Remove a classe ativo de todos os links
        for (var j = 0; j < linksMenu.length; j++) {
          linksMenu[j].classList.remove('menu-link-ativo');
        }
        // Adiciona a classe ativo no link correspondente
        var idSecao = secao.getAttribute('id');
        var linkAtivo = document.querySelector('.menu-link[href="#' + idSecao + '"]');
        if (linkAtivo) {
          linkAtivo.classList.add('menu-link-ativo');
        }
      }
    }
  });

});
