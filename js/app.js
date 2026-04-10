// js/app.js
import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { auth } from "./firebase.js";

let direitos = [];
let isEditing = false;
let currentUser = null;

// Elementos do DOM
const direitosContainer = document.getElementById('direitosContainer');
const editBtn = document.getElementById('editBtn');
const userEmailEl = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

// ==================== FUNÇÕES DE EDIÇÃO ====================
function renderDireitos() {
  direitosContainer.innerHTML = '';

  direitos.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = `topic-card bg-white border border-gray-200 rounded-3xl p-10 shadow-sm`;
    div.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <input type="text" value="${item.titulo}" 
               class="text-3xl font-bold bg-transparent border-b-2 border-transparent focus:border-blue-500 outline-none w-full transition-all ${isEditing ? '' : 'pointer-events-none'}"
               onchange="window.atualizarTitulo(${index}, this.value)">
        
        ${isEditing ? `
        <button onclick="window.removerTopico(${index})" class="text-red-500 hover:text-red-700 p-2">
          <i class="fa-solid fa-trash-can text-xl"></i>
        </button>` : ''}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-7">
          <textarea rows="6" 
                    class="w-full border border-gray-300 rounded-2xl p-6 text-base leading-relaxed focus:border-blue-500 outline-none resize-y ${isEditing ? '' : 'pointer-events-none bg-gray-50'}"
                    onchange="window.atualizarTexto(${index}, this.value)">${item.texto}</textarea>
        </div>
        <div class="lg:col-span-5">
          <div class="text-sm text-gray-500 mb-2 font-medium">Link da Imagem</div>
          <input type="text" value="${item.imagem || ''}" placeholder="https://exemplo.com/foto.jpg"
                 class="w-full border border-gray-300 rounded-2xl px-5 py-4 text-sm focus:border-blue-500 outline-none ${isEditing ? '' : 'pointer-events-none bg-gray-50'}"
                 onchange="window.atualizarImagem(${index}, this.value)">
          ${item.imagem ? `<img src="${item.imagem}" class="mt-6 w-full h-64 object-cover rounded-2xl shadow-md">` : ''}
        </div>
      </div>
    `;
    direitosContainer.appendChild(div);
  });

  if (isEditing) {
    const addBtn = document.createElement('button');
    addBtn.className = "mt-16 mx-auto flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-5 rounded-3xl transition-all";
    addBtn.innerHTML = `<i class="fa-solid fa-circle-plus text-2xl"></i> Adicionar Novo Tópico`;
    addBtn.onclick = window.adicionarTopico;
    direitosContainer.appendChild(addBtn);
  }
}

window.atualizarTitulo = (index, valor) => { direitos[index].titulo = valor; salvarNoFirebase(); };
window.atualizarTexto = (index, valor) => { direitos[index].texto = valor; salvarNoFirebase(); };
window.atualizarImagem = (index, valor) => { direitos[index].imagem = valor; salvarNoFirebase(); renderDireitos(); };

window.adicionarTopico = () => {
  direitos.push({ titulo: "Novo Direito do Adolescente", texto: "Escreva aqui...", imagem: "" });
  renderDireitos();
  salvarNoFirebase();
};

window.removerTopico = (index) => {
  if (confirm("Remover este tópico?")) {
    direitos.splice(index, 1);
    renderDireitos();
    salvarNoFirebase();
  }
};

function salvarNoFirebase() {
  set(ref(window.db || window.firebaseDb, 'direitosAdolescentes'), direitos);
}

function carregarDireitos() {
  onValue(ref(window.db || window.firebaseDb, 'direitosAdolescentes'), (snapshot) => {
    const data = snapshot.val();
    direitos = data || criarDireitosIniciais();
    renderDireitos();
  });
}

function criarDireitosIniciais() {
  return Array.from({ length: 30 }, (_, i) => ({
    titulo: `Direito ${i+1} - Título do Direito do Adolescente`,
    texto: "Todo adolescente tem direito a... (edite este texto)",
    imagem: i % 3 === 0 ? "https://picsum.photos/id/" + (100 + i) + "/800/450" : ""
  }));
}

// ==================== MODO EDIÇÃO + LOGIN SIMPLES ====================
window.ativarModoEdicao = () => {
  const email = prompt("Digite seu e-mail para editar (lucaslcloux12@gmail.com):");
  if (email && email.toLowerCase().includes("lucaslcloux12")) {
    isEditing = true;
    currentUser = email;
    editBtn.classList.add('hidden');
    userEmailEl.classList.remove('hidden');
    userEmailEl.textContent = email.split('@')[0] + "...@gmail.com";
    logoutBtn.classList.remove('hidden');
    renderDireitos();
    alert("✅ Modo edição ativado! Você pode editar, adicionar e remover tópicos agora.");
  } else {
    alert("❌ Acesso negado.");
  }
};

window.logout = () => {
  isEditing = false;
  editBtn.classList.remove('hidden');
  userEmailEl.classList.add('hidden');
  logoutBtn.classList.add('hidden');
  renderDireitos();
};

// ==================== CHAT ====================
let chatAberto = false;
window.toggleChat = () => {
  chatAberto = !chatAberto;
  document.getElementById('chatBubble').classList.toggle('rotated', chatAberto);
  document.getElementById('chatWindow').classList.toggle('hidden', !chatAberto);
};

window.enviarMensagem = () => {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  const messages = document.getElementById('chatMessages');
  messages.innerHTML += `<div class="flex justify-end"><div class="max-w-[80%] bg-blue-600 text-white px-5 py-3 rounded-3xl rounded-tr-none">${msg}</div></div>`;
  messages.scrollTop = messages.scrollHeight;
  input.value = '';
};

window.realizarBusca = () => {
  const termo = document.getElementById('searchInput').value.trim();
  if (termo) alert(`🔍 Buscando "${termo}"...`);
};

// Inicialização
window.onload = () => {
  // Aguarda firebase.js carregar
  setTimeout(() => {
    if (window.db) {
      carregarDireitos();
    } else {
      console.error("Firebase não carregou corretamente");
    }
    console.log("%c✅ Projeto com pastas carregado! (Passo 2 + 3 completo)", "color:#009edb; font-size:16px");
  }, 800);
};
