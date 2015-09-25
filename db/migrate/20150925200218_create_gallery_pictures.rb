class CreateGalleryPictures < ActiveRecord::Migration
  def change
    create_table :gallery_pictures do |t|
      t.integer :gallery_id
      t.integer :picture_id

      t.timestamps null: false
    end
  end
end
