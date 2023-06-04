
// Função para carregar o arquivo XML
// Declare a variável xmlData no escopo global
var xmlData;

// Função para carregar o arquivo XML
function loadXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlData = this.responseXML; // Atribua o valor ao xmlData global
        }
    };
    xhttp.open("GET", "../data/alunos.xml", true);
    xhttp.send();
}

function searchAluno() {
    var input = document.getElementById("searchInput");
    var grr = input.value;
  
    var matrAlunos = xmlData.getElementsByTagName("MATR_ALUNO");
    var alunoEncontrado = null;
  
    // Verificar se o GRR digitado existe entre os campos de MATR_ALUNO
    for (var i = 0; i < matrAlunos.length; i++) {
      var matrAluno = matrAlunos[i].textContent;
  
      if (matrAluno === grr) {
        alunoEncontrado = getAlunoData(matrAlunos[i]);
        console.log("Aluno encontrado!");
        break;
      }
    }
  
    // Renderizar a tabela com as células coloridas, se o aluno for encontrado
    if (alunoEncontrado) 
    {
      var popup = document.createElement("div");
      popup.className = "popup2";
      popup.innerHTML = "Aluno encontrado!";
      document.body.appendChild(popup);
  
      // Remover o pop-up após alguns segundos
      setTimeout(function() {
        document.body.removeChild(popup);
      }, 3000);
      renderTable(alunoEncontrado);
    } 
    else 
    {
      // Exibir pop-up de aviso
      var popup = document.createElement("div");
      popup.className = "popup";
      popup.innerHTML = "Aluno não encontrado!";
      document.body.appendChild(popup);
  
      // Remover o pop-up após alguns segundos
      setTimeout(function() {
        document.body.removeChild(popup);
      }, 3000);
      console.log("Aluno não encontrado!");
    }
  }
  
var btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", searchAluno);

  // Função para extrair os dados do aluno com base no elemento MATR_ALUNO
function getAlunoData(matrAlunoElement) 
{
    var alunoData = {
        disciplinas: []
    };

    // Extrair os dados das disciplinas do aluno
    var disciplinas = matrAlunoElement.parentNode.getElementsByTagName("DISCIPLINA");
    for (var i = 0; i < disciplinas.length; i++) 
    {
        var codigo = disciplinas[i].getElementsByTagName("COD_DISCIPLINA")[0].textContent;
        var situacao = disciplinas[i].getElementsByTagName("SIGLA")[0].textContent;

        alunoData.disciplinas.push
        ({
            codigo: codigo,
            situacao: situacao
        });
    }

    return alunoData;
}

// function renderTable(alunoData) {
//     var cells = document.querySelectorAll("#grade tbody td");
  
//     // Limpar as classes existentes nas células
//     cells.forEach(function(cell) {
//       cell.className = "";
//     });
  
//     // Preencher as células com as classes correspondentes
//     alunoData.disciplinas.forEach(function(disciplina) {
//       var codigo = disciplina.codigo;
//       var situacao = disciplina.situacao;
  
//       var cell = document.getElementById(codigo);
//       if (cell) {
//         cell.classList.add(situacao);
//       }
//     });
// }

function renderTable(aluno) 
{
    var cells = document.querySelectorAll("#grade tbody td");

    for (var i = 0; i < cells.length; i++) 
    {
        var cell = cells[i];
        var codigoDisciplina = cell.id;
        var disciplina = aluno.disciplinas.find(
        (disc) => disc.codigo === codigoDisciplina
        );

        if (disciplina && disciplina.situacao) 
        {
            var classSituacao = "";

            switch (disciplina.situacao) {
                case "Aprovado":
                classSituacao = "aprovado";
                break;
                case "Reprovado":
                classSituacao = "reprovado";
                break;
                case "Matricula":
                classSituacao = "matriculado";
                break;
                case "Equivale":
                classSituacao = "equivale";
                break;
        }

        cell.classList.add(classSituacao);
        }
    }
}

// Chame a função loadXML para carregar e processar o XML quando necessário
loadXML();
