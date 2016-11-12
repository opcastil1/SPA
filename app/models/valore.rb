class Valore < ActiveRecord::Base


 def initialize(attributes=nil)
    attr_with_defaults = {:año => 2016,:mes => 1,:dia => 1,:hora => 1,:minuto => 1,:es=> 1,:ee => 1,:tarifa => 0,:co2 => 0}.merge(attributes)
    super(attr_with_defaults)
  end



end
