import express from 'express';

const host = "0.0.0.0";
const porta = 3000;

const server = express();

// ===== HOME =====
server.get('/', (req, res) => {
    res.send(`
        <html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">RPG</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/criar-conta">Criar Conta</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/criar-personagem">Criar Personagem</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</body>
</html>
`);
});


// ===== CRIAR CONTA =====
server.get('/criar-conta', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cadastro</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
    <h2 class="mb-4 text-center">Cadastro de Usuário</h2>

    <form id="cadastroForm" novalidate>

        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="nome" required>
            <label for="nome">Nome completo</label>
        </div>

        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="email" required>
            <label for="email">E-mail</label>
        </div>

        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="senha" minlength="6" required>
            <label for="senha">Senha (mínimo 6 caracteres)</label>
        </div>

        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="cpf" placeholder="000.000.000-00" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" required>
            <label for="cpf">CPF</label>
        </div>

        <div class="form-floating mb-3">
            <select class="form-select" id="pais" required>
                <option value="" disabled selected>Selecionar país</option>
                <option value="BR">Brasil</option>
                <option value="US">Estados Unidos</option>
                <option value="PT">Portugal</option>
                <option value="JP">Japão</option>
            </select>
            <label for="pais">País de origem</label>
        </div>

        <div class="row mb-3">
            <div class="col-4">
                <select class="form-select" id="dia" required>
                    <option value="" disabled selected>Dia</option>
                    <script>
                        for(let i=1;i<=31;i++){
                            document.write(\`<option value="\${i}">\${i}</option>\`);
                        }
                    </script>
                </select>
            </div>
            <div class="col-4">
                <select class="form-select" id="mes" required>
                    <option value="" disabled selected>Mês</option>
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
            </div>
            <div class="col-4">
                <select class="form-select" id="ano" required>
                    <option value="" disabled selected>Ano</option>
                    <script>
                        const anoAtual = new Date().getFullYear();
                        for(let y=anoAtual; y>=1900; y--){
                            document.write(\`<option value="\${y}">\${y}</option>\`);
                        }
                    </script>
                </select>
            </div>
        </div>

        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="termos" required>
            <label class="form-check-label" for="termos">
                Aceito os termos e condições de uso.
            </label>
        </div>

        <div class="d-grid">
            <button type="submit" class="btn btn-primary">Próximo</button>
        </div>

    </form>
</div>

<script>
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const cpf = document.getElementById("cpf").value;
    const pais = document.getElementById("pais").value;
    const dia = document.getElementById("dia").value;
    const mes = document.getElementById("mes").value;
    const ano = document.getElementById("ano").value;
    const termosAceitos = document.getElementById("termos").checked;

    const hoje = new Date();
    const nascimento = new Date(ano, mes-1, dia);
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesDif = hoje.getMonth() - nascimento.getMonth();
    
    if (mesDif < 0 || (mesDif === 0 && hoje.getDate() < nascimento.getDate())) idade--;

    if (idade < 13) {
        alert("Você precisa ter pelo menos 13 anos.");
        return;
    }

    const cpfRegex = /^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$/;
    if(!cpfRegex.test(cpf)){
        alert("Digite um CPF válido no formato 000.000.000-00.");
        return;
    }

    if(!termosAceitos){
        alert("Você deve aceitar os termos e condições.");
        return;
    }

    alert("Cadastro realizado com sucesso!");
});
</script>
</body>
</html>
`);
});


