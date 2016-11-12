class Semaforo < ActiveRecord::Migration
  def change
  	 add_column :estaticos, :n, :decimal
  end
end
