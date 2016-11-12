class ChangeDToIntegerFromEstatico < ActiveRecord::Migration
  def self.up
    change_table :estaticos do |t|
      t.change :c, :decimal
      t.change :d, :decimal
      t.change :e, :decimal
    end
  end
  def self.down
    change_table :estaticos do |t|
      t.change :c, :integer
      t.change :d, :integer
      t.change :e, :integer
    end
  end
end
