class ChangeDToIntegerFromEstaticoee < ActiveRecord::Migration
  def self.up
    change_table :estaticos do |t|
      t.change :j, :decimal
      t.change :k, :decimal

    end
  end
  def self.down
    change_table :estaticos do |t|
      t.change :j, :integer
      t.change :k, :integer
 
    end
  end
end
