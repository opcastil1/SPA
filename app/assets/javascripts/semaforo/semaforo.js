function semaforo(){

resultado=1;
luzr = document.getElementById("rojo");
luzr.style.height = '0px';
luza = document.getElementById("amarillo");
luza.style.height = '0px';
luzv = document.getElementById("verde");
luzv.style.height = '0px';

var message;
var dispatcher = new WebSocketRails(conexion);

dispatcher.trigger('graficos.semaforo',message);

dispatcher.bind('graficos.semaforo', function(task) {



console.log(resultado);

if (task==0){

document.getElementById("textos").innerHTML="El consumo disminuyó respecto al mes del año pasado";

setInterval(function(){ 

setTimeout(function(){ luzv.style.height = '43px'; }, 500);
setTimeout(function(){ luzv.style.height = '0px'; }, 1000);

}, 1500);


}else if (task ==1){

document.getElementById("textos").innerHTML="El consumo es igual al mes del año pasado";

setInterval(function(){ 

setTimeout(function(){ luza.style.height = '43px'; }, 500);
setTimeout(function(){ luza.style.height = '0px'; }, 1000);

}, 1500);

}else if(task==2){

document.getElementById("textos").innerHTML="El consumo aumentó respecto al mes del año pasado";

setInterval(function(){ 

setTimeout(function(){ luzr.style.height = '43px'; }, 500);
setTimeout(function(){ luzr.style.height = '0px'; }, 1000);

}, 1500);

};















});     



};




