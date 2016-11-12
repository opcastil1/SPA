class RemoveTarifaFromValore < ActiveRecord::Migration
  def change
    remove_column :valores, :tarifa, :integer
  end
end
