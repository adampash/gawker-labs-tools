class Api::TitlesController < ApplicationController
  after_filter :set_csrf_cookie

  def autocomplete
    if params[:query] == ''
      @jobs = []
    else
      @jobs = JobTitle.where("LOWER(name) LIKE ?", "%#{params[:query].downcase}%")
    end
    render json: @jobs
  end
end


