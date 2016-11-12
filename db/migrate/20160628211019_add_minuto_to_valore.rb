class AddMinutoToValore < ActiveRecord::Migration
  def change
    add_column :valores, :minuto, :integer
  end
end
