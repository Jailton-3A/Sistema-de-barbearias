# Sistema de Agendamento de Barbearia

##  Descrição

Plataforma web simples para **agendamento de horários** em barbearias.  
Permite que clientes visualizem serviços, agendem horários com profissionais específicos, enquanto administradores gerenciam os serviços, profissionais e visualizam todos os agendamentos.

Desenvolvido com **HTML**, **CSS** e **JavaScript** puro, com persistência de dados utilizando **localStorage**.  

---

## Funcionalidades

### 👤 Cliente
- Visualizar lista de serviços com preços.
- Selecionar profissional e agendar horário.
- Cancelar ou reagendar um agendamento.
- Receber notificações de confirmação e lembrete.
- Login e cadastro.

###  Administrador
- Cadastrar, editar e excluir serviços.
- Cadastrar e gerenciar profissionais.
- Visualizar todos os agendamentos realizados.
- Cancelar agendamentos.
- Login como **admin** (usuário reservado).

---

##  Fluxos principais

- **Agendamento de Serviço:** cliente escolhe serviço → profissional → horário → confirma agendamento → sistema atualiza a agenda.
- **Agendamento com Horário Indisponível:** sistema sugere horários alternativos.
- **Cancelamento de Agendamento:** tanto cliente quanto profissional podem cancelar ou reagendar.

---

##  Tecnologias Utilizadas

- **HTML5**  
- **CSS3**  
- **JavaScript (ES6+)**  
- **localStorage** para persistência de dados  
- **GitHub Actions** para CI  

---

##  Estrutura de Pastas

```plaintext
/
├── index.html          → Página principal (login/cadastro)
├── cliente.html        → Painel do cliente
├── admin.html          → Painel do administrador
├── css/
│   └── styles.css      → Estilos do projeto
├── js/
│   ├── app.js          → Lógica principal
│   ├── auth.js         → Lógica de autenticação
│   ├── admin.js        → Funções administrativas
│   └── cliente.js      → Funções do cliente
├── .github/
│   └── workflows/
│       └── ci.yml      → Pipeline de integração contínua
└── README.md           → Este arquivo
