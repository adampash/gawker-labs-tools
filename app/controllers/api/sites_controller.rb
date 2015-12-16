class Api::SitesController < ApplicationController
  def index
    @sites = Site.all.order(name: :asc)
    render json: @sites
  end
end

