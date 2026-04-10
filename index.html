// js/app.js
import { ref, onValue, set, push } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { auth } from "./firebase.js";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

let direitos = [];
let isEditing = false;

// Elementos DOM
const direitosContainer = document.getElementById('direitosContainer');
const editBtn = document.getElementById('editBtn');
const userEmailEl = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const modalLogin = document.getElementById('modalLogin');
const chatMessages = document.getElementById('chatMessages');

// Monitorar login com Google
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user.email === "lucaslcloux12@gmail.com") {
      isEditing = true;
      userEmailEl.classList.remove('hidden');
      userEmailEl.textContent = user.email.split('@')[0] + "...@gmail.com";
      logoutBtn.classList.remove('hidden');
      editBtn.classList.remove('hidden');
      renderDireitos();
    } else {
      alert("Acesso negado.\n\nSomente lucaslcloux12@gmail.com pode editar.");
      signOut(auth);
    }
  } else {
    isEditing = false;
    editBtn.classList.add('hidden');
    userEmailEl.classList.add('hidden');
    logoutBtn.classList.add('hidden');
  }
});

// ==================== LOGIN COM GOOGLE ====================
window.mostrarModalLogin = () => modalLogin.classList.remove('hidden');
window.fecharModalLogin = () => modalLogin.classList.add('hidden');

window.loginComGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    await signInWithPopup(auth, provider);
    fecharModalLogin();
  } catch (error) {
    console.error(error);
    alert("Erro ao fazer login: " + error.message);
  }
};

window.logout = () => signOut(auth);

