class Changem < ActiveRecord::Migration
  def change
  	  add_column :estaticos, :m, :decimal
  end
end
