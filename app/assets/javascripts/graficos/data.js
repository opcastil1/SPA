//hacer desplegable para cambiar ocnfiguracion

conexion = '100.1.145.3:3000/websocket';

//DataLinea

datoreal='Voltaje';
dato = 'ee' ;
año = 0;
mes = 0;
dia = 0;
descargardatos =[]; 
cantidaddatos = 80;
datareal =0;
descargardatos2 =[];
descargardatos3 =[];
descargardatos22 = [];
descargardatos33 = [];
tiempovista=350000;


function vistas(tiempovistas){

setTimeout(function(){ 

asd=window.location.pathname;
asd1=asd.split("/");
if (asd1[1]==="1"){
url = "http://100.1.145.3:3000/2";
window.location.href = url;
}else if(asd1[1]==="2"){
url = "http://100.1.145.3:3000/3";
window.location.href = url; 
}else if(asd1[1]==="3"){
url = "http://100.1.145.3:3000/1";
window.location.href = url;
}


 }, tiempovistas);





}

function inicio (){

message='';
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.tiempovista',message);
dispatcher.bind('graficos.tiempovista', function(task) {

 tiempovistas=task*1000;
 vistas(tiempovistas);


});
var linea = document.getElementById('linea').getContext('2d');
graficolinea = new Chart(linea).Line(lineaData,lineOption);


};


function grafico1() {

graficolinea.destroy();
message='';
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.vista1',message);
dispatcher.bind('graficos.vista1', function(task) {

lineaData["datasets"][0].data = task[0] ;

//x axis

if (task[1]=="dia"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]; 
}else if(task[1]=="mes"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]; 
}else if(task[1]=="año"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12"]; 
};


var linea = document.getElementById('linea').getContext('2d');
graficolinea = new Chart(linea).Line(lineaData,lineOption);


});

dispatcher.bind('graficos.titulo1', function(task) {





titulo = task[0]+" "+task[1];
//para colocar el titulo añomesdia
//+" "+task[2]+"-"+task[3]+"-"+task[4]

document.getElementById('titulografico1').innerHTML=titulo;
document.getElementById('tiempoti').innerHTML=task[1];


});
     


};


function grafico2() {

graficolinea.destroy();
message='';
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.vista2',message);
dispatcher.bind('graficos.vista2', function(task) {

descargardatos=task;
lineaData["datasets"][0].data = task[0] ;


//x axis

if (task[1]=="dia"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]; 
}else if(task[1]=="mes"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]; 
}else if(task[1]=="año"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12"]; 
};


var linea = document.getElementById('linea').getContext('2d');
graficolinea = new Chart(linea).Line(lineaData,lineOption);


});

dispatcher.bind('graficos.titulo2', function(task) {
titulo = task[0]+" "+task[1];
//para colocar el titulo añomesdia
//+" "+task[2]+"-"+task[3]+"-"+task[4]

document.getElementById('titulografico2').innerHTML=titulo;


});
     


};

function grafico3() {

graficolinea.destroy();
message='';
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.vista3',message);
dispatcher.bind('graficos.vista3', function(task) {

descargardatos=task;

lineaData["datasets"][0].data = task[0] ;


if (task[1]=="dia"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]; 
}else if(task[1]=="mes"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]; 
}else if(task[1]=="año"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12"]; 
};


var linea = document.getElementById('linea').getContext('2d');
graficolinea = new Chart(linea).Line(lineaData,lineOption);


});

dispatcher.bind('graficos.titulo3', function(task) {
titulo = task[0]+" "+task[1]
//para colocar el titulo añomesdia
//+" "+task[2]+"-"+task[3]+"-"+task[4]

;
document.getElementById('titulografico3').innerHTML=titulo;


});
     


};