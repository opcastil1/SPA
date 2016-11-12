require File.expand_path('../boot', __FILE__)

require 'rails/all'

require 'date'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RubyGettingStarted
  class Application < Rails::Application

config.assets.enabled = true  
config.assets.paths << "#{Rails.root}/app/assets/fonts"  

	Thread.new do

 loop do
 
 time = Time.new
 s = TCPSocket.open('localhost', 8000)
 s.setsockopt(Socket::SOL_SOCKET, Socket::SO_KEEPALIVE, true)
 sleep(900)
 request = { 'num' => 0 , 'valor' => 'realtime' }.to_json
 s.print(request)
 line = s.gets()
 olo = JSON.parse(line)
 año = time.year
 mes = time.month
 dia = time.day
 hora = time.hour 
 minuto = time.min
 energiaacum = olo['es'].to_i
 fp = olo['fp'].to_d*100
 pi = olo['pi'].to_i
 pm = olo['pm'].to_i
 pmx = olo['pmx'].to_i
 v1 = olo['v1'].to_i
 v2 = olo['v2'].to_i
 v3 = olo['v3'].to_i
 error = olo['error'].to_i
 Medidor.create(año: año,mes: mes,dia: dia,hora:hora, minuto:minuto, energiaacum:energiaacum, fp:fp, pi:pi, pm:pm, pmx:pmx, v1:v1, v2:v2, v3:v3, error:error)
 task = [año,mes,dia,hora,energiaacum,fp,pi,pm,pmx,v1,v2,v3,error]
 puts "medidor"
 s.close()
 s = TCPSocket.open('localhost', 9000)
 s.setsockopt(Socket::SOL_SOCKET, Socket::SO_KEEPALIVE, true)
 sleep(2)
 request = { 'num' => 0 , 'valor' => 'realtime' }.to_json
 s.print(request)
 line = s.gets()
 olo = JSON.parse(line)
 año = time.year
 mes = time.month
 dia = time.day 
 hora = time.hour 
 minuto = time.min
 puts olo
 #IMPORTANTE¡¡ recordar pasar los Mwh del inversor a kwh
 energiaacum = olo['es'].to_i/1000
 puts energiaacum
 pi = olo['pi'].to_i/1000
 puts pi
 pm = olo['pm'].to_i
 pmx = olo['pmx'].to_i/1000
 error = olo['error'].to_i
 Inversor.create(año: año,mes: mes,dia: dia,hora:hora, minuto:minuto, energiaacum:energiaacum, pi:pi, pm:pm, pmx:pmx, error:error)
 task = [año,mes,dia,hora,energiaacum,pi,pm,pmx,error]
 puts "inversor"
 s.close()
 sleep(2)
 file = File.read('configuracion.json')
 data_hash = JSON.parse(file)
 tarifa = data_hash['general']['tarifa']
 sic = data_hash['general']['sic']
 datoschange=Medidor.last(2)
 año = time.year
 mes = time.month
 dia = time.day
 hora = time.hour 
 minuto = time.min
 energiamedidor1 =datoschange[1].read_attribute("energiaacum")
 energiamedidor2 =datoschange[0].read_attribute("energiaacum")
 puts energiamedidor1
 puts energiamedidor2
 energiamedidor = (energiamedidor1 - energiamedidor2).abs
 puts energiamedidor
 datoschange2=Inversor.last(2)
 energiainversor1 =datoschange2[1].read_attribute("energiaacum")
 energiainversor2 =datoschange2[0].read_attribute("energiaacum")
 energiainversor = (energiainversor1-energiainversor2).abs
 puts"guarda energia inversor"
 
 if energiainversor > 100
 	energiainversor = 0
puts "valor energia inversor muy grande" 	
 else	
 end
 
 Valore.create(año: año,mes: mes,dia: dia,hora:hora, minuto:minuto, es:energiainversor,ee:energiamedidor, tarifa:tarifa, co2:sic)
 puts "datospagina"
 puts "datos producción energia solar"


 sic = (sic.to_d)/1000
 #datos guardados plataforma
 page = Estatico.first
 #a = energia generada año inversor
 page.a=page.a+energiainversor
 puts page.a
 #c = ahorro dinero
 page.c = page.c + (energiainversor*tarifa.to_i)
 puts page.c
 #d = ahorro co2 
 page.d = page.d + (energiainversor*sic)
 puts page.d
 #e = arboles plantados 
 puts "arboles plantados"
 page.e = page.e + (energiainversor*sic/0.02177)

 puts page.e

 #b = energia generada dia inversorS
 if page.dia === dia
 page.b=page.b+energiainversor
 puts page.b
#h = energia consumida dia edificio 
 page.h=page.h+energiainversor+energiamedidor
 puts page.h
 else
  page.b = 0
  puts page.b
  page.h = 0
  page.dia = dia
  puts page.h

 end

puts "datos consumo energia edificio"

#f = energia consumida año edificio
page.f=page.f+energiainversor+energiamedidor
puts page.f


#i = energia consumida mes edificio
 if page.mes === mes
 page.i=page.i+energiainversor+energiamedidor
 puts page.i
 else
 	puts "cambio de mes"
  page.n = page.i
  page.i = 0
  page.mes = mes
  puts page.i

 end

 puts "tabla de gasto ee"

 #j = gasto dinero
 page.j = page.j + (energiamedidor*tarifa.to_i)
 puts page.j
 #k = emision co2 
 page.k = page.d + (energiamedidor*sic)
 puts page.k
 #l = arboles talado 
 page.l = page.l + (energiamedidor*sic/0.02177)	
 puts page.l


page.año = año
page.hora = hora
page.minuto = minuto


puts "inyecta a la red"

if energiamedidor < energiainversor

inyeccion = (energiainversor - energiamedidor)

page.m = page.m + inyeccion

else

	page.m = page.m

end

puts page.m
 

 page.save
 

 	
 end


end




  end
end
