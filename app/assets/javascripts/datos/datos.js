kwh = 'kWh'
kw = 'kW'
mwh = 'MWh'


function actualizardatos1(){

var message;
var dispatcher = new WebSocketRails(conexion);

dispatcher.trigger('graficos.datos1',message);


dispatcher.bind('graficos.data11', function(task) {


//generacion solar
document.getElementById('generaciónactualsolar').innerHTML=task[0]+" "+kw;
document.getElementById('energiageneradahoysolar').innerHTML=task[1]+" "+kwh;
document.getElementById('energiageneradaesteañosolar').innerHTML=task[2]+" "+mwh;
document.getElementById('energiainyectadasolar').innerHTML=task[3]+" "+kwh;
//consumo edificio
document.getElementById('energiaconsumidactualee').innerHTML=task[4]+" "+kw;
document.getElementById('energiaconsumidahoyee').innerHTML=task[5]+" "+kwh;
document.getElementById('energiaconsumidaesteañoee').innerHTML=task[6]+" "+mwh;
document.getElementById('energiatotalconsumidaee').innerHTML=task[7]+" "+mwh;


var dinero = task[8];
var co2 = task[9];
var ar = task[10];

//tabla ahorros

if (dinero > 999999) {

	dinero = (dinero/1000000).toFixed(1);
	document.getElementById('ahorrosolar').innerHTML="$ "+dinero+" M";
}
else{

document.getElementById('ahorrosolar').innerHTML="$ "+dinero;

};

if (co2 > 999999) {

	co2 = (co2/1000000).toFixed(1);
	document.getElementById('co2solar').innerHTML=co2+" TM";
}
else{

document.getElementById('co2solar').innerHTML=co2+" Ton";

};

if (ar > 999999) {

	ar = (ar/1000000).toFixed(1);
	document.getElementById('arbolsolar').innerHTML=ar+" UM";
}
else{

document.getElementById('arbolsolar').innerHTML=ar+" Und";

};



});

};
     
function actualizardatos2(){

var message;
var dispatcher = new WebSocketRails(conexion);

dispatcher.trigger('graficos.datos2',message);


dispatcher.bind('graficos.data22', function(task) {


//generacion solar
document.getElementById('generaciónactualsolar').innerHTML=task[0]+" "+kw;
document.getElementById('energiageneradahoysolar').innerHTML=task[1]+" "+kwh;
document.getElementById('energiageneradaesteañosolar').innerHTML=task[2]+" "+mwh;
document.getElementById('energiainyectadasolar').innerHTML=task[3]+" "+kwh;
//tabla ahorros
var dinero = task[4];
var co2 = task[5];
var ar = task[6];

//tabla ahorros

if (dinero > 999999) {

	dinero = (dinero/1000000).toFixed(1);
	document.getElementById('ahorrosolar').innerHTML="$ "+dinero+" M";
}
else{

document.getElementById('ahorrosolar').innerHTML="$ "+dinero;

};

if (co2 > 999999) {

	co2 = (co2/1000000).toFixed(1);
	document.getElementById('co2solar').innerHTML=co2+" TM";
}
else{

document.getElementById('co2solar').innerHTML=co2+" Ton";

};

if (ar > 999999) {

	ar = (ar/1000000).toFixed(1);
	document.getElementById('arbolsolar').innerHTML=ar+" UM";
}
else{

document.getElementById('arbolsolar').innerHTML=ar+" Und";

};

});     





 
};
function actualizardatos3(){

var message;

var dispatcher = new WebSocketRails(conexion);

dispatcher.trigger('graficos.datos3',message);


dispatcher.bind('graficos.data33', function(task) {

console.log(task);

//consumo edificio
document.getElementById('energiaconsumidactualee').innerHTML=task[0]+" "+kw;
document.getElementById('energiaconsumidahoyee').innerHTML=task[1]+" "+kwh;
document.getElementById('energiaconsumidaesteañoee').innerHTML=task[2]+" "+mwh;
document.getElementById('energiatotalconsumidaee').innerHTML=task[3]+" "+mwh;
var dinero = task[4];
var co2 = task[5];
var ar = task[6];

//tabla ahorros

if (dinero > 999999) {

	dinero = (dinero/1000000).toFixed(1);
	document.getElementById('gastoee').innerHTML="$ "+dinero+" M";
}
else{

document.getElementById('gastoee').innerHTML="$ "+dinero;

};

if (co2 > 999999) {

	co2 = (co2/1000000).toFixed(1);
	document.getElementById('co2ee').innerHTML=co2+" TM";
}
else{

document.getElementById('co2ee').innerHTML=co2+" Ton";

};

if (ar > 999999) {

	ar = (ar/1000000).toFixed(1);
	document.getElementById('arbolee').innerHTML=ar+" UM";
}
else{

document.getElementById('arbolee').innerHTML=ar+" Und";

};
});     





 
};
