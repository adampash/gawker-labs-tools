class CreateGalleries < ActiveRecord::Migration
  def change
    create_table :galleries do |t|
      t.integer :user_id
      t.text :description

      t.timestamps null: false
    end
  end
end
