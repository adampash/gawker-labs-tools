class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.integer :user_id
      t.text :description
      t.text :title

      t.timestamps null: false
    end
  end
end
