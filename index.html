// js/app.js - VERSÃO DE EMERGÊNCIA (trabalho amanhã)

import { ref, onValue, set, push } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { auth } from "./firebase.js";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

let direitos = [];
let isEditing = false;

// Elementos
const direitosContainer = document.getElementById('direitosContainer');
const editBtn = document.getElementById('editBtn');
const userEmailEl = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const modalLogin = document.getElementById('modalLogin');
const chatWindow = document.getElementById('chatWindow');
const chatBubble = document.getElementById('chatBubble');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// ==================== LOGIN GOOGLE ====================
onAuthStateChanged(auth, (user) => {
  console.log("🔐 Auth State Changed →", user ? user.email : "Nenhum usuário");

  if (user && user.email === "lucaslcloux12@gmail.com") {
    isEditing = true;
    userEmailEl.classList.remove('hidden');
    userEmailEl.textContent = "lucaslcl...@gmail.com";
    logoutBtn.classList.remove('hidden');
    editBtn.classList.remove('hidden');   // Força o botão aparecer
    console.log("✅ Modo edição ATIVADO");
    renderDireitos();
  } else {
    isEditing = false;
    editBtn.classList.add('hidden');
    userEmailEl.classList.add('hidden');
    logoutBtn.classList.add('hidden');
  }
});

window.mostrarModalLogin = () => modalLogin.classList.remove('hidden');
window.fecharModalLogin = () => modalLogin.classList.add('hidden');

window.loginComGoogle = async () => {
  console.log("Tentando login com Google...");
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    fecharModalLogin();
    console.log("Login com Google realizado!");
  } catch (error) {
    console.error("Erro no login:", error);
    alert("Erro no login com Google:\n" + error.message + "\n\nVerifique se o domínio do Vercel está adicionado no Firebase.");
  }
};

window.logout = () => signOut(auth);

// ==================== EDIÇÃO (salva automaticamente ao digitar) ====================
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
        
        ${isEditing ? `<button onclick="window.removerTopico(${index})" class="text-red-600"><i class="fa-solid fa-trash"></i></button>` : ''}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-7">
          <textarea rows="7" class="w-full border border-gray-300 rounded-2xl p-6 text-base ${isEditing ? '' : 'pointer-events-none bg-gray-50'}"
                    onchange="window.atualizarTexto(${index}, this.value)">${item.texto || ''}</textarea>
        </div>
        <div class="lg:col-span-5">
          <input type="text" value="${item.imagem || ''}" placeholder="Link da imagem"
                 class="w-full border border-gray-300 rounded-2xl px-5 py-4 text-sm ${isEditing ? '' : 'pointer-events-none bg-gray-50'}"
                 onchange="window.atualizarImagem(${index}, this.value)">
          ${item.imagem ? `<img src="${item.imagem}" class="mt-6 w-full h-64 object-cover rounded-2xl">` : '<p class="text-gray-400 mt-6">Sem imagem</p>'}
        </div>
      </div>
    `;
    direitosContainer.appendChild(div);
  });

  if (isEditing) {
    const btn = document.createElement('button');
    btn.className = "mt-12 mx-auto block bg-green-600 text-white px-8 py-4 rounded-2xl font-medium";
    btn.textContent = "➕ Adicionar Novo Tópico";
    btn.onclick = window.adicionarTopico;
    direitosContainer.appendChild(btn);
  }
}

window.atualizarTitulo = (i, v) => { if (direitos[i]) { direitos[i].titulo = v; salvarNoFirebase(); } };
window.atualizarTexto  = (i, v) => { if (direitos[i]) { direitos[i].texto = v; salvarNoFirebase(); } };
window.atualizarImagem = (i, v) => { if (direitos[i]) { direitos[i].imagem = v; salvarNoFirebase(); renderDireitos(); } };

window.adicionarTopico = () => {
  direitos.push({ titulo: "Novo Tópico", texto: "Escreva aqui...", imagem: "" });
  renderDireitos();
  salvarNoFirebase();
};

window.removerTopico = (i) => {
  if (confirm("Remover tópico?")) {
    direitos.splice(i, 1);
    renderDireitos();
    salvarNoFirebase();
  }
};

function salvarNoFirebase() {
  set(ref(window.db, 'direitosAdolescentes'), direitos);
}

function carregarDireitos() {
  onValue(ref(window.db, 'direitosAdolescentes'), (snap) => {
    direitos = snap.val() || [];
    renderDireitos();
  });
}

// ==================== CHAT ====================
window.toggleChat = () => {
  chatWindow.classList.toggle('hidden');
  chatBubble.classList.toggle('rotated');
};

window.enviarMensagem = () => {
  const texto = chatInput.value.trim();
  if (!texto) return;

  const user = auth.currentUser;
  if (!user) {
    alert("Faça login primeiro para enviar mensagem.");
    return;
  }

  push(ref(window.db, 'chatMensagens'), {
    texto: texto,
    nome: user.email.split('@')[0],
    email: user.email,
    timestamp: Date.now()
  });

  chatInput.value = '';
};

// Inicialização
window.onload = () => {
  carregarDireitos();
  console.log("%c🚀 Versão de emergência carregada - Teste o login agora", "color:#009edb; font-size:18px");
};
