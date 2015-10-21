class CreateStyles < ActiveRecord::Migration
  def change
    create_table :styles do |t|
      t.text :rule, null: false
      t.text :details
      t.text :keywords
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end
