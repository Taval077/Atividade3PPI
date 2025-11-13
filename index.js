import express from 'express';

const host = "0.0.0.0";
const porta = 3000;

var listaUsuarios = [];

const server = express();
server.use(express.urlencoded({ extended: true }));

// ===== HOME =====
server.get('/', (req, res) => {
    res.send(`
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="container-fluid">
    <a class="navbar-brand" href="#">RPG</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Dropdown</a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/cadastrar-usuario">Cadastro de usuário</a></li>
                    <li><a class="dropdown-item" href="#">Cadastro de empresa</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>
</nav>

</body>
</html>
`);
});

// ===== CADASTRAR USUÁRIO =====
server.get('/cadastrar-usuario', (req, res) => {
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

<form method="POST" action="/adicionarUsuario" class="row g-3">

<div class="col-md-4">
<label for="nome" class="form-label">Nome</label>
<input type="text" class="form-control" id="nome" name="nome">
</div>

<div class="col-md-4">
<label for="sobrenome" class="">Sobrenome</label>
<input type="text" class="form-control" id="sobrenome" name="sobrenome">
</div>

<div class="col-md-4">
<label for="usuário" class="form-label">Usuário</label>
<div class="input-group has-validation">
<span class="input-group-text" id="inputGroupPrepend">@</span>
<input type="text" class="form-control" id="usuário" name="usuário">
</div>
</div>

<div class="col-md-6">
<label for="Cidade" class="form-label">Cidade</label>
<input type="text" class="form-control" id="Cidade" name="Cidade">
</div>

<div class="col-md-3">
<label for="uf" class="form-label">UF</label>
<select class="form-select" id="uf" name="uf">
<option selected disabled value="">Escolha um estado...</option>
<option value="AC">Acre</option>
<option value="AL">Alagoas</option>
<option value="AP">Amapá</option>
<option value="AM">Amazonas</option>
<option value="BA">Bahia</option>
<option value="CE">Ceará</option>
<option value="DF">Distrito Federal</option>
<option value="ES">Espírito Santo</option>
<option value="GO">Goiás</option>
<option value="MA">Maranhão</option>
<option value="MT">Mato Grosso</option>
<option value="MS">Mato Grosso do Sul</option>
<option value="MG">Minas Gerais</option>
<option value="PA">Pará</option>
<option value="PB">Paraíba</option>
<option value="PR">Paraná</option>
<option value="PE">Pernambuco</option>
<option value="PI">Piauí</option>
<option value="RJ">Rio de Janeiro</option>
<option value="RN">Rio Grande do Norte</option>
<option value="RS">Rio Grande do Sul</option>
<option value="RO">Rondônia</option>
<option value="RR">Roraima</option>
<option value="SC">Santa Catarina</option>
<option value="SP">São Paulo</option>
<option value="SE">Sergipe</option>
<option value="TO">Tocantins</option>
<option value="EX">Estrangeiro</option>
</select>
</div>

<div class="col-md-3">
<label for="cep" class="form-label">CEP</label>
<input type="text" class="form-control" id="cep" name="cep">
</div>

<div class="col-12">
<button class="btn btn-primary" type="submit">Cadastrar</button>
<a class="btn btn-secondary" href="/">Voltar</a>
</div>

</form>

</div>

</body>
</html>
`);
});

// ===== POST ADICIONAR USUÁRIO =====
server.post('/adicionarUsuario', (req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const usuário = req.body.usuário;
    const cidade = req.body.Cidade;
    const uf = req.body.uf;
    const cep = req.body.cep;

    if (nome && sobrenome && usuário && cidade && uf && cep) {
        listaUsuarios.push({ nome, sobrenome, usuário, cidade, uf, cep });
        return res.redirect('/listarUsuarios');
    }

    // MONTAR HTML COM OS IF ENTRE OS DIVS
    let conteudo = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Cadastro</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
<h2 class="mb-4 text-center">Cadastro de Usuário</h2>

<form method="POST" action="/adicionarUsuario" class="row g-3">`;

    // ===== NOME =====
    conteudo += `
<div class="col-md-4">
<label class="form-label">Nome</label>
<input type="text" class="form-control" name="nome" value="${nome ?? ""}">
</div>`;
    if (!nome) conteudo += `<div class="text-danger">Por favor, preencha o campo Nome.</div>`;

    // ===== SOBRENOME =====
    conteudo += `
<div class="col-md-4">
<label>Sobrenome</label>
<input type="text" class="form-control" name="sobrenome" value="${sobrenome ?? ""}">
</div>`;
    if (!sobrenome) conteudo += `<div class="text-danger">Por favor, preencha o campo Sobrenome.</div>`;

    // ===== USUÁRIO =====
    conteudo += `
<div class="col-md-4">
<label>Usuário</label>
<div class="input-group">
<span class="input-group-text">@</span>
<input type="text" class="form-control" name="usuário" value="${usuário ?? ""}">
</div>
</div>`;
    if (!usuário) conteudo += `<div class="text-danger">Por favor, preencha o campo Usuário.</div>`;

    // ===== CIDADE =====
    conteudo += `
<div class="col-md-6">
<label>Cidade</label>
<input type="text" class="form-control" name="Cidade" value="${cidade ?? ""}">
</div>`;
    if (!cidade) conteudo += `<div class="text-danger">Por favor, preencha o campo Cidade.</div>`;

    // ===== UF =====
    conteudo += `
<div class="col-md-3">
<label>UF</label>
<select class="form-select" name="uf">
<option ${!uf ? "selected" : ""} disabled value="">Escolha um estado...</option>
<option value="AC" ${uf=="AC"?"selected":""}>Acre</option>
<option value="AL" ${uf=="AL"?"selected":""}>Alagoas</option>
<option value="AP" ${uf=="AP"?"selected":""}>Amapá</option>
<option value="AM" ${uf=="AM"?"selected":""}>Amazonas</option>
<option value="BA" ${uf=="BA"?"selected":""}>Bahia</option>
<option value="CE" ${uf=="CE"?"selected":""}>Ceará</option>
<option value="DF" ${uf=="DF"?"selected":""}>Distrito Federal</option>
<option value="ES" ${uf=="ES"?"selected":""}>Espírito Santo</option>
<option value="GO" ${uf=="GO"?"selected":""}>Goiás</option>
<option value="MA" ${uf=="MA"?"selected":""}>Maranhão</option>
<option value="MT" ${uf=="MT"?"selected":""}>Mato Grosso</option>
<option value="MS" ${uf=="MS"?"selected":""}>Mato Grosso do Sul</option>
<option value="MG" ${uf=="MG"?"selected":""}>Minas Gerais</option>
<option value="PA" ${uf=="PA"?"selected":""}>Pará</option>
<option value="PB" ${uf=="PB"?"selected":""}>Paraíba</option>
<option value="PR" ${uf=="PR"?"selected":""}>Paraná</option>
<option value="PE" ${uf=="PE"?"selected":""}>Pernambuco</option>
<option value="PI" ${uf=="PI"?"selected":""}>Piauí</option>
<option value="RJ" ${uf=="RJ"?"selected":""}>Rio de Janeiro</option>
<option value="RN" ${uf=="RN"?"selected":""}>Rio Grande do Norte</option>
<option value="RS" ${uf=="RS"?"selected":""}>Rio Grande do Sul</option>
<option value="RO" ${uf=="RO"?"selected":""}>Rondônia</option>
<option value="RR" ${uf=="RR"?"selected":""}>Roraima</option>
<option value="SC" ${uf=="SC"?"selected":""}>Santa Catarina</option>
<option value="SP" ${uf=="SP"?"selected":""}>São Paulo</option>
<option value="SE" ${uf=="SE"?"selected":""}>Sergipe</option>
<option value="TO" ${uf=="TO"?"selected":""}>Tocantins</option>
<option value="EX" ${uf=="EX"?"selected":""}>Estrangeiro</option>
</select>
</div>`;
    if (!uf) conteudo += `<div class="text-danger">Por favor, preencha o campo UF.</div>`;

    // ===== CEP =====
    conteudo += `
<div class="col-md-3">
<label>CEP</label>
<input type="text" class="form-control" name="cep" value="${cep ?? ""}">
</div>`;
    if (!cep) conteudo += `<div class="text-danger">Por favor, preencha o campo CEP.</div>`;

    conteudo += `
<div class="col-12">
<button class="btn btn-primary" type="submit">Cadastrar</button>
<a class="btn btn-secondary" href="/">Voltar</a>
</div>
</form>
</div>

</body>
</html>
`;

    return res.send(conteudo);
});

// ===== LISTAR USUÁRIOS =====
server.get('/listarUsuarios', (req, res) => {

    let conteudo = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Lista de Usuários</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
<h2 class="mb-4 text-center">Lista de Usuários</h2>

<table class="table table-striped">
<thead>
<tr>
<th>Nome</th>
<th>Sobrenome</th>
<th>Usuário</th>
<th>Cidade</th>
<th>UF</th>
<th>CEP</th>
</tr>
</thead>
<tbody>`;

    listaUsuarios.forEach(usuario => {
        conteudo += `
<tr>
<td>${usuario.nome}</td>
<td>${usuario.sobrenome}</td>
<td>${usuario.usuário}</td>
<td>${usuario.cidade}</td>
<td>${usuario.uf}</td>
<td>${usuario.cep}</td>
</tr>`;
    });

    conteudo += `
</tbody>
</table>

<a class="btn btn-primary" href="/cadastrar-usuario">Cadastrar Novo Usuário</a>
<a class="btn btn-secondary" href="/">Voltar ao Início</a>

</div>
</body>
</html>
`;

    res.send(conteudo);
});

// ===== INICIAR SERVIDOR =====
server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
