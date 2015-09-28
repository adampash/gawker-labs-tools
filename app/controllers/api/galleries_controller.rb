class Api::GalleriesController < ApplicationController
  before_action :authenticate_user!, except: :show

  def index
    @galleries = current_user.latest_galleries
    render json: @galleries.to_json(:methods => [:pics])
  end

  def show
    @gallery = Gallery.find(params[:id])
    render json: @gallery.to_json(:methods => [:pics])
  end

  def create
    @gallery = Gallery.create({
      description: params[:description],
      user_id: current_user.id,
    })
    GalleryPicture.create(
      params[:picture_ids].map do |id, index|
        {
          gallery_id: @gallery.id,
          picture_id: id,
          position: index,
        }
      end
    )

    render json: @gallery.to_json(:methods => [:pics])
  end
end
