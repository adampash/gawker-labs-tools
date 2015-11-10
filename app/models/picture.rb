class Picture < ActiveRecord::Base
  has_many :galleries, through: :gallery_pictures
  has_many :gallery_pictures, -> { order('gallery_picture.position asc') }

  has_attached_file :image,
    styles: { large: "800x800>", medium: "300x300>", thumb: "100x100>" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def url
    cdn_link image.url(:large)
  end

  def original
    cdn_link image.url(:original)
  end

  def cdn_link(uri)
    uri.gsub('s3.amazonaws.com/', '')
  end
end
