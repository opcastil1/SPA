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
 
 Estatico.create(año: año,mes: mes,dia: dia,hora:hora, minuto:minuto, a:0,b:0,c:0,d:0,e:0,f:0,h:0,i:0,j:0,k:0)

 time = Time.new
 s = TCPSocket.open('localhost', 8000)
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
 energiaacum = olo['es'].to_i
 fp = olo['fp'].to_i
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
 #IMPORTANTE¡¡ recordar pasar los Mwh del medidor a kwh
 energiaacum = olo['es'].to_i
 puts energiaacum
 pi = olo['pi'].to_i
 puts pi
 pm = olo['pm'].to_i
 pmx = olo['pmx'].to_i
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
 Valore.create(año: año,mes: mes,dia: dia,hora:hora, minuto:minuto, es:energiainversor,ee:energiamedidor, tarifa:tarifa, co2:sic)
 puts "datospagina"
 	
 end


end




  end
end
