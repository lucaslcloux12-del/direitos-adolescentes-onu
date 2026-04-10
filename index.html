<script>
// js/app.js - VERSÃO SIMPLES SEM MODULE (funciona melhor no Vercel)

let direitos = [];
let isEditing = false;
let currentUser = null;

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

// ==================== LOGIN COM GOOGLE ====================
window.mostrarModalLogin = () => {
  modalLogin.classList.remove('hidden');
};

window.fecharModalLogin = () => {
  modalLogin.classList.add('hidden');
};

window.loginComGoogle = async () => {
  console.log("Tentando login com Google...");
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Login OK!", result.user.email);
    fecharModalLogin();
  } catch (error) {
    console.error(error);
    alert("Erro no login: " + error.message);
  }
};

window.logout = () => {
  signOut(auth);
};

// Monitorar login
onAuthStateChanged(auth, (user) => {
  console.log("Auth mudou:", user ? user.email : "sem usuário");
  if (user && user.email === "lucaslcloux12@gmail.com") {
    isEditing = true;
    currentUser = user;
    editBtn.classList.remove('hidden');
    userEmailEl.classList.remove('hidden');
    userEmailEl.textContent = "lucaslcl...@gmail.com";
    logoutBtn.classList.remove('hidden');
    renderDireitos();
  } else {
    isEditing = false;
    editBtn.classList.add('hidden');
  }
});

// ==================== EDIÇÃO ====================
function renderDireitos() {
  direitosContainer.innerHTML = '';

  direitos.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'bg-white border border-gray-200 rounded-3xl p-10 shadow-sm mb-10';
    div.innerHTML = `
      <div class="flex justify-between">
        <input type="text" value="${item.titulo || ''}" class="text-3xl font-bold w-full border-b focus:border-blue-500 outline-none ${isEditing ? '' : 'pointer-events-none'}" onchange="atualizarTitulo(${index}, this.value)">
        ${isEditing ? `<button onclick="removerTopico(${index})" class="text-red-600 ml-4">🗑</button>` : ''}
      </div>
      <textarea class="w-full h-40 border border-gray-300 rounded-2xl p-5 mt-6 ${isEditing ? '' : 'pointer-events-none bg-gray-50'}" onchange="atualizarTexto(${index}, this.value)">${item.texto || ''}</textarea>
      <input type="text" value="${item.imagem || ''}" placeholder="Link da imagem" class="w-full mt-6 border border-gray-300 rounded-2xl p-4 text-sm ${isEditing ? '' : 'pointer-events-none bg-gray-50'}" onchange="atualizarImagem(${index}, this.value)">
      ${item.imagem ? `<img src="${item.imagem}" class="mt-6 w-full h-64 object-cover rounded-2xl">` : ''}
    `;
    direitosContainer.appendChild(div);
  });

  if (isEditing) {
    const btn = document.createElement('button');
    btn.className = "mt-10 bg-green-600 text-white px-8 py-4 rounded-2xl font-medium";
    btn.innerHTML = "➕ Adicionar Novo Tópico";
    btn.onclick = adicionarTopico;
    direitosContainer.appendChild(btn);
  }
}

window.atualizarTitulo = (index, valor) => { direitos[index].titulo = valor; salvarNoFirebase(); };
window.atualizarTexto = (index, valor) => { direitos[index].texto = valor; salvarNoFirebase(); };
window.atualizarImagem = (index, valor) => { direitos[index].imagem = valor; salvarNoFirebase(); renderDireitos(); };

window.adicionarTopico = () => {
  direitos.push({ titulo: "Novo Tópico", texto: "Escreva aqui...", imagem: "" });
  renderDireitos();
  salvarNoFirebase();
};

window.removerTopico = (index) => {
  if (confirm("Remover?")) {
    direitos.splice(index, 1);
    renderDireitos();
    salvarNoFirebase();
  }
};

function salvarNoFirebase() {
  set(ref(db, 'direitosAdolescentes'), direitos);
}

function carregarDireitos() {
  onValue(ref(db, 'direitosAdolescentes'), (snapshot) => {
    direitos = snapshot.val() || [];
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
  if (!currentUser) {
    alert("Faça login primeiro!");
    return;
  }

  push(ref(db, 'chatMensagens'), {
    texto: texto,
    nome: currentUser.email.split('@')[0],
    timestamp: Date.now()
  });

  chatInput.value = '';
};

// Inicialização
window.onload = () => {
  carregarDireitos();
  console.log("🚀 Versão simplificada carregada - Teste agora");
};
</script>
