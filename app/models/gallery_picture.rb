class GalleryPicture < ActiveRecord::Base
  belongs_to :gallery
  belongs_to :picture
  acts_as_list scope: :gallery
end
