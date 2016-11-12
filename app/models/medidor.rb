class Medidor < ActiveRecord::Base


  def initialize(attributes=nil)
    attr_with_defaults = {:año => 2016,:mes => 1,:dia => 1,:hora => 1, :minuto => 1,:energiaacum=> 1,:fp => 1,:pi => 1,:pm => 1,:pmx => 1,:v1 => 1,:v2 => 1,:v3 => 1, :error => 0}.merge(attributes)
    super(attr_with_defaults)
  end

end
