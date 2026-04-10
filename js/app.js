// js/app.js
import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
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

// Monitorar estado de login em tempo real
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
      alert("Acesso negado.\n\nApenas lucaslcloux12@gmail.com pode editar o conteúdo.");
      signOut(auth);
    }
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
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    await signInWithPopup(auth, provider);
    fecharModalLogin();
  } catch (error) {
    console.error(error);
    alert("Erro ao fazer login com Google: " + error.message);
  }
};

window.logout = () => signOut(auth);

// Funções de edição, renderDireitos, salvarNoFirebase, carregarDireitos, etc. 
// (mantenha as mesmas funções do passo anterior para renderizar tópicos, adicionar, remover, atualizar imagem, etc.)

// ... (copie aqui as funções renderDireitos, atualizarTitulo, atualizarTexto, atualizarImagem, adicionarTopico, removerTopico, salvarNoFirebase, carregarDireitos, criarDireitosIniciais, toggleChat, enviarMensagem, realizarBusca do código anterior)

window.onload = () => {
  carregarDireitos();
  console.log("%c✅ Passo 4 - Login com Google REAL ativado!", "color:#009edb; font-size:16px");
};
