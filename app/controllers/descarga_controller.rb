class DescargaController < WebsocketRails::BaseController

require 'socket'
require 'json'


def descargadatos () 
       

        puts "working hard"
        tipo = message[3]
        periodo = message[4]
        año = message[0]
        mes = message[1]
        dia = message[2]
        db = basededatostodos(periodo,año,mes,dia)
        send_message :descargadatos, db, :namespace => :graficos

end




def basededatos(tipo,periodo,año,mes,dia)


         i = 0
         final = Array.new 

         if periodo == 'dia'
    

            datos = Valore.where(:año => año, :mes => mes, :dia => dia)

            datos.each do |datos|
                
                
                final[i] = datos.read_attribute("#{tipo}")
                puts final[i]
                i = i +1
                

            end
            
            return final
            
         elsif periodo == 'mes'
            
            datos = Valore.where(:año => año, :mes => mes)

            datos.each do |datos|
                
                final[i] = datos.read_attribute("#{tipo}")
                puts final[i]
                i = i +1
              


            end
            
            return final
                    
        
         end



        
        
end





def basededatostodos(periodo,año,mes,dia)


         i = 0
         final = Array.new 
         final1 = Array.new 
         final2 = Array.new
         final3 = Array.new  

         if periodo == 'dia'
    

            datos = Valore.where(:año => año, :mes => mes, :dia => dia)

            datos.each do |datos|
                
                final[i] = datos.read_attribute("error")
                final1[i] = datos.read_attribute("es")
                final2[i] = datos.read_attribute("ee")
                final3[i] = datos.read_attribute("created_at")

                i = i +1
                

            end
            
            return final,final1,final2,final3
            
         elsif periodo == 'mes'
            
            datos = Valore.where(:año => año, :mes => mes)

            datos.each do |datos|
                
                final[i] = datos.read_attribute("error")
                final1[i] = datos.read_attribute("es")
                final2[i] = datos.read_attribute("ee")
                final3[i] = datos.read_attribute("created_at")
                i = i +1
              


            end
            
            return final,final1,final2,final3
                    
        
         end



        
        
end

end





