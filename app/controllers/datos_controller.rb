class DatosController < WebsocketRails::BaseController

require 'socket'
require 'json'

#muestra la configuracion en la interfaz configuracion

def configuracion () 
       
        #falta hacer conexión con la DB y la logica de procesamiento de los datos (archivo de configuración)
        file = File.read('configuracion.json')
        data_hash = JSON.parse(file)
        titulo1 = data_hash['vista1']['titulo']
        tipo1 = data_hash['vista1']['tipo']
        año1 = data_hash['vista1']['año']
        mes1 = data_hash['vista1']['mes']
        dia1 = data_hash['vista1']['dia']
        titulo2 = data_hash['vista2']['titulo']
        tipo2 = data_hash['vista2']['tipo']
        año2 = data_hash['vista2']['año']
        mes2 = data_hash['vista2']['mes']
        dia2 = data_hash['vista2']['dia']
        titulo3 = data_hash['vista3']['titulo']
        tipo3 = data_hash['vista3']['tipo']
        año3 = data_hash['vista3']['año']
        mes3 = data_hash['vista3']['mes']
        dia3 = data_hash['vista3']['dia']
        tiempo = data_hash['general']['tiempo']
        sic = data_hash['general']['sic']
        tarifa = data_hash['general']['tarifa']
        datos = [titulo1,tipo1,año1,mes1,dia1,titulo2,tipo2,año2,mes2,dia2,titulo3,tipo3,año3,mes3,dia3,tiempo,sic,tarifa]
        send_message :configuracion, datos, :namespace => :graficos
        file.close
      

end

def guardaruno () 
       

file = File.read('configuracion.json')
data_hash = JSON.parse(file)
data_hash['vista1']['titulo'] = message[5]
data_hash['vista1']['tipo'] = message[4]
data_hash['vista1']['dato'] = message[3]
data_hash['vista1']['año'] = message[0]
data_hash['vista1']['mes'] = message[1]
data_hash['vista1']['dia'] = message[2]
File.open("configuracion.json","w") do |f|
f.write(data_hash.to_json)
f.close
end
file.close




        #datos = [titulo,tipo,año,mes,dia]
       # send_message :configuracion, datos, :namespace => :graficos
      

end


def guardardos () 
       

file = File.read('configuracion.json')
data_hash = JSON.parse(file)
data_hash['vista2']['titulo'] = message[5]
data_hash['vista2']['tipo'] = message[4]
data_hash['vista2']['dato'] = message[3]
data_hash['vista2']['año'] = message[0]
data_hash['vista2']['mes'] = message[1]
data_hash['vista2']['dia'] = message[2]
puts data_hash
File.open("configuracion.json","w") do |f|
f.write(data_hash.to_json)
f.close
end
file.close
 

end



def guardartres () 
       

file = File.read('configuracion.json')
data_hash = JSON.parse(file)
data_hash['vista3']['titulo'] = message[5]
data_hash['vista3']['tipo'] = message[4]
data_hash['vista3']['dato'] = message[3]
data_hash['vista3']['año'] = message[0]
data_hash['vista3']['mes'] = message[1]
data_hash['vista3']['dia'] = message[2]
puts data_hash
File.open("configuracion.json","w") do |f|
f.write(data_hash.to_json)
f.close
end
file.close
 

end




#Metodos que envian información a los labels

def datos11 () 
       
        
        #DATOS MEDIDOR
        #Potencia máxima medidor
        pm0 = Medidor.last
        pm1 = pm0.read_attribute("pi")
        puts pm1
        #Potencia inversor
        pm00 = Inversor.last
        pm11 = pm00.read_attribute("pi")
        puts pm11


        #potencia instantanea 

        pm=pm1+pm11
        #potencia edificio total
        

        estatico = Estatico.first
        a = (estatico.read_attribute("a").to_d/1000).round(2)
        b = estatico.read_attribute("b")
        c = estatico.read_attribute("c").round
        d = estatico.read_attribute("d").round
        e = estatico.read_attribute("e").round
        f = (estatico.read_attribute("f")/1000).round
        h = estatico.read_attribute("h")
        i = (estatico.read_attribute("i")/1000).round
        k = estatico.read_attribute("k")
        m = estatico.read_attribute("m")  
        datos = [pm11,b,a,m,pm,h,i,f,c,d,e]
        send_message :data11, datos, :namespace => :graficos
        


end


