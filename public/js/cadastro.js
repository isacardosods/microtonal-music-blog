function cadastrar() {

  var nomeVar = nome_input.value;
  var emailVar = email_input.value;
  var telefoneVar = telefone_input.value;
  var senhaVar = senha_input.value;
  var confirmacaoSenhaVar = confirmacao_senha_input.value;

  //refatorando esse codigo com um laço de repetição+vetor
  // if (
  //   nomeVar == "" ||
  //   emailVar == "" ||
  //   telefoneVar == "" ||
  //   senhaVar == "" ||
  //   confirmacaoSenhaVar == ""
  // ) {
  //   cardErro.style.display = "block";
  //   mensagem_erro.innerHTML =
  //     "(Mensagem de erro para todos os campos em branco)";

  //   finalizarAguardar();
  //   return false;
  // } else {
  //   setInterval(sumirMensagem, 5000);
  // }

  let lista_inputs = [nomeVar, emailVar, telefoneVar, senhaVar, confirmacaoSenhaVar];
  let campo_vazio = false;

  for (let i = 0; i < lista_inputs.length; i++) {
    if (lista_inputs[i] == '') {
      campo_vazio = true;
      break;
    }
  }
  if (campo_vazio) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = '(Mensagem de erro para todos os campos em branco)'

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  if (nomeVar.length > 1 && emailVar.includes('@') && emailVar.includes('.') && senhaVar.length >= 6 && confirmacaoSenhaVar == senhaVar && telefoneVar.length == 11) {
    cardErro.style.display = "block";

    mensagem_erro.innerHTML =
      "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
  } else {
    cardErro.style.display = "block";

    mensagem_erro.innerHTML =
      "Erro!";

    return;
  }

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      telefoneServer: telefoneVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        cardErro.style.display = "block";

        mensagem_erro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

        setTimeout(() => {
          window.location = "login.html";
        }, "2000");

        limparFormulario();
        finalizarAguardar();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });

  return false;
}

function sumirMensagem() {
  cardErro.style.display = "none";
}