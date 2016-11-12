class RemoveCo2FromValore < ActiveRecord::Migration
  def change
    remove_column :valores, :co2, :integer
  end
end
