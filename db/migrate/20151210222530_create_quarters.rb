class CreateQuarters < ActiveRecord::Migration
  def change
    create_table :quarters do |t|
      t.text :name
      t.integer :q_id

      t.timestamps null: false
    end
  end
end
