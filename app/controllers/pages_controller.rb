class PagesController < ApplicationController
  def hello
  end

  def json
    render json: {name: 'person'}
  end
end
