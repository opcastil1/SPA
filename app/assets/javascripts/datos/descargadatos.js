// some data to export
function descargadatos(lenght,dato,db,año,mes,dia){


console.log(lenght);
var numero = length;
var data =[numero];
var fecha = año+"/"+mes+"/"+dia;
for (var i = 0; i < numero; i++) {
    
     data[i] = {"fecha": fecha, "dato": db[i]}
 
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


};







