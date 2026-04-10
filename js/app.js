// js/app.js - VERSÃO CORRIGIDA E SIMPLIFICADA (para funcionar hoje)

import { ref, onValue, set, push } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { auth } from "./firebase.js";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

let direitos = [];
let isEditing = false;

// ==================== ELEMENTOS DO DOM ====================
const direitosContainer = document.getElementById('direitosContainer');
const editBtn = document.getElementById('editBtn');
const userEmailEl = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const modalLogin = document.getElementById('modalLogin');
const chatWindow = document.getElementById('chatWindow');
const chatBubble = document.getElementById('chatBubble');
const chatMessages = document.getElementById('chatMessages');

// ==================== LOGIN GOOGLE ====================
onAuthStateChanged(auth, (user) => {
  console.log("Estado de autenticação mudou:", user ? user.email : "não logado");
  
  if (user && user.email === "lucaslcloux12@gmail.com") {
    isEditing = true;
    userEmailEl.classList.remove('hidden');
    userEmailEl.textContent = "lucaslcl...@gmail.com";
    logoutBtn.classList.remove('hidden');
    editBtn.classList.remove('hidden');   // ← Isso faz o botão aparecer
    renderDireitos();
  } else {
    isEditing = false;
    editBtn.classList.add('hidden');
    userEmailEl.classList.add('hidden');
    logoutBtn.classList.add('hidden');
  }
});

window.mostrarModalLogin = () => {
  modalLogin.classList.remove('hidden');
};

window.fecharModalLogin = () => {
  modalLogin.classList.add('hidden');
};

window.loginComGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    fecharModalLogin();
  } catch (error) {
    console.error(error);
    alert("Erro no login com Google:\n" + error.message + "\n\nVerifique se o domínio do Vercel está autorizado no Firebase.");
  }
};

window.logout = () => {
  signOut(auth);
};

// ==================== EDIÇÃO (salva automaticamente) ====================
function renderDireitos() {
  direitosContainer.innerHTML = '';

  direitos.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = `topic-card bg-white border border-gray-200 rounded-3xl p-10 shadow-sm`;
    div.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <input type="text" value="${item.titulo || ''}" 
               class="text-3xl font-bold bg-transparent border-b-2 border-transparent focus:border-blue-500 outline-none w-full ${isEditing ? '' : 'pointer-events-none'}"
               onchange="window.atualizarTitulo(${index}, this.value)">
        
        ${isEditing ? `<button onclick="window.removerTopico(${index})" class="ml-4 text-red-600 hover:text-red-800"><i class="fa-solid fa-trash-can"></i></button>` : ''}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-7">
          <textarea rows="7" class="w-full border border-gray-300 rounded-2xl p-6 text-base leading-relaxed focus:border-blue-500 outline-none resize-y ${isEditing ? '' : 'pointer-events-none bg-gray-50'}"
                    onchange="window.atualizarTexto(${index}, this.value)">${item.texto || ''}</textarea>
        </div>
        <div class="lg:col-span-5">
          <div class="text-sm text-gray-500 mb-3">Link da Imagem</div>
          <input type="text" value="${item.imagem || ''}" placeholder="https://..."
                 class="w-full border border-gray-300 rounded-2xl px-5 py-4 text-sm focus:border-blue-500 outline-none ${isEditing ? '' : 'pointer-events-none bg-gray-50'}"
                 onchange="window.atualizarImagem(${index}, this.value)">
          ${item.imagem ? `<img src="${item.imagem}" class="mt-6 w-full h-64 object-cover rounded-2xl shadow" alt="Imagem">` : 
            `<div class="mt-6 h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">Sem imagem</div>`}
        </div>
      </div>
    `;
    direitosContainer.appendChild(div);
  });

  // Botão adicionar só aparece no modo edição
  if (isEditing) {
    const addBtn = document.createElement('button');
    addBtn.className = "mt-16 mx-auto flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-medium";
    addBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Adicionar Novo Tópico`;
    addBtn.onclick = window.adicionarTopico;
    direitosContainer.appendChild(addBtn);
  }
}

window.atualizarTitulo = (index, valor) => { if (direitos[index]) { direitos[index].titulo = valor; salvarNoFirebase(); } };
window.atualizarTexto = (index, valor) => { if (direitos[index]) { direitos[index].texto = valor; salvarNoFirebase(); } };
window.atualizarImagem = (index, valor) => { if (direitos[index]) { direitos[index].imagem = valor; salvarNoFirebase(); renderDireitos(); } };

window.adicionarTopico = () => {
  direitos.push({ titulo: "Novo Tópico", texto: "Escreva aqui...", imagem: "" });
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
  set(ref(window.db, 'direitosAdolescentes'), direitos);
}

function carregarDireitos() {
  onValue(ref(window.db, 'direitosAdolescentes'), (snapshot) => {
    direitos = snapshot.val() || criar30TopicosIniciais();
    renderDireitos();
  });
}

function criar30TopicosIniciais() {
  // (mesmo array de 30 tópicos do passo anterior - mantenha se quiser)
  return [ /* cole aqui os 30 tópicos se quiser, ou deixe vazio para começar do zero */ ];
}

// ==================== CHAT (corrigido) ====================
window.toggleChat = () => {
  if (!chatWindow || !chatBubble) return;
  chatWindow.classList.toggle('hidden');
  chatBubble.classList.toggle('rotated');
};

window.enviarMensagem = () => {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim()) return;

  const user = auth.currentUser;
  if (!user) {
    alert("Faça login para usar o chat.");
    return;
  }

  push(ref(window.db, 'chatMensagens'), {
    texto: input.value.trim(),
    nome: user.email.split('@')[0],
    email: user.email,
    timestamp: Date.now()
  });

  input.value = '';
};

// Busca simples
window.realizarBusca = () => {
  const termo = document.getElementById('searchInput').value.trim();
  if (termo) alert(`Buscando: "${termo}"`);
};

// ==================== INICIALIZAÇÃO ====================
window.onload = () => {
  carregarDireitos();
  console.log("%c✅ Correção aplicada - Teste o login com Google agora", "color:#009edb; font-size:16px");
};
