// js/app.js
import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { auth } from "./firebase.js";

let direitos = [];
let isEditing = false;

// Elementos
const direitosContainer = document.getElementById('direitosContainer');
const editBtn = document.getElementById('editBtn');
const userEmailEl = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const modalLogin = document.getElementById('modalLogin');
const loginEmailInput = document.getElementById('loginEmail');
const loginSenhaInput = document.getElementById('loginSenha');

// ==================== MODAL LOGIN ====================
window.mostrarModalLogin = () => {
  modalLogin.classList.remove('hidden');
  loginEmailInput.focus();
};

window.fecharModalLogin = () => {
  modalLogin.classList.add('hidden');
  loginEmailInput.value = '';
  loginSenhaInput.value = '';
};

window.fazerLogin = () => {
  const email = loginEmailInput.value.trim();
  
  if (email === "lucaslcloux12@gmail.com") {
    isEditing = true;
    userEmailEl.classList.remove('hidden');
    userEmailEl.textContent = "lucaslcl...@gmail.com";
    logoutBtn.classList.remove('hidden');
    editBtn.classList.remove('hidden');
    fecharModalLogin();
    renderDireitos();
    alert("✅ Login realizado com sucesso!\n\nVocê agora pode editar a declaração.");
  } else {
    alert("❌ E-mail incorreto.\n\nUse: lucaslcloux12@gmail.com");
  }
};

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
          <div class="text-sm text-gray-500 mb-2 font-medium">Link da Imagem (opcional)</div>
          <input type="text" value="${item.imagem || ''}" placeholder="https://exemplo.com/foto.jpg"
                 class="w-full border border-gray-300 rounded-2xl px-5 py-4 text-sm focus:border-blue-500 outline-none ${isEditing ? '' : 'pointer-events-none bg-gray-50'}"
                 onchange="window.atualizarImagem(${index}, this.value)">
          ${item.imagem ? `<img src="${item.imagem}" class="mt-6 w-full h-64 object-cover rounded-2xl shadow-md">` : '<p class="text-gray-400 text-sm mt-6">Nenhuma imagem ainda</p>'}
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
  direitos.push({ titulo: "Novo Direito do Adolescente", texto: "Escreva aqui o conteúdo...", imagem: "" });
  renderDireitos();
  salvarNoFirebase();
};

window.removerTopico = (index) => {
  if (confirm("Tem certeza que deseja remover este tópico?")) {
    direitos.splice(index, 1);
    renderDireitos();
    salvarNoFirebase();
  }
};

function salvarNoFirebase() {
  set(ref(window.db, 'direitosAdolescentes'), direitos);
}

function carregarDireitos() {
  onValue(ref(window.db, 'direitosAdolescentes'), (snapshot) => {
    const data = snapshot.val();
    direitos = data || criarDireitosIniciais();
    renderDireitos();
  });
}

function criarDireitosIniciais() {
  return Array.from({ length: 30 }, (_, i) => ({
    titulo: `Direito ${i+1} do Adolescente`,
    texto: "Todo adolescente tem direito a uma vida digna, educação de qualidade e proteção contra toda forma de violência.",
    imagem: (i % 4 === 0) ? `https://picsum.photos/id/${100 + i}/800/450` : ""
  }));
}

// ==================== OUTRAS FUNÇÕES ====================
window.logout = () => {
  isEditing = false;
  editBtn.classList.add('hidden');
  userEmailEl.classList.add('hidden');
  logoutBtn.classList.add('hidden');
  renderDireitos();
};

window.toggleChat = () => {
  const bubble = document.getElementById('chatBubble');
  const windowEl = document.getElementById('chatWindow');
  windowEl.classList.toggle('hidden');
  bubble.classList.toggle('rotated');
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
  if (termo) alert(`🔍 Buscando "${termo}" na Declaração dos Direitos dos Adolescentes...`);
};

// Inicialização
window.onload = () => {
  setTimeout(() => {
    carregarDireitos();
    console.log("%c✅ Passo 4 concluído - Botão de Login adicionado!", "color:#009edb; font-size:16px");
  }, 800);
};
