class Api::PicturesController < ApplicationController
  before_action :authenticate_user!
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

  def update
    @picture = Picture.find(params[:id])
    @picture.update_attributes!(
      description: params[:description],
      credit: params[:credit],
    )
    render json: { saved: true }
  end
end
