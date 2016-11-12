class Mesanterior < ActiveRecord::Migration
  def change
    create_table :mesanterior do |t|
      t.integer "enero"
      t.integer "febrero"
      t.integer "marzo"
      t.integer "abril"
      t.integer "mayo"
      t.integer "junio"
      t.integer "julio"  
      t.integer "agosto"
      t.integer "septiembre"
      t.integer "octubre"
      t.integer "noviembre"
      t.integer "diciembre"
end

  end
end
