conexion = '192.168.0.11:3000/websocket';

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
descargardatos3 =[];s
descargardatos22 = [];
descargardatos33 = [];
function inicio2 (){


var a = new Array(); 

 for (i = 0; i < cantidaddatos; i++) {
           
            var num = i;
            var n = num.toString();
            a[i] = "";
             
          }
console.log(a);
lineaDataReal["labels"] = a;  


var b = new Array(); 

 for (i = 0; i < cantidaddatos; i++) {
           
 
            b[i] = 0;
             
          }
console.log(b);
lineaDataReal["datasets"][0].data = b ; 


var reales = document.getElementById('real').getContext('2d');
graficoreal = new Chart(reales).Line(lineaDataReal,lineOptionReal);

real(0);



};



function inicio (){


var a = new Array(); 

 for (i = 0; i < cantidaddatos; i++) {
           
            var num = i;
            var n = num.toString();
            a[i] = "";
             
          }

lineaDataReal["labels"] = a;  


var b = new Array(); 

 for (i = 0; i < cantidaddatos; i++) {
           
 
            b[i] = 0;
             
          }

lineaDataReal["datasets"][0].data = b ; 
lineaDataReal["datasets"][1].data = b ; 


var linea = document.getElementById('linea').getContext('2d');
graficolinea = new Chart(linea).Line(lineaData,lineOption);
var reales = document.getElementById('real').getContext('2d');
graficoreal = new Chart(reales).Line(lineaDataReal,lineOptionReal);
real();




};

function lineadata (data){

if (data ===0){

document.getElementById('dato').innerHTML='Energia consumida edificio';

return dato = 'ee'


}else if(data ===1){

document.getElementById('dato').innerHTML='Energia generada planta fotovoltáica';

return  dato = 'es'



}else if(data ===2){

document.getElementById('dato').innerHTML='Errores';

return dato = 'error'


}



};


function linea (tiempo) {


graficolinea.destroy();
time = document.getElementById('time').value;
date = time.split("-");
año = date[0];
mes = date[1];
dia = date[2];
var linea = document.getElementById('linea').getContext('2d');
message = [dato,tiempo,date[0],date[1],date[2]];
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.linea',message);
dispatcher.bind('graficos.data', function(task) {

descargardatos=task;


lineaData["datasets"][0].data = task ;

if (tiempo === 0) {
	
	lineaData["labels"] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
   

}else if (tiempo === 1){

	lineaData["labels"] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    
}

graficolinea = new Chart(linea).Line(lineaData,lineOption);




});
     


};


//TiempoReal


function real (dato) {


real1= setTimeout(function () {

        var dispatcher = new WebSocketRails(conexion);
        message = dato;
		dispatcher.trigger('graficos.real',message);
		dispatcher.bind('graficos.datareal', function(task) {
        var nuevo = cantidaddatos-1;
        for (i = 0; i < nuevo; i++) {
           
            var a = 1 + i;

            graficoreal.datasets[0].points[i].value = graficoreal.datasets[0].points[a].value ;
            

          };
      
        graficoreal.datasets[0].points[nuevo].value = task[dato];
       
        datarealvoltaje = task[0];
        datarealamperaje = task[1];

		graficoreal.update();	

});     dispatcher.close;
        real(dato);
    }, 1000);


};

function iniciarguardar(){



document.getElementById("iniciarreal").disabled = true;
document.getElementById("dato").disabled = true;
document.getElementById("link").disabled = true;

 time = setTimeout(function () {
       
       var h = 0;
       h =  descargardatos2.length ;
       descargardatos2[h] = datarealvoltaje;
       descargardatos3[h] = datarealamperaje;
       var x=document.getElementById("notificacion");
       var time = h;
       var minutes = Math.floor(time / 60);
       var seconds = time - minutes * 60;
       var hours = Math.floor(time / 3600);
       time = time - hours * 3600;
       function str_pad_left(string,pad,length) {
      return (new Array(length+1).join(pad)+string).slice(-length);
       }
      var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
       x.innerHTML = finalTime;
       iniciarguardar();
  


    }, 1000);



};

function detenerguardar(){
    
    document.getElementById("iniciarreal").disabled = false;
    document.getElementById("dato").disabled = false;
    clearTimeout(time);
    console.log(descargardatos2);
    descargardatos22 = descargardatos2;
    descargardatos33 = descargardatos3;
    descargardatos2 = [];
    descargardatos3 = [];
     

      

};

function realdata (data){

var nuevo = cantidaddatos-1;
        for (i = 0; i < nuevo; i++) {
           
            var a = 1 + i;
            graficoreal.datasets[0].points[i].value = 0 ;
             
          };

if (data ===0){

document.getElementById('dato').innerHTML='Voltaje Tiempo Real';
clearTimeout(real1);
datoreal="Voltaje";
real(0);

}else if(data ===1){

document.getElementById('dato').innerHTML='Corriente Tiempo Real';
clearTimeout(real1);
datoreal="Corriente";
real(1);

}

};
