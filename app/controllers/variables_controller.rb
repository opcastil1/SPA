class VariablesController < WebsocketRails::BaseController

require 'socket'
require 'json'

def guardartiempo () 
       

file = File.read('configuracion.json')
data_hash = JSON.parse(file)
data_hash['general']['tiempo'] = message
puts data_hash
File.open("configuracion.json","w") do |f|
f.write(data_hash.to_json)
f.close
end
file.close
 

end


def tiempovista () 
       

        file = File.read('configuracion.json')
        data_hash = JSON.parse(file)
        tiempo = data_hash['general']['tiempo']
        send_message :tiempovista, tiempo, :namespace => :graficos
 

end


def guardarsic () 
       

file = File.read('configuracion.json')
data_hash = JSON.parse(file)
data_hash['general']['sic'] = message
puts data_hash
File.open("configuracion.json","w") do |f|
f.write(data_hash.to_json)
f.close
end
file.close
 

end


def tiemposic () 
       

        file = File.read('configuracion.json')
        data_hash = JSON.parse(file)
        sic = data_hash['general']['sic']
        send_message :tiemposic, sic, :namespace => :graficos
 

end


def guardartarifa () 
       

file = File.read('configuracion.json')
data_hash = JSON.parse(file)
data_hash['general']['tarifa'] = message
puts data_hash
File.open("configuracion.json","w") do |f|
f.write(data_hash.to_json)
f.close
end
file.close
 

end


def tiempotarifa () 
       

        file = File.read('configuracion.json')
        data_hash = JSON.parse(file)
        tarifa = data_hash['general']['tarifa']
        send_message :tiemposic, sic, :namespace => :graficos
 

end

end





