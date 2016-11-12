class ChangeDToIntegerFromEstaticoe < ActiveRecord::Migration
  def change

add_column :estaticos, :l, :decimal

  end
end