def datos22 () 
       
        

        #Potencia inversor
        pm00 = Inversor.last
        pm11 = pm00.read_attribute("pi")
        puts pm11
        estatico = Estatico.first
        a = (estatico.read_attribute("a").to_d/1000).round(2)
        b = estatico.read_attribute("b")
        c = estatico.read_attribute("c").round
        d = estatico.read_attribute("d").round
        e = estatico.read_attribute("e").round
        f = (estatico.read_attribute("f")/1000).round
        h = estatico.read_attribute("h")
        i = estatico.read_attribute("i")
        k = estatico.read_attribute("k")
        m = estatico.read_attribute("m")   
        datos = [pm11,b,a,m,c,d,e]
        send_message :data22, datos, :namespace => :graficos
        


end




def datos33 () 
       
        

       #DATOS MEDIDOR
        #Potencia máxima medidor
        pm0 = Medidor.last
        pm1 = pm0.read_attribute("pi")
        puts pm1
        #Potencia inversor
        pm00 = Inversor.last
        pm11 = pm00.read_attribute("pi")
        puts pm11


        #potencia instantanea 

        pm=pm1+pm11
        #potencia edificio total



        estatico = Estatico.first
         a = (estatico.read_attribute("a")/1000).round
        b = estatico.read_attribute("b")
        c = estatico.read_attribute("c").round
        d = estatico.read_attribute("d").round
        e = estatico.read_attribute("e").round
        f = (estatico.read_attribute("f")/1000).round
        h = estatico.read_attribute("h")
        i = (estatico.read_attribute("i")/1000).round
        j = estatico.read_attribute("j").round
        k = estatico.read_attribute("k").round
        l = estatico.read_attribute("l").round
        datos = [pm,h,i,f,j,k,l]
        send_message :data33, datos, :namespace => :graficos
        


end




















def datos1 () 
       
    

        #falta hacer conexión con la DB y la logica de procesamiento de los datos (archivo de configuración)
       
        #file = File.read('configuracion.json')
        #data_hash = JSON.parse(file)
        #puts data_hash['vista1']['titulo']
        #FECHA
        fecha = fecha()
        año = fecha[0]
        mes = fecha[1]
        hoy = fecha[2]

        
        #DATOS MEDIDOR
        #Potencia máxima medidor
        pm0 = Medidor.last
        pm = pm0.read_attribute("pi")
        puts pm
        #Energía medidor diaria
        energiadiamedidor= energiamedidordia(año,mes,hoy)
        energiasumadiamedidor= energiadiamedidor.inject(0){|sum,x| sum + x } 
        #Energia meididor mes
        energiamesmedidor=energiamedidormes(año,mes)
        energiasumamesmedidor=energiamesmedidor.inject(0){|sum,x| sum + x } 
        #Energia consumida este año medidor
        energiaañomedidor= energiamedidoraño(año)
        energiasumaañomedidor= energiaañomedidor.inject(0){|sum,x| sum + x } 
        #DATOS INVERSOR
        #Potencia máxima inversor
        pmi0 = Inversor.last
        pmi = pmi0.read_attribute("pi")
        #Energia inversor diaria
        energiadiainversor= energiainversordia(año,mes,hoy)
        energiasumadiainversor= energiadiainversor.inject(0){|sum,x| sum + x }
        #Energia inversor este mes
        energiamesinversor=energiainversormes(año,mes)
        energiasumamesinversor= energiamesinversor.inject(0){|sum,x| sum + x }
        #Energia inversor este año   
        energiaañoinversor= energiainversoraño(año)
        energiasumaañoinversor= energiaañoinversor.inject(0){|sum,x| sum + x }
        #Energia inyectada planta solar
        energiainyectada=0;
        #DATOS PAGINA CONSUMO EDIFICIO
        #Potencia maxima consumida edificio
        pm20=pm+pmi        
        #Energia consumida hoy por el edificio
        energiaconsumidaeedia=energiasumadiainversor+energiasumadiamedidor
        #Energia consumida año por el edificio
        energiaconsumidaeeaño=energiasumaañoinversor+energiasumaañomedidor
        #Energia consumida mes por el edificio
        energiaconsumidaeemes=energiasumamesmedidor+energiasumamesinversor
        #DATOS PAGINA TABLA CALCULOS FV
        #Ahorro dinero planta FV
        puts "ahorro"
        ahorrodinero=ahorrodinero(año)
        ahorrosumadinero=(ahorrodinero.inject(0){|sum,x| sum + x }).floor
        #Ahorro co2 planta FV
        puts "ahorro"
        ahorroco2=ahorroco2(año)
        ahorrosumaco2=(ahorroco2.inject(0){|sum,x| sum + x }).floor
        #Ahorro en arboles
        arboles=(ahorrosumaco2/1.98).floor
        #MANDAR DATOS A LA VISTA
        #datos = [1,2,3,4,5,6,7,8,9999999,9999999,9999999]
        datos = [pmi,energiasumadiainversor,energiasumaañoinversor,energiainyectada,pm20,energiaconsumidaeedia,energiaconsumidaeemes,energiaconsumidaeeaño,ahorrosumadinero,ahorrosumaco2,arboles]
        



        send_message :data1, datos, :namespace => :graficos
        



