class Api::PicturesController < ApplicationController
  def index
  end

  def create
    @picture = Picture.create(
      image: params[:file],
      user_id: current_user.id,
      description: '',
      title: '',
    )
    render json: @picture.to_json(:methods => [:url])
  end

  def show
  end
end
