class AddPositionToGalleryPicture < ActiveRecord::Migration
  def change
    add_column :gallery_pictures, :position, :integer
  end
end
