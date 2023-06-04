
// Função para carregar o arquivo XML
// Declare a variável xmlData no escopo global
let xmlData;
let grids = {};

const grid = document.getElementById('grade');
const cells = grid.getElementsByTagName('td');


// Função para carregar o arquivo XML
function loadXML() 
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlData = this.responseXML; // Atribua o valor ao xmlData global
            processXML();
        }
    };
    xhttp.open("GET", "../data/alunos.xml", true);
    xhttp.send();
}

function processXML()
{
    const students = xmlData.getElementsByTagName("ALUNO");

    for (let i = 0; i < students.length; i++)
    {
        const student = students[i];
        // const situation = student.getElementsByTagName('SITUACAO')[0].textContent;
        // const sigla = student.getElementsByTagName('SITUACAO')[0].textContent;
        const grr = student.getElementsByTagName('MATR_ALUNO')[0].textContent;
        const course = student.getElementsByTagName('COD_ATIV_CURRIC')[0].textContent;
        let code = course;
        
        if(grids[grr] == null)
        {
            grids[grr] = {};
        }

        // If the table for the course doesn't exist yet, create it
        if (grids[grr][code] == null)
        {
            grids[grr][code] = createTable();
        }

        // if ((type == 'Optativas') && (code != 'OPT')) 
        // {
        //   if (grids[grr]['OPT'] == null) 
        //   {
        //       grids[grr]['OPT'] = createTable();
        //   }
        //   row = grids[grr]['OPT'].getElementsByTagName('tbody')[0].insertRow();
        //   row.innerHTML = `<td>${course}</td><td>${name}</td><td>${year}</td><td>${semester}</td><td>${situation}</td><td>${grade}</td><td>${attendance}</td>`;
        // }
        // row = tables[grr][code].getElementsByTagName('tbody')[0].insertRow();
        // row.innerHTML = `<td>${course}</td><td>${name}</td><td>${year}</td><td>${semester}</td><td>${situation}</td><td>${grade}</td><td>${attendance}</td>`;
    }
}

let currentStudent;

function searchStudent() 
{
    const input = document.getElementById("searchInput");
    const grr = input.value;
    const studentInfo = grids[grr];
    
    if(studentInfo != null)
    {
        currentStudent = grr;
        console.log("Aluno encontrado!");

        let popup = document.createElement("div");
        popup.className = "popup2";
        popup.innerHTML = "Aluno encontrado!";
        document.body.appendChild(popup);
    
        // Remover o pop-up após alguns segundos
        setTimeout(function()
        {
            document.body.removeChild(popup);
        }, 3000);
        renderTable();
    }
    else
    {
        console.log("Aluno não encontrado");

        let popup = document.createElement("div");
        popup.className = "popup";
        popup.innerHTML = "Aluno não encontrado!";
        document.body.appendChild(popup);
    
        // Remover o pop-up após alguns segundos
        setTimeout(function()
        {
            document.body.removeChild(popup);
        }, 3000);
    }
}

function createTable() 
{
    let table = document.createElement('table');
    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow();
    headerRow.innerHTML = '<th>Código</th><th>Nome</th><th>Ano</th><th>Período</th><th>Situação</th><th>Nota</th><th>Frequência</th>';
    table.createTBody();
    return table;
}

function renderTable() {
  for (let i = 0; i < cells.length; i++) {
      let code = cells[i].id;
      if (grids[currentStudent] && grids[currentStudent][code]) {
          let rows = grids[currentStudent][code].getElementsByTagName('tr');
          if (rows.length > 0) {
              let situationCell = rows[rows.length - 1].getElementsByTagName('td')[4];
              if (situationCell) {
                  let situation = situationCell.textContent;

                  if (situation == 'Aprovado') {
                      cells[i].style.backgroundColor = '#4CAF50';
                  } else if (situation == 'Reprovado por nota' || situation == 'Reprovado por Frequência') {
                      cells[i].style.backgroundColor = '#F44336';
                  } else if (situation == 'Equivalência de Disciplina') {
                      cells[i].style.backgroundColor = '#FBC02D';
                  } else if (situation == 'Matrícula') {
                      cells[i].style.backgroundColor = '#1E88E5';
                  } else {
                      cells[i].style.backgroundColor = '#3E3E42';
                  }
                  continue;
              }
          }
      }
      cells[i].style.backgroundColor = '#606060';
  }
}

var btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", searchStudent);

// Chame a função loadXML para carregar e processar o XML quando necessário
loadXML();
