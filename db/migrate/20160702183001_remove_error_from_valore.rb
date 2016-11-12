class RemoveErrorFromValore < ActiveRecord::Migration
  def change
    remove_column :valores, :error, :integer
  end
end
