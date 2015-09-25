class Gallery < ActiveRecord::Base
  has_many :pictures, through: :gallery_pictures
  has_many :gallery_pictures

  def pics
    pictures.as_json(:methods => [:url])
  end
end
