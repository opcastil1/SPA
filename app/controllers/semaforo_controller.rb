class SemaforoController < WebsocketRails::BaseController

require 'socket'
require 'json'

def semaforo



titulo=0
send_message :semaforo, titulo, :namespace => :graficos


end



end





