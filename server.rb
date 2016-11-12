
require 'socket'
require 'date'
require 'json'
require 'sqlite3'



 db = SQLite3::Database.open "/home/kali/Dropbox/DAOM/PlataformaMonitoreoDAOM/db/development.sqlite3"
 db.busy_timeout=3000
db.busy_handler{

  	puts "hola mundo"

}
while true


 time = Time.new
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
 energiasol = olo['es']
 aguasalidat = olo['t1']
 aguaentradat = olo['t2']
 caudal = olo['q']
 tcaldera = olo['tc']
 caudalentrada = olo['qe']
 db.execute ("insert into valores (año,mes,dia,hora,minuto,a,b,c,d,e,f) values (#{año},#{mes},#{dia},#{hora},#{minuto},#{energiasol},#{aguasalidat},#{aguaentradat},#{caudal},#{tcaldera},#{caudalentrada})")
 puts line
 puts "asdsa"
 s.close()

end