// ==================== EDIÇÃO DE TÓPICOS ====================
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
        
        ${isEditing ? `<button onclick="window.removerTopico(${index})" class="text-red-500 hover:text-red-700 p-3"><i class="fa-solid fa-trash-can text-xl"></i></button>` : ''}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-7">
          <textarea rows="7" 
                    class="w-full border border-gray-300 rounded-2xl p-6 text-base leading-relaxed focus:border-blue-500 outline-none resize-y ${isEditing ? '' : 'pointer-events-none bg-gray-50'}"
                    onchange="window.atualizarTexto(${index}, this.value)">${item.texto}</textarea>
        </div>
        <div class="lg:col-span-5">
          <div class="text-sm text-gray-500 mb-3 font-medium">Link da Imagem</div>
          <input type="text" value="${item.imagem || ''}" placeholder="https://exemplo.com/imagem.jpg"
                 class="w-full border border-gray-300 rounded-2xl px-5 py-4 text-sm focus:border-blue-500 outline-none ${isEditing ? '' : 'pointer-events-none bg-gray-50'}"
                 onchange="window.atualizarImagem(${index}, this.value)">
          
          ${item.imagem ? 
            `<img src="${item.imagem}" class="mt-6 w-full h-64 object-cover rounded-2xl shadow-md">` : 
            `<div class="mt-6 h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm">Nenhuma imagem adicionada</div>`
          }
        </div>
      </div>
    `;
    direitosContainer.appendChild(div);
  });

  if (isEditing) {
    const addBtn = document.createElement('button');
    addBtn.className = "mt-20 mx-auto block bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-5 rounded-3xl transition-all flex items-center gap-3";
    addBtn.innerHTML = `<i class="fa-solid fa-circle-plus text-2xl"></i> Adicionar Novo Tópico`;
    addBtn.onclick = window.adicionarTopico;
    direitosContainer.appendChild(addBtn);
  }
}

window.atualizarTitulo = (index, valor) => { direitos[index].titulo = valor; salvarNoFirebase(); };
window.atualizarTexto = (index, valor) => { direitos[index].texto = valor; salvarNoFirebase(); };
window.atualizarImagem = (index, valor) => { direitos[index].imagem = valor; salvarNoFirebase(); renderDireitos(); };

window.adicionarTopico = () => {
  direitos.push({
    titulo: "Novo Direito do Adolescente",
    texto: "Descreva aqui o direito...",
    imagem: ""
  });
  renderDireitos();
  salvarNoFirebase();
};

window.removerTopico = (index) => {
  if (confirm("Remover este tópico permanentemente?")) {
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
    direitos = data || criar30TopicosIniciais();
    renderDireitos();
  });
}

function criar30TopicosIniciais() {
  return [
    { titulo: "1. Direito à Vida, Sobrevivência e Desenvolvimento", texto: "Todo adolescente tem direito à vida, à sobrevivência e ao desenvolvimento pleno em condições dignas.", imagem: "https://picsum.photos/id/1015/800/450" },
    { titulo: "2. Direito à Educação de Qualidade", texto: "Acesso a uma educação inclusiva, equitativa e de qualidade que prepare para a vida adulta.", imagem: "https://picsum.photos/id/201/800/450" },
    { titulo: "3. Direito à Saúde Integral", texto: "Acesso universal a serviços de saúde física, mental e sexual e reprodutiva de qualidade.", imagem: "" },
    { titulo: "4. Direito à Proteção contra Violência", texto: "Proteção contra todas as formas de violência física, psicológica, sexual e digital.", imagem: "https://picsum.photos/id/237/800/450" },
    { titulo: "5. Direito à Participação", texto: "Ser ouvido e participar das decisões que afetam sua vida, família e comunidade.", imagem: "" },
    { titulo: "6. Direito à Liberdade de Expressão", texto: "Expressar suas opiniões, ideias e sentimentos de forma livre e responsável.", imagem: "https://picsum.photos/id/133/800/450" },
    { titulo: "7. Direito à Não Discriminação", texto: "Ser tratado com igualdade, independentemente de raça, gênero, orientação sexual, deficiência ou origem.", imagem: "" },
    { titulo: "8. Direito ao Lazer e Cultura", texto: "Acesso a atividades culturais, esportivas e de lazer que promovam seu desenvolvimento.", imagem: "https://picsum.photos/id/180/800/450" },
    { titulo: "9. Direito à Proteção no Ambiente Digital", texto: "Segurança online, privacidade e proteção contra bullying e exploração na internet.", imagem: "" },
    { titulo: "10. Direito à Alimentação Adequada", texto: "Acesso a alimentos nutritivos e suficientes para um crescimento saudável.", imagem: "https://picsum.photos/id/292/800/450" },
    // ... (os outros 20 tópicos continuam abaixo para não ficar muito longo)
    { titulo: "11. Direito ao Trabalho Protegido", texto: "Proteção contra trabalho infantil e exploração, com direito a condições justas se for maior de 16 anos.", imagem: "" },
    { titulo: "12. Direito à Identidade e Nome", texto: "Ter seu nome, nacionalidade e identidade respeitados e registrados.", imagem: "" },
    { titulo: "13. Direito à Família e Convívio", texto: "Conviver com a família ou em ambiente que garanta afeto e proteção.", imagem: "" },
    { titulo: "14. Direito à Moradia Digna", texto: "Viver em um ambiente seguro, adequado e saudável.", imagem: "https://picsum.photos/id/316/800/450" },
    { titulo: "15. Direito à Justiça e Devido Processo", texto: "Ser tratado com justiça e ter direitos garantidos no sistema judicial.", imagem: "" },
    { titulo: "16. Direito ao Esporte e Atividade Física", texto: "Praticar esportes e atividades físicas em ambiente seguro.", imagem: "" },
    { titulo: "17. Direito à Orientação Profissional", texto: "Receber orientação para escolher seu futuro profissional.", imagem: "" },
    { titulo: "18. Direito à Liberdade Religiosa", texto: "Praticar ou não praticar sua religião sem sofrer discriminação.", imagem: "" },
    { titulo: "19. Direito à Proteção Ambiental", texto: "Viver em um ambiente equilibrado e participar de ações de preservação.", imagem: "" },
    { titulo: "20. Direito ao Acesso à Informação", texto: "Ter acesso a informações claras sobre seus direitos e oportunidades.", imagem: "" },
    { titulo: "21. Direito à Saúde Mental", texto: "Acesso a suporte psicológico e emocional quando necessário.", imagem: "https://picsum.photos/id/201/800/450" },
    { titulo: "22. Direito à Igualdade de Gênero", texto: "Ser tratado com igualdade independentemente do gênero.", imagem: "" },
    { titulo: "23. Direito à Inclusão de Pessoas com Deficiência", texto: "Acesso a todas as oportunidades sem barreiras.", imagem: "" },
    { titulo: "24. Direito ao Descanso e Férias", texto: "Ter tempo para descanso, brincar e se divertir.", imagem: "" },
    { titulo: "25. Direito à Proteção contra Exploração", texto: "Proteção contra qualquer forma de exploração sexual ou laboral.", imagem: "" },
    { titulo: "26. Direito à Cidadania Ativa", texto: "Participar da vida cidadã e contribuir com a sociedade.", imagem: "" },
    { titulo: "27. Direito ao Respeito à Diversidade", texto: "Ter sua cultura, crenças e identidade respeitadas.", imagem: "" },
    { titulo: "28. Direito à Orientação Sexual e Afetiva", texto: "Ser respeitado em sua orientação sexual sem sofrer preconceito.", imagem: "" },
    { titulo: "29. Direito à Transição Segura para a Vida Adulta", texto: "Receber apoio para a transição da adolescência para a vida adulta.", imagem: "" },
    { titulo: "30. Direito a Sonhar e Realizar", texto: "Ter o direito de sonhar, planejar e construir um futuro melhor.", imagem: "https://picsum.photos/id/1015/800/450" }
  ];
}

// ==================== CHAT EM TEMPO REAL ====================
const chatRef = ref(window.db, 'chatMensagens');

onValue(chatRef, (snapshot) => {
  const mensagens = snapshot.val() || {};
  chatMessages.innerHTML = '';
  
  Object.values(mensagens).forEach(msg => {
    const div = document.createElement('div');
    div.className = msg.email === "lucaslcloux12@gmail.com" ? "flex justify-end" : "flex justify-start";
    div.innerHTML = `
      <div class="${msg.email === "lucaslcloux12@gmail.com" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} px-5 py-3 rounded-3xl max-w-[80%] rounded-tr-none">
        <small class="opacity-75 block text-xs">${msg.nome}</small>
        ${msg.texto}
      </div>
    `;
    chatMessages.appendChild(div);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

window.enviarMensagem = () => {
  const input = document.getElementById('chatInput');
  const texto = input.value.trim();
  if (!texto) return;

  const user = auth.currentUser;
  if (!user) {
    alert("Faça login para enviar mensagens no chat.");
    return;
  }

  push(chatRef, {
    texto: texto,
    nome: user.email.split('@')[0],
    email: user.email,
    timestamp: Date.now()
  });

  input.value = '';
};

window.toggleChat = () => {
  const bubble = document.getElementById('chatBubble');
  const windowEl = document.getElementById('chatWindow');
  windowEl.classList.toggle('hidden');
  bubble.classList.toggle('rotated');
};

// Busca
window.realizarBusca = () => {
  const termo = document.getElementById('searchInput').value.trim();
  if (termo) alert(`🔍 Buscando "${termo}" nos direitos dos adolescentes...`);
};

// Inicialização
window.onload = () => {
  carregarDireitos();
  console.log("%c✅ Passo 5 concluído - 30 tópicos + Chat em tempo real + Login Google", "color:#009edb; font-size:18px; font-weight:bold");
};
