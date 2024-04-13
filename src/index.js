var ExcelToJSON = function () {
  this.parseExcel = function (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(function (sheetName) {
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        jQuery("#xlx_json").val(json_object);
        const updatepage = function () {
          function myFunction(dados) {
            x = document.querySelector(".table tbody");
            document.write(`
<head>
  <link rel="stylesheet" href="style.css"> 
  <style>
    table { 
      page-break-inside:avoid 
    }

    div {
      page-break-inside: avoid;
    }
  </style>
</head>
<body>                           
  <div>${dados}</div>
</body>
`);
          }

          let filteredCitiesHtml = JSON.parse(json_object)
            .map((item) => {
              return `                            
<table class="table">    
  <tr class="pintado">
    <th>ALUNO</th>
    <th>TELEFONE</th>
    <th>RESPONSAVEL</th>
    <th>TELEFONE RESPONSAVEL</th>
    <th>IDADE</th>
    <th>CIDADE BAIRRO</th>       
    <th>DATA</th>       
  </tr>
  <tr>
    <td>${item.ALUNO ? item.ALUNO.toUpperCase() : "*"}</td>
    <td>${item.TELEFONE}</td>
    <td>${item.RESPONSAVEL ? item.RESPONSAVEL.toUpperCase() : "*"}</td>
    <td>${item.TELEFONERESPONSAVEL}</td>
    <td>${item.IDADE}</td>
    <td>${item.CIDADEBAIRRO ? item.CIDADEBAIRRO.toUpperCase() : "*"}</td>
    <td>${item.data}</td>
  </tr>                        
</table>`;
            })
            .join("");

          myFunction(filteredCitiesHtml);
        };
        updatepage();
      });
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}
