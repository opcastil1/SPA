class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

require 'socket'
require 'json'



 Thread.new do


 loop do

 s = TCPSocket.open('localhost', 9000)
 s.setsockopt(Socket::SOL_SOCKET, Socket::SO_KEEPALIVE, true)
 sleep(1000)
 request = { 'num' => 0 , 'valor' => 'realtime' }.to_json
 s.print(request)
 line = s.gets()
 olo = JSON.parse(line)
 año = olo['ano'].to_i
 mes = olo['mes'].to_i
 dia = olo['dia'].to_i
 hora = olo['hora'].to_i
 es = olo['es'].to_i
 ee = olo['ee'].to_i
 error = olo['error'].to_i
 Valore.create(año: año,mes: mes,dia: dia,hora:hora, es:es, ee:ee, error:error)
 task = [año,mes,dia,hora,es,ee,error]
 s.close()


 
 end


end
 
 

Socket::getaddrinfo(Socket.gethostname,"echo",Socket::AF_INET)[0][3]


end
