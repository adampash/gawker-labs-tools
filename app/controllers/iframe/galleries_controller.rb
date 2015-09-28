class Iframe::GalleriesController < ApplicationController
  layout 'iframe'

  def empty
    render :text => "", :layout => 'iframe'
  end
end

