class Estatico < ActiveRecord::Base
 
 def initialize(attributes=nil)
    attr_with_defaults = {:año => 0,:mes => 0,:dia => 0,:hora => 0, :minuto => 0,:a => 0,:b => 0,:c => 0,:d => 0,:e => 0,:f => 0,:h => 0,:i => 0,:j => 0,:k => 0,:l => 0}.merge(attributes)
    super(attr_with_defaults)
  end


end