end

def datos2 () 
        
        #Fecha
        fecha = fecha()
        año = fecha[0]
        mes = fecha[1]
        hoy = fecha[2]        
        #DATOS INVERSOR
        #Potencia máxima inversor
        pmi0 = Inversor.last
        pmi = pmi0.read_attribute("pi")
        #Energia inversor diaria
        energiadiainversor= energiainversordia(año,mes,hoy)
        energiasumadiainversor= energiadiainversor.inject(0){|sum,x| sum + x }
        #Energia inversor este mes
        energiamesinversor=energiainversormes(año,mes)
        energiasumamesinversor= energiamesinversor.inject(0){|sum,x| sum + x }
        #Energia inversor este año   
        energiaañoinversor= energiainversoraño(año)
        energiasumaañoinversor= energiaañoinversor.inject(0){|sum,x| sum + x }
        #Energia inyectada planta solar
        energiainyectada=0;
        #DATOS PAGINA TABLA CALCULOS FV
        #Ahorro dinero planta FV
        puts "ahorro"
        ahorrodinero=ahorrodinero(año)
        ahorrosumadinero=(ahorrodinero.inject(0){|sum,x| sum + x }).floor
        #Ahorro co2 planta FV
        puts "ahorro"
        ahorroco2=ahorroco2(año)
        ahorrosumaco2=(ahorroco2.inject(0){|sum,x| sum + x }).floor
        #Ahorro en arboles
        arboles=(ahorrosumaco2/1.98).floor
        datos = [pmi,energiasumadiainversor,energiasumaañoinversor,energiainyectada,ahorrosumadinero,ahorrosumaco2,arboles]
        #Mandar datos vista     
        send_message :data2, datos, :namespace => :graficos








end

def datos3 () 

       
        #falta hacer conexión con la DB y la logica de procesamiento de los datos (archivo de configuración)
       
        #file = File.read('configuracion.json')
        #data_hash = JSON.parse(file)
        #puts data_hash['vista1']['titulo']
        #FECHA
        fecha = fecha()
        año = fecha[0]
        mes = fecha[1]
        hoy = fecha[2]
        #DATOS MEDIDOR
        #Potencia máxima medidor
        pm0 = Medidor.last
        pm = pm0.read_attribute("pi")
        puts pm
        #Energía medidor diaria
        energiadiamedidor= energiamedidordia(año,mes,hoy)
        energiasumadiamedidor= energiadiamedidor.inject(0){|sum,x| sum + x } 
        #Energia meididor mes
        energiamesmedidor=energiamedidormes(año,mes)
        energiasumamesmedidor=energiamesmedidor.inject(0){|sum,x| sum + x } 
        #Energia consumida este año medidor
        energiaañomedidor= energiamedidoraño(año)
        energiasumaañomedidor= energiaañomedidor.inject(0){|sum,x| sum + x } 
        #DATOS INVERSOR
        #Potencia máxima inversor
        pmi0 = Inversor.last
        pmi = pmi0.read_attribute("pi")
        #Energia inversor diaria
        energiadiainversor= energiainversordia(año,mes,hoy)
        energiasumadiainversor= energiadiainversor.inject(0){|sum,x| sum + x }
        #Energia inversor este mes
        energiamesinversor=energiainversormes(año,mes)
        energiasumamesinversor= energiamesinversor.inject(0){|sum,x| sum + x }
        #Energia inversor este año   
        energiaañoinversor= energiainversoraño(año)
        energiasumaañoinversor= energiaañoinversor.inject(0){|sum,x| sum + x }
        #Energia inyectada planta solar
        energiainyectada=0;
        #DATOS PAGINA CONSUMO EDIFICIO
        #Potencia maxima consumida edificio
        pm20=pm+pmi        
        #Energia consumida hoy por el edificio
        energiaconsumidaeedia=energiasumadiainversor+energiasumadiamedidor
        #Energia consumida año por el edificio
        energiaconsumidaeeaño=energiasumaañoinversor+energiasumaañomedidor
        #Energia consumida mes por el edificio
        energiaconsumidaeemes=energiasumamesmedidor+energiasumamesinversor
        #DATOS PAGINA TABLA CALCULOS EDIFICIO
        #Gasto dinero edificio
        puts "gasto"
        gastodinero=gastodinero(año)
        gastosumadinero=(gastodinero.inject(0){|sum,x| sum + x }).floor
        #Ahorro co2 planta FV
        puts "gasto co2"
        gastoco2=gastoco2(año)
        gastosumaco2=(gastoco2.inject(0){|sum,x| sum + x }).floor
        #Ahorro en arboles
        arbolest=(gastosumaco2/1.98).floor
        #MANDAR DATOS A LA VISTA
        datos = [pm20,energiaconsumidaeedia,energiaconsumidaeemes,energiaconsumidaeeaño,gastosumadinero,gastosumaco2,arbolest]
        send_message :data3, datos, :namespace => :graficos
        



