import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const supabaseUrl = 'https://zkkvepzxnzbsdwquhivg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpra3ZlcHp4bnpic2R3cXVoaXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzU5MzYsImV4cCI6MjA1NjE1MTkzNn0.79ldO9iHBsWL02F1154aO0u8ev9rjJ-PEIpucnv6BOs';

// Criar o cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function addUser(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value.trim();

const { data, error } = await supabase
    .from("players")
    .insert([{ nome:nome, senha:senha }]);
  
  if (error) {
    console.error("Erro ao salvar no banco:", error);
  } else {
    console.log("Sucesso ao salvar:", data);
    alert("sucesso")
  }
}

async function login(event) {
  
  event.preventDefault();
  
  const nome= document.getElementById("nome").value.trim();
  const senha= document.getElementById("senha").value.trim();
  
  const {data,error} = await supabase 
  .from('players')
  .select('id, nome, senha')
  .eq('nome', nome)
  .single();
  
  if(error){
    console.error('erro ao buscar usuário:', error);
    alert('erro ao tentar fazer login.');
    return;
  }
  console.log(data.senha);
  
  if(Number(data.senha) === Number(senha)){
    localStorage.setItem("UID")
  }else{
    alert('senha incorreta');
    
  }
}



async function addCard(event) {
  event.preventDefault(); // Corrigido erro de digitação
  
  const selecionado = document.querySelector('input[name="tipo"]:checked');
  
  if (!selecionado) {
    console.log("Selecione Verdade ou Desafio antes de continuar!");
    return; // Evita continuar sem uma seleção válida
  }
  
  const texto = document.getElementById("texto").value.trim();
  const escolha = selecionado.value;
  
  if (texto === "") {
    console.log("Digite um texto antes de criar!");
    return;
  }
  
  const { data, error } = await supabase
    .from("cartas")
    .insert([{ voud: escolha, texto: texto }]);
  
  if (error) {
    console.error("Erro ao salvar no banco:", error);
  } else {
    console.log("Sucesso ao salvar:", data);
    document.getElementById("texto").value = ""; // Limpa o campo após salvar
  }
}

async function List() {
  const {data, error} = await supabase
  .from('cartas')
  .select('voud, texto');
  if (error){
    console.error('erro ao buscar dados:', error);
  }else{
    const list = document.getElementById('lcards');
    list.innerHTML='';
    
    data.forEach(item => {
      const listItem = document.createElement('li');
      const listText =  `${item.voud} ${item.texto}`;
      
      listItem.textContent = listText;
     list.appendChild(listItem);
    });
  }
 
}

List();








document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("entrar").addEventListener("click", login);
  document.getElementById("Criar").addEventListener("click", addCard);
  document.getElementById("criarU").addEventListener("click", addUser);
  
  const divs = document.querySelectorAll(".l");
  divs.forEach(div => div.style.display = "none");
  
  document.getElementById("home").style.display = "block";
  
  document.getElementById("cartas").addEventListener("click", () => {
    divs.forEach(div => div.style.display = "none");
    document.getElementById("cards").style.display = "block";
    document.getElementById("LCards").style.display = "block";
  });
  
  document.getElementById("LV").addEventListener("click", () => {
    document.getElementById("ACard").style.display = "none";
    document.getElementById("LCards").style.display = "block";
  });
  
  document.getElementById("CCard").addEventListener("click", () => {
    document.getElementById("LCards").style.display = "none";
    document.getElementById("ACard").style.display ="block";
  });
  
  document.getElementById("jogar").addEventListener("click", () => {
    divs.forEach(div => div.style.display = "none");
    document.getElementById("game").style.display = "block";
  });
  
  const voltarButtons = document.getElementsByClassName("voltar");
  Array.from(voltarButtons).forEach(button => {
    button.addEventListener("click", () => {
      divs.forEach(div => div.style.display = "none");
      document.getElementById("home").style.display = "block";
    });
  });
});