// ===== CRIAR PERSONAGEM =====
server.get('/criar-personagem', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Formulário - RPG</title>
<style>
/* (todo seu CSS da taverna aqui, igual ao que você mandou) */
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'IM Fell English SC', serif;
  background-color: #2f2f2f;
}
.taverna {
  display: flex;
  gap: 30px;
  background: rgba(0, 0, 0, 0.65);
  border: 3px solid #b8860b;
  border-radius: 12px;
  padding: 25px 30px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  color: #f4e1b6;
  max-width: 900px;
  width: 90%;
}
.taverna-left { flex: 1; text-align: center; }
h1 { color: #ffd700; font-size: 2em; margin-bottom: 10px; text-shadow: 1px 1px 3px #000; }
p.desc { font-size: 14px; color: #e0c085; margin-bottom: 20px; font-family: sans-serif; }
.field-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
label { font-weight: bold; margin-bottom: 4px; }
input, select { width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #d2b48c; background-color: #fff8dc; color: #4b2e05; }
.atributos { background: rgba(255,255,255,0.1); border-radius: 8px; padding: 15px; margin-bottom: 20px; }
button { width: 100%; padding: 12px; background-color: #b8860b; color: #fff8dc; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
button:hover { background-color: #daa520; }
#mensagem { margin-top: 12px; font-weight: bold; font-size: 14px; text-align: center; }
</style>
</head>
<body>
<div class="taverna">
  <div class="taverna-left">
    <h1>🏰 Taverna do Herói</h1>
    <p class="desc">Sente-se à mesa, aventureiro. Crie seu personagem e junte-se à jornada!</p>
  </div>

  <div class="taverna-right">
    <div class="field-group">
      <label for="nome">Nome:</label>
      <input type="text" id="nome">

      <label for="raca">Raça:</label>
      <select id="raca">
        <option>Humano</option>
        <option>Elfo</option>
        <option>Anão</option>
        <option>Orc</option>
      </select>

      <label for="classe">Classe:</label>
      <select id="classe">
        <option>Guerreiro</option>
        <option>Mago</option>
        <option>Ladino</option>
        <option>Clérigo</option>
      </select>

      <label for="arma">Arma:</label>
      <select id="arma">
        <option>Espada</option>
        <option>Arco</option>
        <option>Cajado</option>
        <option>Adaga</option>
      </select>
    </div>

    <div class="atributos">
      <strong>Pontos de Atributo (Máx: 30)</strong>
      <p id="pontos-info" style="color: lightgreen;">Total: 20/30 (10 restante(s))</p>
      <div><span>Força:</span><input type="number" id="forca" value="5" min="1" max="20" oninput="calcularPontos()"></div>
      <div><span>Destreza:</span><input type="number" id="destreza" value="5" min="1" max="20" oninput="calcularPontos()"></div>
      <div><span>Inteligência:</span><input type="number" id="inteligencia" value="5" min="1" max="20" oninput="calcularPontos()"></div>
      <div><span>Carisma:</span><input type="number" id="carisma" value="5" min="1" max="20" oninput="calcularPontos()"></div>
    </div>

    <button onclick="criarPersonagem()">Criar Personagem</button>
    <p id="mensagem"></p>
  </div>
</div>

<script>
const maxPontos = 30;
const atributosIds = ['forca','destreza','inteligencia','carisma'];
const pontosInfo = document.getElementById('pontos-info');
const msg = document.getElementById('mensagem');

function calcularPontos(){
  let total=0;
  for(let id of atributosIds){
    total+=parseInt(document.getElementById(id).value)||0;
  }
  let restante=maxPontos-total;
  pontosInfo.textContent=\`Total: \${total}/\${maxPontos} (\${restante>=0?restante+' restante(s)':-restante+' excedido(s)'})\`;
  pontosInfo.style.color=total>maxPontos?'tomato':total===maxPontos?'gold':'lightgreen';
  msg.textContent='';
}

function criarPersonagem(){
  let total=0;
  for(let id of atributosIds){
    total+=parseInt(document.getElementById(id).value)||0;
  }
  if(total>maxPontos){
    msg.style.color='tomato';
    msg.textContent=\`⚠️ Você usou \${total} pontos. O máximo é \${maxPontos}.\`;
    return;
  }
  const nome=document.getElementById('nome').value.trim()||'Herói sem nome';
  const raca=document.getElementById('raca').value;
  const classe=document.getElementById('classe').value;
  const arma=document.getElementById('arma').value;
  msg.style.color='lightgreen';
  msg.textContent=\`🍻 \${nome}, o \${classe.toLowerCase()} \${raca.toLowerCase()}, empunhando um(a) \${arma.toLowerCase()}, está pronto para a aventura!\`;
}

calcularPontos();
</script>
</body>
</html>
`);
});


server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
