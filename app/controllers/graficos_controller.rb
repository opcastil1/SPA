class GraficosController < WebsocketRails::BaseController

require 'socket'
require 'json'
require 'date'

#Metodo que leer el archivo configuración donde se guarda la fecha que se va a mostrar en el gráfico y envia la solicitudad al script DB.

def vista1 () 
       
        mandar = Array.new
        file = File.read('configuracion.json')
        data_hash = JSON.parse(file)
        titulo = data_hash['vista1']['titulo']
        tipo = data_hash['vista1']['dato']
        periodo = data_hash['vista1']['tipo']
        año = Date.today.strftime("%Y")
        mes = Date.today.strftime("%m")
        dia = Date.today.strftime("%d")
        db = basededatos(tipo,periodo,año,mes,dia)
        todo = [db,periodo]
        send_message :vista1,todo,:namespace => :graficos
        titulo=[titulo,periodo,año,mes,dia]
        send_message :titulo1, titulo, :namespace => :graficos
      

end

def vista2 () 
       
        mandar = Array.new
        file = File.read('configuracion.json')
        data_hash = JSON.parse(file)
        titulo = data_hash['vista2']['titulo']
        tipo = data_hash['vista2']['dato']
        periodo = data_hash['vista2']['tipo']
        año = Date.today.strftime("%Y")
        mes = Date.today.strftime("%m")
        dia = Date.today.strftime("%d")
        db = basededatos(tipo,periodo,año,mes,dia)
        todo = [db,periodo]
        send_message :vista2, todo, :namespace => :graficos
        titulo=[titulo,periodo,año,mes,dia]
        send_message :titulo2, titulo, :namespace => :graficos
      

end

def vista3 () 
       
        mandar = Array.new
        file = File.read('configuracion.json')
        data_hash = JSON.parse(file)
        titulo = data_hash['vista3']['titulo']
        tipo = data_hash['vista3']['dato']
        periodo = data_hash['vista3']['tipo']
        año = Date.today.strftime("%Y")
        mes = Date.today.strftime("%m")
        dia = Date.today.strftime("%d")
        db = basededatos(tipo,periodo,año,mes,dia)
        todo = [db,periodo]
        send_message :vista3, todo, :namespace => :graficos
        titulo=[titulo,periodo,año,mes,dia]
        send_message :titulo3, titulo, :namespace => :graficos
      

end



#Metodos que piden información a la base de datos.


#Periodo: 0 = Dia, 1 = Mes, 2 = Año


def basededatos(tipo,periodo,año,mes,dia)


         i = 0
         ii=0
         num=0
         final = Array.new
         horas = Array.new 
 
         if periodo == 'dia'
    

            while ii < 25  do             
            i = 0
            final = Array.new(23,0)     
            datos = Valore.where(:año => año, :mes => mes, :dia => dia, :hora => ii)
            
       
             datos.each do |datos|
                
                
                final[i] = datos.read_attribute("#{tipo}").abs
                i = i +1
        
                       end

            
            energiadia= final.inject(0){|sum,x| sum + x } 
            horas[ii]=energiadia
            ii +=1


             end

            return horas
            
         elsif periodo == 'mes'
            
                while ii < 32  do          
            
            
            i = 0
            final = Array.new(31,0)     
            datos = Valore.where(:año => año, :mes => mes, :dia => ii)
            
       
             datos.each do |datos|
                
                
                final[i] = datos.read_attribute("#{tipo}").abs
                i = i +1
          

                  end

            
            energiadia= final.inject(0){|sum,x| sum + x } 
            horas[ii]=energiadia
            ii +=1


                end

            return horas

          elsif periodo == 'año'
            
                while ii < 13  do          
            
            
            i = 0
            final = Array.new(13,0)     
            datos = Valore.where(:año => año, :mes => ii)
            
       
             datos.each do |datos|
                
                
                final[i] = datos.read_attribute("#{tipo}").abs
                i = i +1
          

                 end

            
            energiadia= final.inject(0){|sum,x| sum + x } 
            horas[ii]=energiadia
            ii +=1


                   end

            return horas
           
           end


        
        
end


end





