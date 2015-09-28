class Iframe::GalleriesController < ApplicationController
  after_action :allow_iframe
  layout 'iframe'

  def empty
    render :text => "", :layout => 'iframe'
  end


  private
  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
end

