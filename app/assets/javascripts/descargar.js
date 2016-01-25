// some data to export
function descargar(){


var numero = descargardatos.length;
var data =[numero];
var fecha = año+"/"+mes+"/"+dia;
for (var i = 0; i < numero; i++) {
    
     data[i] = {"fecha": fecha, "dato": descargardatos[i]}
 
}



// prepare CSV data
var csvData = new Array();
csvData.push('"' + "Fecha" + '","' + dato + '"');

data.forEach(function(item, index, array) {
  csvData.push('"' + item.fecha + '","' + item.dato + '"');
});


// download stuff
var fileName = "data.csv";
var buffer = csvData.join("\n");
var blob = new Blob([buffer], {
  "type": "text/csv;charset=utf8;"          
});


link = document.getElementById('link');
link.setAttribute("href", window.URL.createObjectURL(blob));
link.setAttribute("download", fileName);


}




function descargarreal(){


var numero = descargardatos22.length;
var data =[numero];
for (var i = 0; i < numero; i++) {
    
     data[i] = {"fecha": i, "dato": descargardatos22[i], "dato1": descargardatos33[i]}
 
}



// prepare CSV data
var csvData = new Array();
csvData.push('"' + "ID" + '","' + "Voltaje (V)" + '","' + "Corriente (A)" + '"');

data.forEach(function(item, index, array) {
  csvData.push('"' + item.fecha + '","' + item.dato + '","' + item.dato1 + '"');
});


// download stuff
var fileName = "data.csv";
var buffer = csvData.join("\n");
var blob = new Blob([buffer], {
  "type": "text/csv;charset=utf8;"          
});


link = document.getElementById('link');
link.setAttribute("href", window.URL.createObjectURL(blob));
link.setAttribute("download", fileName);
descargardatos2=[];

}



