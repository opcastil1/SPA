class CreateValores < ActiveRecord::Migration
  def change
    create_table :valores do |t|
      t.integer :año
      t.integer :mes
      t.integer :dia
      t.integer :hora
      t.integer :es
      t.integer :ee
      t.integer :ef
      t.integer :error
      t.timestamps null: false
    end
  end
end
