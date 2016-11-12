class CreateMedidors < ActiveRecord::Migration
  def change
    create_table :medidors do |t|
      t.integer :año
      t.integer :mes
      t.integer :dia
      t.integer :hora
      t.integer :minuto
      t.integer :energiaacum
      t.integer :fp
      t.integer :pi
      t.integer :pm
      t.integer :pmx
      t.integer :v1
      t.integer :v2
      t.integer :v3
      t.integer :error

      t.timestamps null: false
    end
  end
end
