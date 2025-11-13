import express from 'express';

const host = "0.0.0.0";
const porta = 3000;
var listaUsuarios = [];

const server = express();

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
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
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


// ===== CRIAR CONTA =====
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

        <form method="POST" action="/adicionarUsuario" class="row g-3 needs-validation" novalidate>
            <div class="col-md-4">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" class="form-control" id="nome" name="nome" required>
                <div class="valid-feedback">
                    Informe o nome do usuário.
                </div>
            </div>
            <div class="col-md-4">
                <label for="Sobrenome" class="">Sobrenome</label>
                <input type="text" class="form-control" id="sobrenome" name="sobrenome" required>
                <div class="valid-feedback">
                    Informe o sobrenome do usuário.
                </div>
            </div>
            <div class="col-md-4">
                <label for="Usuário" class="form-label">Usuário</label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" class="form-control" id="usuário" name="usuário"
                        aria-describedby="inputGroupPrepend" required>
                    <div class="invalid-feedback">
                        Informe um nome de usuário válido.
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <label for="Cidade" class="form-label">Cidade</label>
                <input type="text" class="form-control" id="Cidade" name="Cidade" required>
                <div class="invalid-feedback">
                    Informe a cidade.
                </div>
            </div>
            <div class="col-md-3">
                <label for="uf" class="form-label">UF</label>
                <select class="form-select" id="uf" name="uf" required>
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
                <div class="invalid-feedback">
                    informe uma UF válida.
                </div>
            </div>
            <div class="col-md-3">
                <label for="cep" class="form-label">CEP</label>
                <input type="text" class="form-control" id="cep" name="cep" required>
                <div class="invalid-feedback">
                    informe um CEP válido.
                </div>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Cadastrar</button>
                <a class="btn btn-secondary" href="/">Voltar</a>
            </div>
        </form>
    </div>

    <script>
       // Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
    </script>
</body>

</html>
`);
});

server.post('/adicionarUsuario', (req, res) => {
    console.log('Usuário adicionado com sucesso!');
    listaUsuarios.push();
});
server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
