

var xmlData;

document.addEventListener("DOMContentLoaded", function() {
  var btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", function() {
    var searchInput = document.getElementById("searchInput").value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          xmlData = xhr.responseXML;
          var alunos = xmlData.getElementsByTagName("ALUNO");
          let alunoEncontrado = false;

          for (var i = 0; i < alunos.length; i++) {
            var matriculaAluno = alunos[i].getElementsByTagName("MATR_ALUNO")[0].innerHTML;
            if (matriculaAluno === searchInput) {
              alunoEncontrado = true;
              break;
            }
          }

          if (alunoEncontrado) {
            exibirTabelaAluno(matriculaAluno);
          } else {
            alert("Aluno não encontrado!");
          }
        } else {
          alert("Erro ao carregar XML!");
        }
      }
    };
    xhr.open("GET", "../data/alunos.xml", true);
    xhr.send();
  });
});

function limparTabela() {
  var tabela = document.getElementById("grade");
  var linhas = tabela.getElementsByTagName("tr");

  // Iterar sobre as células da tabela e redefinir a cor de fundo
  for (var i = 1; i < linhas.length; i++) {
    var celulas = linhas[i].getElementsByTagName("td");
    for (var j = 0; j < celulas.length; j++) {
      celulas[j].style.backgroundColor = "";
    }
  }
}

function exibirTabelaAluno(matricula) 
{
    limparTabela();
    var tabela = document.getElementById("grade");
    var linhas = tabela.getElementsByTagName("tr");

    var alunos = xmlData.getElementsByTagName("ALUNO");

    let contador_opt = 1;
    // let codigo_opt = "";

    // var matriculas = xmlData.getElementsByTagName("MATR_ALUNO");
    // console.log("Quantidade de tags MATR_ALUNO: ", matriculas.length);

    for (let i  = 0; i < alunos.length; i++)
    {
        if(matricula === alunos[i].getElementsByTagName("MATR_ALUNO")[0].innerHTML)
        {
            // console.log("matricula encontrada!");
            let aluno = alunos[i];
            
            for(let lin = 1; lin < linhas.length; lin++)
            {
                var celulas = linhas[lin].getElementsByTagName("td");
 
                for(let col = 0; col < celulas.length; col++)
                {
                    var disciplina = celulas[col];
                    var id = disciplina.getAttribute("id");

                    let situacao = aluno.getElementsByTagName("SITUACAO")[0].innerHTML;
                    // console.log("sigla: ", situacao);
                    let codigo_curso = aluno.getElementsByTagName("COD_ATIV_CURRIC")[0].innerHTML;

                    let tipo_disciplina = aluno.getElementsByTagName("DESCR_ESTRUTURA")[0].innerHTML;

                    // if (tipo_disciplina === "Optativas" && id.includes("OPT")) 
                    // {
                    //   codigo_curso = "OPT" + contador_opt;
                    //   if(codigo_curso === id)
                    //   {
                    //     contador_opt++;
                    //     console.log("ID:", id, " COD:", codigo_curso, " Situacao: ", situacao);
                    //   }
                    //   else
                    //   {
                    //     console.log("ID:", id, " COD:", codigo_curso);
                    //   }// Incrementar o contador apenas quando tipo_disciplina for igual a "Optativas"
                    if (tipo_disciplina === "Trabalho de Graduação I") 
                    {
                      codigo_curso = "TG1";
                    } 
                    else if (tipo_disciplina === "Trabalho de Graduação II")
                    {
                      codigo_curso = "TG2";
                    }

                    if (id === codigo_curso)
                    {
                        if (situacao === "Aprovado") 
                        {
                          disciplina.style.backgroundColor = "#32CD32";
                        } 
                        else if (situacao === "Reprovado por nota" || situacao === "Reprovado por Frequência") 
                        {
                          disciplina.style.backgroundColor = "red";
                        } 
                        else if (situacao === "Matrícula") 
                        {
                          disciplina.style.backgroundColor = "#00BFFF";
                        } 
                        else if (situacao === "Equivalência de Disciplina") 
                        {
                          disciplina.style.backgroundColor = "yellow";
                        } 
                        else 
                        {
                          disciplina.style.backgroundColor = "gray";
                        }
                    }
                }
            } 
        }
    }
}

