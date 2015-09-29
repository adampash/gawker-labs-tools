class Iframe::EmbedsController < ApplicationController
  before_filter :set_cache_control_headers, only: [:empty]
  after_action :allow_iframe
  layout 'iframe'

  def empty
    set_surrogate_key_header ['empty']
    render :text => "", :layout => 'iframe'
  end

  private
  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
end


