

function configuracion(){
datodes='ee';
tipodes='mes';	
tiempo=10000;
titulo1=0;
titulo2=0;
time1=0;
dato1=0;
tipo1=0;
time2=0;
dato2=0;
tipo2=0;
time3=0;
dato3=0;
tipo3=0;
message=0;
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.configuracion',message);
dispatcher.bind('graficos.configuracion', function(task) {

titulo1=task[0];
tipo1=task[1];
año1=task[2];
mes1=task[3];
dia1=task[4];
titulo2=task[5];
tipo2=task[6];
año2=task[7];
mes2=task[8];
dia2=task[9];
titulo3=task[10];
tipo3=task[11];
año3=task[12];
mes3=task[13];
dia3=task[14];
tiempo=task[15];
sic=task[16];
tarifa=task[17];

valores1 = "Gráfico de "+titulo1 + " durante el " + tipo1 + " del " + año1+"-"+mes1+"-"+dia1 +" en vista 1"; 
document.getElementById('vistauno').innerHTML=valores1;
valores2 = "Gráfico de "+titulo2 + " durante el " + tipo2 + " del " + año2+"-"+mes2+"-"+dia2 +" en vista 2"; 
document.getElementById('vistados').innerHTML=valores2;
valores3 = "Gráfico de "+titulo3 + " durante el " + tipo3 + " del " + año3+"-"+mes3+"-"+dia3 +" en vista 3"; 
document.getElementById('vistatres').innerHTML=valores3;

//set prev config
document.getElementById('seg').value=tiempo;
document.getElementById('sic').value=sic;
document.getElementById('tarifa').value=tarifa;



});

};


//configuracion vista uno

function guardaruno(){

time1 = document.getElementById('time1').value;
date = time1.split("-");
año1 = date[0];
mes1= date[1];
dia1 = date[2];

message=[año1,mes1,dia1,dato1,tipo1,titulo1]

var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardaruno',message);
dispatcher.bind('graficos.guardaruno', function(task) {
console.log(task);

});



configuracion();


};


function datouno (data){

if (data ===0){
document.getElementById('dato1').innerHTML='Energia consumida edificio';
return dato1 = 'ee',titulo1='Energia consumida edificio'
}else if(data ===1){
document.getElementById('dato1').innerHTML='Energia generada planta fotovoltáica';
return  dato1 = 'es',titulo1='Energia generada planta fotovoltáica'
}else if(data ===2){
document.getElementById('dato1').innerHTML='Errores';
return dato1 = 'error',titulo1='Errores'
}

};

function tipouno (data){

if (data ===0){

return tipo1 = 'dia'
}else if(data ===1){

return  tipo1 = 'mes'
}else if(data ===2){

return tipo1 = 'año'
}

};

//configuracion vista dos

function guardardos(){

time2 = document.getElementById('time2').value;
date = time2.split("-");
año2 = date[0];
mes2= date[1];
dia2 = date[2];

message=[año2,mes2,dia2,dato2,tipo2,titulo2]

var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardardos',message);
dispatcher.bind('graficos.guardardos', function(task) {
console.log(task);

});



configuracion();


};


function datodos (data){

if (data ===0){
document.getElementById('dato2').innerHTML='Energia consumida edificio';
return dato2 = 'ee',titulo2='Energia consumida edificio'
}else if(data ===1){
document.getElementById('dato2').innerHTML='Energia generada planta fotovoltáica';
return  dato2 = 'es',titulo2='Energia generada planta fotovoltáica'
}else if(data ===2){
document.getElementById('dato2').innerHTML='Errores';
return dato2 = 'error',titulo2='Errores'
}

};

function tipodos (data){

if (data ===0){

return tipo2 = 'dia'
}else if(data ===1){

return  tipo2 = 'mes'
}else if(data ===2){

return tipo2 = 'año'
}

};

//configuracion vista 3

function guardartres(){

time3 = document.getElementById('time3').value;
date = time3.split("-");
año3 = date[0];
mes3= date[1];
dia3 = date[2];

message=[año3,mes3,dia3,dato3,tipo3,titulo3]

var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardartres',message);
dispatcher.bind('graficos.guardartres', function(task) {
console.log(task);

});



configuracion();


};


