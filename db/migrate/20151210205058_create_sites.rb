class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.text :name
      t.text :domain

      t.timestamps null: false
    end
  end
end
