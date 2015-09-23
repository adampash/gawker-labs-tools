class CreateEmbeds < ActiveRecord::Migration
  def change
    create_table :embeds do |t|
      t.text :code
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
