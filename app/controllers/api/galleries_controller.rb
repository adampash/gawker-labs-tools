class Api::GalleriesController < ApplicationController
  before_filter :set_cache_control_headers, only: :show
  before_action :authenticate_user!, except: :show
  after_filter :set_csrf_cookie, except: :show

  def index
    @galleries = current_user.latest_galleries
    render json: @galleries.to_json(:methods => [:pics])
  end

  def show
    @gallery = Gallery.find(params[:id])
    set_surrogate_key_header @gallery.record_key
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

  def update
    @gallery = Gallery.find(params[:id])
    if (params[:position])
      @gallery.gallery_pictures.find_by(
        position: params[:position][:from] + 1
      ).set_list_position(
        params[:position][:to] + 1
      )
    end
    render json: { success: true }
  end
end
