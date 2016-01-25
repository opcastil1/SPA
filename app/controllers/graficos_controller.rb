class GraficosController < WebsocketRails::BaseController

require 'socket'
require 'json'


#Metodos que envian información a los gráficos

def lineadata () 

        db = basededatos(message[0],message[1],message[2],message[3],message[4])
        send_message :data, db, :namespace => :graficos
        puts 'basededatos'

end


#Metodos que piden información a la base de datos.


#Periodo: 0 = Dia, 1 = Mes, 2 = Año


def basededatos(tipo,periodo,año,mes,dia)


         i = 0
         final = Array.new 

         if periodo == 0
    

            datos = Valore.where(:año => año, :mes => mes, :dia => dia)

            datos.each do |datos|
                
                
                final[i] = datos.read_attribute("#{tipo}")
                puts final[i]
                i = i +1
                

            end
            
            return final
            
         elsif periodo == 1
            
            datos = Valore.where(:año => año, :mes => mes)

            datos.each do |datos|
                
                final[i] = datos.read_attribute("#{tipo}")
                puts final[i]
                i = i +1
              


            end
            
            return final
                    
        
         end



        
        
end









#Pide información en tiempo real

#Tipo: 0 = COL1, 1 = COL2 .................

def realdata ()

 s = TCPSocket.open('localhost', 9000)
 s.setsockopt(Socket::SOL_SOCKET, Socket::SO_KEEPALIVE, true)
 request = { 'num' => 0 , 'valor' => 'realtime' }.to_json
 s.print(request)
 line = s.gets()
 olo = JSON.parse(line)
 v = olo['es'].to_f.round(1)
 a = (olo['ee']).to_f.round(2)
 task = [v,a]
 s.close()
 send_message :datareal, task, :namespace => :graficos




        
        
end

end