function datotres (data){

if (data ===0){
document.getElementById('dato3').innerHTML='Energia consumida edificio';
return dato3 = 'ee',titulo3='Energia consumida edificio'
}else if(data ===1){
document.getElementById('dato3').innerHTML='Energia generada planta fotovoltáica';
return  dato3 = 'es',titulo3='Energia generada planta fotovoltáica'
}else if(data ===2){
document.getElementById('dato3').innerHTML='Errores';
return dato3 = 'error',titulo3='Errores'
}

};

function tipotres (data){

if (data ===0){

return tipo3 = 'dia'
}else if(data ===1){

return  tipo3 = 'mes'
}else if(data ===2){

return tipo3 = 'año'
}

};

//variables de configuracion

function guardartiempo(){


seg=document.getElementById('seg').value;

if (isNumeric(seg)){

message=[seg]

var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardartiempo',message);
dispatcher.bind('graficos.guardartiempo', function(task) {
console.log(task);
});

}else{

alert("Valores numéricos, decimales con coma");
};



configuracion();


};

function guardarsic(){




sic=document.getElementById('sic').value;

if (isNumeric(sic)){

message=sic
console.log(message);

var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardarsic',message);
dispatcher.bind('graficos.guardarsic', function(task) {
console.log(task);
});

}else{

alert("Valores numéricos, decimales con coma");

};



configuracion();


};

function isNumeric(n) { 
	return !isNaN(parseFloat(n)) && isFinite(n); 
};


function guardartarifa(){


tarifa=document.getElementById('tarifa').value;


if (isNumeric(tarifa))
{
message=tarifa
console.log(message);
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardartarifa',message);
dispatcher.bind('graficos.guardartarifa', function(task) {
console.log(task);
});



}else{


alert("Valores numéricos, decimales con coma");

};
 


configuracion();


};


//descarga de dato

function descargadatoscsv(){


timedescarga = document.getElementById('timedescarga').value;
date = timedescarga.split("-");
añodes = date[0];
mesdes= date[1];
diades = date[2];
message=[añodes,mesdes,diades,datodes,tipodes]
console.log(message);
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.descargadatos',message);
dispatcher.bind('graficos.descargadatos', function(task) {

db=task;
var length= task[0].length;
console.log(length);
descargadatos1(length,datodes,añodes,mesdes,diades);


});
	};

function datodescarga (data){

if (data ===0){
document.getElementById('datodes').innerHTML='Energia consumida edificio';
return datodes = 'ee'
}else if(data ===1){
document.getElementById('datodes').innerHTML='Energia generada planta fotovoltáica';
return  datodes = 'es'
}else if(data ===2){
document.getElementById('datodes').innerHTML='Errores';
return datodes = 'error'
}

};

function tipodescarga (data){

if (data ===0){

return tipodes = 'dia'
}else if(data ===1){

return  tipodes = 'mes'
}else if(data ===2){

return tipodes = 'año'
}

};

// some data to export
function descargadatos1(length,dato,año,mes,dia){


console.log(db[0]);
console.log(length +""+ dato +""+ año +""+ mes +"" + dia);
var numero = length;
var data =[numero];
var fecha = año+"/"+mes+"/"+dia;
for (var i = 0; i < numero; i++) {
    
     data[i] = {"fecha": db[3][i],"dato": db[0][i], "dato1": db[1][i], "dato2": db[2][i]}
   
}



// prepare CSV data
var csvData = new Array();
csvData.push('"' + "Fecha" + '","' + " " + '"');

data.forEach(function(item, index, array) {
  csvData.push('"' + item.fecha + '","'+ item.dato + '","' + item.dato1 + '","' + item.dato2 + '"');
});



// download stuff
var fileName = "data.csv";
var buffer = csvData.join("\n");
var blob = new Blob([buffer], {
  "type": "text/csv;charset=utf8;"          
});



link = document.getElementById('descargardatos');
link.setAttribute("href", window.URL.createObjectURL(blob));
link.setAttribute("download", fileName);
console.log(link);


};







