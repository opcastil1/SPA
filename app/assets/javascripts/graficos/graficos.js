//= require graficos/configurar

//Grafico de prueba.

function line(){

var linea = document.getElementById('linea').getContext('2d');
graficolinea = new Chart(linea).Line(lineaData,lineOption);
};
