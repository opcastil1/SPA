class AddCo2ToValore < ActiveRecord::Migration
  def change
    add_column :valores, :co2, :decimal
  end
end
