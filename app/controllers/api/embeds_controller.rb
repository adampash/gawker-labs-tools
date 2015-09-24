class Api::EmbedsController < ApplicationController
  def new
  end

  def create
    @embed = Embed.create({
      code: params["code"],
      user_id: current_user.id
    })
    render json: @embed.to_json
  end

  def index
  end

  def show
    puts "HERE THEY ARE: #{params}"
    render json: { foo: 'bar' }
  end
end
