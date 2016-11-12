class CreateInversors < ActiveRecord::Migration
  def change
    create_table :inversors do |t|
      t.integer :año
      t.integer :mes
      t.integer :dia
      t.integer :hora
      t.integer :minuto
      t.integer :energiaacum
      t.integer :pi
      t.integer :pm
      t.integer :pmx
      t.integer :error

      t.timestamps null: false
    end
  end
end
