class CreateEstaticos < ActiveRecord::Migration
  def change
    create_table :estaticos do |t|
      t.integer :año
      t.integer :mes
      t.integer :dia
      t.integer :hora
      t.integer :minuto
      t.integer :a
      t.integer :b
      t.integer :c
      t.integer :d
      t.integer :e
      t.integer :f
      t.integer :h
      t.integer :i
      t.integer :j
      t.integer :k

      t.timestamps null: false
    end
  end
end