end
     


#Fecha

def fecha()


datos = Valore.last

fecha = Array.new

fecha[0] = datos.read_attribute("año")
fecha[1] = datos.read_attribute("mes")
fecha[2] = datos.read_attribute("dia")
 
 return fecha


    end

#sumas MEDIDOR

def energiamedidordia (año,mes,dia) 
       
    i = 0
    final = Array.new 

    datos = Valore.where(:año => año, :mes => mes, :dia => dia)
      
      datos.each do |datos|
                
                
                final[i] = datos.read_attribute("ee")
               
                i = i +1
                

                end
            
        return final
            

end

def energiamedidormes (año,mes) 
       
    i = 0
    final = Array.new 

    datos = Valore.where(:año => año, :mes => mes)
      
      datos.each do |datos|
                
                
                final[i] = datos.read_attribute("ee")
               
                i = i +1
                

                end
            
        return final
            

end

def energiamedidoraño (año) 
       
    i = 0
    final = Array.new 

    datos = Valore.where(:año => año)
      
      datos.each do |datos|
                
                
                final[i] = datos.read_attribute("ee")
               
                i = i +1
                

                end
            
        return final
            

end


#sumas Inversor

def energiainversordia (año,mes,dia) 
       
    i = 0
    final = Array.new 

    datos = Valore.where(:año => año, :mes => mes, :dia => dia)
      
      datos.each do |datos|
                
                
                final[i] = datos.read_attribute("es")
                i = i +1
                

                end
            
        return final
            

end
def energiainversormes (año,mes) 
       
    i = 0
    final = Array.new 

    datos = Valore.where(:año => año, :mes => mes)
      
      datos.each do |datos|
                
                
                final[i] = datos.read_attribute("es")
               
                i = i +1
                

                end
            
        return final
            

end

def energiainversoraño (año) 
       
    i = 0
    final = Array.new 

    datos = Valore.where(:año => año)
      
      datos.each do |datos|
                
                
                final[i] = datos.read_attribute("es")
               
                i = i +1
                

                end
            
        return final
            

end



end


#Tabla con datos calculables

def ahorrodinero(año)

    i = 0
    final = Array.new 
    final1 = Array.new 
    final2 = Array.new 
  

    datos = Valore.where(:año => año)
      
      datos.each do |datos|
                
                
                final[i] = datos.read_attribute("es")
                final1[i] = datos.read_attribute("tarifa")
                final2[i] = final1[i]*final[i]
              
                i = i +1
              
              
                end
            
        return final2



    end


def ahorroco2(año)

    i = 0
    final = Array.new 
    final1 = Array.new 
    final2 = Array.new 
  

    datos = Valore.where(:año => año)
      
      datos.each do |datos|
                
                
                final[i] = datos.read_attribute("es")
                final1[i] = datos.read_attribute("co2")
                final2[i] = final1[i]*final[i]
       
                i = i +1
              
              
                end
            
        return final2



    end

def gastodinero(año)

    i = 0
    final = Array.new 
    final1 = Array.new 
    final2 = Array.new 
  

    datos = Valore.where(:año => año)
      
      datos.each do |datos|
                
                
                final[i] = datos.read_attribute("ee")
                final1[i] = datos.read_attribute("tarifa")
                final2[i] = final1[i]*final[i]
              
                i = i +1
              
              
                end
            
        return final2



    end
def gastoco2(año)

    i = 0
    final = Array.new 
    final1 = Array.new 
    final2 = Array.new 
  

    datos = Valore.where(:año => año)
      
      datos.each do |datos|
                
                
                final[i] = datos.read_attribute("ee")
                final1[i] = datos.read_attribute("co2")
                final2[i] = final1[i]*final[i]
              
                i = i +1
              
              
                end
            
        return final2



    end
