class RemoveEfFromValore < ActiveRecord::Migration
  def change
    remove_column :valores, :ef, :integer
  end
end
