class AddTarifaToValore < ActiveRecord::Migration
  def change
    add_column :valores, :tarifa, :decimal
  end
end
