let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [{usuario: 'admin', senha: 'admin'}];
let servicos = JSON.parse(localStorage.getItem('servicos')) || [{nome: "Corte", preco: 30}, {nome: "Barba", preco: 20}];
let profissionais = JSON.parse(localStorage.getItem('profissionais')) || ["João", "Carlos"];
let agenda = JSON.parse(localStorage.getItem('agenda')) || [];

let usuarioLogado = localStorage.getItem('usuarioLogado');

if (usuarioLogado) {
  document.getElementById('login').style.display = 'none';
  document.getElementById('sistema').style.display = 'block';
  if (usuarioLogado === 'admin') {
    document.getElementById('btn-admin').style.display = 'inline-block';
  }
  iniciarSistema();
} else {
  mostrarLogin();
}

function mostrarLogin() {
  document.getElementById('login').style.display = 'block';
  document.getElementById('cadastro').style.display = 'none';
  document.getElementById('sistema').style.display = 'none';
  document.getElementById('admin').style.display = 'none';
}

function mostrarCadastro() {
  document.getElementById('cadastro').style.display = 'block';
  document.getElementById('login').style.display = 'none';
}

function fazerCadastro() {
  const usuario = document.getElementById('cadastro-usuario').value;
  const senha = document.getElementById('cadastro-senha').value;
  if (usuario && senha) {
    if (usuarios.find(u => u.usuario === usuario)) {
      alert('Usuário já existe!');
      return;
    }
    usuarios.push({usuario, senha});
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuário cadastrado!');
    mostrarLogin();
  } else {
    alert('Preencha todos os campos!');
  }
}

function fazerLogin() {
  const usuario = document.getElementById('login-usuario').value;
  const senha = document.getElementById('login-senha').value;
  const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);
  if (encontrado) {
    usuarioLogado = usuario;
    localStorage.setItem('usuarioLogado', usuarioLogado);
    document.getElementById('login').style.display = 'none';
    document.getElementById('cadastro').style.display = 'none';
    document.getElementById('sistema').style.display = 'block';
    if (usuarioLogado === 'admin') {
      document.getElementById('btn-admin').style.display = 'inline-block';
    } else {
      document.getElementById('btn-admin').style.display = 'none';
    }
    iniciarSistema();
  } else {
    alert('Usuário ou senha incorretos!');
  }
}

function iniciarSistema() {
  atualizarServicos();
  atualizarProfissionais();
  atualizarAgenda();
  if (usuarioLogado === 'admin') {
    document.getElementById('agendamento').style.display = 'none';
    document.getElementById('agenda').style.display = 'none';
  } else {
    document.getElementById('agendamento').style.display = 'block';
    document.getElementById('agenda').style.display = 'block';
  }
}

function atualizarServicos() {
  const select = document.getElementById('servico-select');
  select.innerHTML = "";
  servicos.forEach((s, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `${s.nome} - R$${s.preco}`;
    select.appendChild(opt);
  });
}

function atualizarProfissionais() {
  const select = document.getElementById('profissional-select');
  select.innerHTML = "";
  profissionais.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}

document.getElementById('form-agendamento').addEventListener('submit', function(e) {
  e.preventDefault();
  const servico = servicos[document.getElementById('servico-select').value].nome;
  const profissional = document.getElementById('profissional-select').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;

  const conflito = agenda.find(a => a.profissional === profissional && a.data === data && a.hora === hora);
  if (conflito) {
    alert('Horário indisponível! Tente outro horário.');
  } else {
    agenda.push({ cliente: usuarioLogado, servico, profissional, data, hora });
    localStorage.setItem('agenda', JSON.stringify(agenda));
    alert('Agendamento confirmado!');
    atualizarAgenda();
  }
});

function atualizarAgenda() {
  const lista = document.getElementById('minha-agenda');
  if (!lista) return;
  lista.innerHTML = "";
  const meusAgendamentos = agenda.filter(a => a.cliente === usuarioLogado);
  meusAgendamentos.forEach(a => {
    const item = document.createElement('li');
    item.textContent = `${a.servico} com ${a.profissional} em ${a.data} às ${a.hora}`;
    lista.appendChild(item);
  });
}

function adicionarServico() {
  const nome = prompt('Nome do serviço:');
  const preco = prompt('Preço do serviço:');
  if (nome && preco) {
    servicos.push({nome, preco});
    localStorage.setItem('servicos', JSON.stringify(servicos));
    alert('Serviço adicionado!');
    atualizarServicos();
  }
}

function adicionarProfissional() {
  const nome = prompt('Nome do profissional:');
  if (nome) {
    profissionais.push(nome);
    localStorage.setItem('profissionais', JSON.stringify(profissionais));
    alert('Profissional adicionado!');
    atualizarProfissionais();
  }
}

function mostrarAdmin() {
  document.getElementById('sistema').style.display = 'none';
  document.getElementById('admin').style.display = 'block';
  mostrarAgendamentosAdmin();
}

function mostrarAgendamentosAdmin() {
  const lista = document.getElementById('lista-agendamentos');
  lista.innerHTML = "";
  if (agenda.length === 0) {
    const item = document.createElement('li');
    item.textContent = "Nenhum agendamento.";
    lista.appendChild(item);
  } else {
    agenda.forEach(a => {
      const item = document.createElement('li');
      item.textContent = `Cliente: ${a.cliente} | Serviço: ${a.servico} | Profissional: ${a.profissional} | Data: ${a.data} | Hora: ${a.hora}`;
      lista.appendChild(item);
    });
  }
}

function voltarSistema() {
  document.getElementById('admin').style.display = 'none';
  document.getElementById('sistema').style.display = 'block';
}

function fazerLogout() {
  usuarioLogado = null;
  localStorage.removeItem('usuarioLogado');
  document.getElementById('sistema').style.display = 'none';
  document.getElementById('admin').style.display = 'none';
  mostrarLogin();
}
